/* eslint-disable eqeqeq */
/* eslint-disable no-return-await */
class Server {
	async getResource(url, obj = null) {
		const response = await fetch(url, obj);
		if (response.status !== 200) throw new Error(response.status);
		return await response.json();
	}

	getArticles(store) {
		const state = store.getState();
		const { user, currentPage } = state;
		let token;
		const ofset = (currentPage - 1) * 10;
		if (user === null) token = '';
		else token = user.token;
		return this.getResource(`https://api.realworld.io/api/articles?limit=10&offset=${ofset}`, {
			headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
		});
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

	editArticle(value, slug, store) {
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
		return this.getResource(`https://api.realworld.io/api/articles/${slug}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${state.user.token}`},
			body: JSON.stringify(requestBody)
		});
	}

	deleteArticle(slug, store) {
		const state = store.getState();
		return this.getResource(`https://api.realworld.io/api/articles/${slug}`, {
			method: 'DELETE',
			headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${state.user.token}`}
		});
	}

	unfavorited(slug, store) {
		const state = store.getState();
		return this.getResource(`https://api.realworld.io/api/articles/${slug}/favorite`, {
			method: 'DELETE',
			headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${state.user.token}`}
		});
	}

	favorited(slug, store) {
		const state = store.getState();
		return this.getResource(`https://api.realworld.io/api/articles/${slug}/favorite`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${state.user.token}`}
		});
	}
}

const server = new Server();

export default server;