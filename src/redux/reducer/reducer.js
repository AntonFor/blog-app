import { updateArticles, errorArticles, createAccount, logOut, logIn, editProfile, createArticle, 
	errorAccount, errorProfile, resetUserEdit, logError, changePage, editArticle, deleteArticle,
	errorDeleteArticle, unfavorited, setImgError } from '../../utilities/utilities';

import initialState from '../state';

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case 'UPDATE_ARTICLES': return updateArticles(state, action.body)
	case 'ERROR_ARTICLES': return errorArticles(state, action.body)
	case 'CREATE_ACCOUNT': return createAccount(state, action.body, action.data)
	case 'ERROR_ACCOUNT': return errorAccount(state, action.body)
	case 'LOG_OUT': return logOut(state)
	case 'LOG_IN': return logIn(state, action.body, action.data)
	case 'LOG_ERROR': return logError(state, action.body)
	case 'EDIT_PROFILE': return editProfile(state, action.body, action.data)
	case 'ERROR_PROFILE': return errorProfile(state, action.body)
	case 'CREATE_ARTICLE': return createArticle(state, action.body)
	case 'RESET_USER_EDIT': return resetUserEdit(state)
	case 'CHANGE_PAGE': return changePage(state, action.body)
	case 'EDIT_ARTICLE': return editArticle(state, action.body)
	case 'DELETE_ARTICLE': return deleteArticle(state)
	case 'ERROR_DELETE_ARTICLE': return errorDeleteArticle(state, action.body)
	case 'UNFAVORITED': return unfavorited(state, action.body)
	case 'SET_IMG_ERROR': return setImgError(state)
	default: return state;
	}
}

export default reducer;