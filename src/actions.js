import server from './services/server';

const responseArticles = (body) => ( {type: 'UPDATE_ARTICLES', body} );

const errorArticles = (error) => ( {type: 'ERROR_ARTICLES', error} );

export const articles = () => (dispatch) => server.getArticles()
	.then(response => {
		console.log(response);
		dispatch(responseArticles(response));
	})	
	.catch((err) => {
		dispatch(errorArticles(err));
	});

	export const createAccount = (data) => ( {type: 'CREATE_ACCOUNT', data} );

	export const logOut = () => ( {type: 'LOG_OUT'} );

	export const logIn = (data) => ( {type: 'LOG_IN', data} );

	export const editProfile = (data) => ( {type: 'EDIT_PROFILE', data} )