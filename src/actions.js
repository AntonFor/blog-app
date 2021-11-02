/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import store from './index.jsx';
import server from './services/server';

const responseArticles = (body) => ( {type: 'UPDATE_ARTICLES', body} );

const errorArticles = (error) => ( {type: 'ERROR_ARTICLES', error} );

export const articles = () => (dispatch) => server.getArticles()
	.then((response) => {
		dispatch(responseArticles(response));
	})	
	.catch((err) => {
		dispatch(errorArticles(err));
	});

const responseCreateAccount = (body) => ( {type: 'CREATE_ACCOUNT', body} );

const errorCreateAccount = (error) => ( {type: 'ERROR_ACCOUNT', error} );

export const createAccount = (data) => (dispatch) => server.setNewAccount(data)
	.then((response) => {
		dispatch(responseCreateAccount(response));
	})
	.catch((err) => {
		dispatch(errorCreateAccount(err));
	});

export const logOut = () => ( {type: 'LOG_OUT'} );

const responseLogIn = (body) => ( {type: 'LOG_IN', body} );

const errorLogIn = (error) => ( {type: 'LOG_ERROR', error} );

export const logIn = (data) => (dispatch) => server.logIn(data)
	.then((response) => {
		dispatch(responseLogIn(response));
	})
	.catch((err) => {
		dispatch(errorLogIn(err));
	});

const responseEditProfile = (body) => ( {type: 'EDIT_PROFILE', body} );

const errorEditProfile = (error) => ( {type: 'ERROR_PROFILE', error} );

export const editProfile = (data) => (dispatch) => server.updateProfile(data, store)
.then((response) => {
	dispatch(responseEditProfile(response));
})
.catch((err) => {
	dispatch(errorEditProfile(err));
});

const responseCreateArticle = (body) => ( {type: 'CREATE_ARTICLE', body} );

const errorCreateArticle = (error) => ( {type: 'ERROR_ARTICLE', error} );

export const createArticle = (data) => (dispatch) => server.setNewArticle(data, store)
.then((response) => {
	dispatch(responseCreateArticle(response));
})
.catch((err) => {
	dispatch(errorCreateArticle(err));
});

export const resetUserEdit = () => ( {type: 'RESET_USER_EDIT'} );

// export const saveProfile = () => ( {type: 'SAVE_PROFILE'} );