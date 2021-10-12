import server from './services/server';

export const responseArticles = (body) => ( {type: 'UPDATE_ARTICLES', body} );

const errorArticles = (error) => ( {type: 'ERROR_ARTICLES', error} );

export const articles = () => (dispatch) => server.getArticles()
	.then(response => {
		dispatch(responseArticles(response));
	})	
	.catch((err) => {
		dispatch(errorArticles(err));
	})