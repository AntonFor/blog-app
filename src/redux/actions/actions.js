/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import store from '../../index.jsx';
import server from '../../services/server';
import { creatorActionObj } from '../../utilities/utilities';

export const getArticles = () => (dispatch) => server.getArticles(store)
	.then((response) => {
		dispatch(creatorActionObj('UPDATE_ARTICLES', response));
	})	
	.catch((err) => {
		dispatch(creatorActionObj('ERROR_ARTICLES', err));
	});

export const createAccount = (data) => (dispatch) => server.setNewAccount(data)
	.then((response) => {
		dispatch(creatorActionObj('CREATE_ACCOUNT', response, data));
	})
	.catch((err) => {
		dispatch(creatorActionObj('ERROR_ACCOUNT', err));
	});

export const logOut = () => creatorActionObj('LOG_OUT');

export const logIn = (data) => (dispatch) => server.logIn(data)
	.then((response) => {
		dispatch(creatorActionObj('LOG_IN', response, data));
	})
	.catch((err) => {
		dispatch(creatorActionObj('LOG_ERROR', err));
	});

export const editProfile = (data) => (dispatch) => server.updateProfile(data)
	.then((response) => {
		dispatch(creatorActionObj('EDIT_PROFILE', response, data));
	})
	.catch((err) => {
		dispatch(creatorActionObj('ERROR_PROFILE', err));
	});

export const createArticle = (data) => (dispatch) => server.setNewArticle(data)
	.then((response) => {
		dispatch(creatorActionObj('CREATE_ARTICLE', response));
	})
	.catch((err) => {
		dispatch(creatorActionObj('ERROR_ARTICLE', err));
	});

export const resetUserEdit = () => creatorActionObj('RESET_USER_EDIT');

export const changePage = (page) => creatorActionObj('CHANGE_PAGE', page);

export const editArticle = (data, slug) => (dispatch) => server.editArticle(data, slug)
	.then((response) => {
		dispatch(creatorActionObj('EDIT_ARTICLE', response));
	})
	.catch((err) => {
		dispatch(creatorActionObj('ERROR_EDIT_ARTICLE', err));
	});

export const deleteArticle = (slug) => (dispatch) => server.deleteArticle(slug)
	.then(() => {
		dispatch(creatorActionObj('DELETE_ARTICLE'));
	})
	.catch((err) => {
		dispatch(creatorActionObj('ERROR_DELETE_ARTICLE', err));
	});

export const favorites = (favorited, slug) => (dispatch) => {
	if (favorited) {
		server.unfavorited(slug)
			.then((response) => {
				dispatch(creatorActionObj('UNFAVORITED', response));
			})
			.catch((err) => {
				dispatch(creatorActionObj('ERROR_UNFAVORITED', err));
			});
	} else {
		server.favorited(slug)
			.then((response) => {
				dispatch(creatorActionObj('UNFAVORITED', response));
			})
			.catch((err) => {
				dispatch(creatorActionObj('ERROR_UNFAVORITED', err));
			});
	}
}

export const imgIsError = () => creatorActionObj('SET_IMG_ERROR');