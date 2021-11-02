/* eslint-disable no-return-await */
class Server {
	async getResource(url, obj = null) {
		const response = await fetch(url, obj);
		if (!response.ok) throw new Error(response);
		return await response.json();
	}

	getArticles() {
		return this.getResource('https://api.realworld.io/api/articles?limit=20&offset=0');
	}

	setNewAccount(value) {
		const requestBody = {
			"user": {
				"username": value.username,
				"email": value.email,
				"password": value.password
			}
		};
		return this.getResource('https://api.realworld.io/api/users', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(requestBody)
		});
	}

	logIn(value) {
		const requestBody = {
			"user": {
				"email": value.email,
				"password": value.password
			}
		};
		return this.getResource('https://api.realworld.io/api/users/login', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(requestBody)
		});
	}

	updateProfile(value, store) {
		const state = store.getState();
		let requestBody = {
			"user": {
				"username": value.username,
				"email": value.email
			}
		};
		const { user } = requestBody;
		if (value.password !== undefined) requestBody = {"user": { ...user, "password": value.password }};
		if (value.avatar !== undefined) requestBody = {"user": { ...user, "image": value.avatar }};
		return this.getResource('https://api.realworld.io/api/user', {
			method: 'PUT',
			headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${state.user.token}`},
			body: JSON.stringify(requestBody)
		});
	}

	setNewArticle(value, store) {
		const state = store.getState();
		const arrKeys = Object.keys(value);
		const tags = [];
		arrKeys.forEach((item) => {
			const str = item.slice("-", 3);
			if (str === 'tag') tags.push(value[item]);
		});
		const requestBody = {
			"article": {
				"title": value.title,
				"description": value.description,
				"body": value.text,
				"tagList": tags
			}
		};
		return this.getResource('https://api.realworld.io/api/articles', {
			method: 'POST',
			headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${state.user.token}`},
			body: JSON.stringify(requestBody)
		});
	}
}

const server = new Server();

export default server;