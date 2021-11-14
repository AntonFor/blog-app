/* eslint-disable eqeqeq */
/* eslint-disable no-return-await */
import { getOfset, getToken, getTags } from '../utilities/utilities';

class Server {
	url = 'https://api.realworld.io/api/';

	headers = new Headers({'Content-Type': 'application/json'});

	async getResource(url, obj = null) {
		const response = await fetch(url, obj);
		if (response.status !== 200) throw new Error(response.status);
		return await response.json();
	}

	getArticles(store) {
		const state = store.getState();
		const { user, currentPage } = state;
		this.headers.set('Authorization', `Bearer ${getToken(user)}`);
		return this.getResource(`${this.url}articles?limit=10&offset=${getOfset(currentPage)}`, {
			headers: this.headers
		});
	}

	setNewAccount(value) {
		const requestBody = {
			user: {
				username: value.username,
				email: value.email,
				password: value.password
			}
		};
		return this.getResource(`${this.url}users`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(requestBody)
		});
	}

	logIn(value) {
		const requestBody = {
			user: {
				email: value.email,
				password: value.password
			}
		};
		return this.getResource(`${this.url}users/login`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(requestBody)
		});
	}

	updateProfile(value) {
		let requestBody = {
			user: {
				username: value.username,
				email: value.email
			}
		};
		const { user } = requestBody;
		if (value.password !== undefined) requestBody = {user: { ...user, password: value.password }};
		if (value.avatar !== undefined) requestBody = {user: { ...user, image: value.avatar }};
		return this.getResource(`${this.url}user`, {
			method: 'PUT',
			headers: this.headers,
			body: JSON.stringify(requestBody)
		});
	}

	setNewArticle(value) {
		const requestBody = {
			article: {
				title: value.title,
				description: value.description,
				body: value.text,
				tagList: getTags(value)
			}
		};
		return this.getResource(`${this.url}articles`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(requestBody)
		});
	}

	editArticle(value, slug) {
		const requestBody = {
			article: {
				title: value.title,
				description: value.description,
				body: value.text,
				tagList: getTags(value)
			}
		};
		return this.getResource(`${this.url}articles/${slug}`, {
			method: 'PUT',
			headers: this.headers,
			body: JSON.stringify(requestBody)
		});
	}

	deleteArticle(slug) {
		return this.getResource(`${this.url}articles/${slug}`, {
			method: 'DELETE',
			headers: this.headers
		});
	}

	unfavorited(slug) {
		return this.getResource(`${this.url}articles/${slug}/favorite`, {
			method: 'DELETE',
			headers: this.headers
		});
	}

	favorited(slug) {
		return this.getResource(`${this.url}articles/${slug}/favorite`, {
			method: 'POST',
			headers: this.headers
		});
	}
}

const server = new Server();

export default server;