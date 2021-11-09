/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import store from './index.jsx';
import server from './services/server';

const responseArticles = (body) => ( {type: 'UPDATE_ARTICLES', body} );

const errorArticles = (error) => ( {type: 'ERROR_ARTICLES', error} );

export const articles = () => (dispatch) => server.getArticles(store)
	.then((response) => {
		dispatch(responseArticles(response));
	})	
	.catch((err) => {
		dispatch(errorArticles(err));
	});

const responseCreateAccount = (body, data) => ( {type: 'CREATE_ACCOUNT', body, data} );

const errorCreateAccount = (error) => ( {type: 'ERROR_ACCOUNT', error} );

export const createAccount = (data) => (dispatch) => server.setNewAccount(data)
	.then((response) => {
		dispatch(responseCreateAccount(response, data));
	})
	.catch((err) => {
		dispatch(errorCreateAccount(err));
	});

export const logOut = () => ( {type: 'LOG_OUT'} );

const responseLogIn = (body, data) => ( {type: 'LOG_IN', body, data} );

const errorLogIn = (error) => ( {type: 'LOG_ERROR', error} );

export const logIn = (data) => (dispatch) => server.logIn(data)
	.then((response) => {
		dispatch(responseLogIn(response, data));
	})
	.catch((err) => {
		dispatch(errorLogIn(err));
	});

const responseEditProfile = (body, data) => ( {type: 'EDIT_PROFILE', body, data} );

const errorEditProfile = (error) => ( {type: 'ERROR_PROFILE', error} );

export const editProfile = (data) => (dispatch) => server.updateProfile(data, store)
.then((response) => {
	dispatch(responseEditProfile(response, data));
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

export const changePage = (page) => ( {type: 'CHANGE_PAGE', page} );

const responseEditArticle = (body) => ( {type: 'EDIT_ARTICLE', body} );

const errorEditArticle = (error) => ( {type: 'ERROR_EDIT_ARTICLE', error} );

export const editArticle = (data, slug) => (dispatch) => server.editArticle(data, slug, store)
.then((response) => {
	dispatch(responseEditArticle(response));
})
.catch((err) => {
	dispatch(errorEditArticle(err));
});

const responseDeleteArticle = () => ( {type: 'DELETE_ARTICLE'} );

const errorDeleteArticle = (error) => ( {type: 'ERROR_DELETE_ARTICLE', error} );

export const deleteArticle = (slug) => (dispatch) => server.deleteArticle(slug, store)
.then(() => {
	dispatch(responseDeleteArticle());
})
.catch((err) => {
	dispatch(errorDeleteArticle(err));
});

const responseUnfavorited = (body) => ( {type: 'UNFAVORITED', body} );

const errorUnfavorited = (error) => ( {type: 'ERROR_UNFAVORITED', error} );

export const favorites = (favorited, slug) => (dispatch) => {
	if (favorited) {
		server.unfavorited(slug, store)
		.then((response) => {
			dispatch(responseUnfavorited(response));
		})
		.catch((err) => {
			dispatch(errorUnfavorited(err));
		});
	} else {
		server.favorited(slug, store)
		.then((response) => {
			dispatch(responseUnfavorited(response));
		})
		.catch((err) => {
			dispatch(errorUnfavorited(err));
		});
	}
}