/* eslint-disable no-return-await */
class Server {
	async getResource(url, obj = null) {
		const response = await fetch(url, obj);
		if (!response.ok) throw new Error(response.status);
		return await response.json();
	}

	getArticles() {
		return this.getResource('https://conduit.productionready.io/api/articles');
	}
}

const server = new Server();

export default server;