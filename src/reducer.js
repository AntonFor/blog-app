import { updateArticles, errorArticles, createAccount, logOut, logIn, editProfile, createArticle, 
	errorAccount, errorProfile, resetUserEdit, logError, changePage, editArticle, deleteArticle,
	errorDeleteArticle, unfavorited } from './utilities/utilities';

const dateState = {
	loading: true,
	error: false,
	errorCreateAccount: false,
	errorEditAccount: false,
	errorLogIn: false,
	isLogIn: false,
	articles: [],
	user: null,
	article: null,
	userEdit: false,
	logIn: false,
	articlesCount: 0,
	currentPage: 1
}

const reducer = (state = dateState, action) => {
	switch (action.type) {
		case 'UPDATE_ARTICLES': return updateArticles(state, action.body)
		case 'ERROR_ARTICLES': return errorArticles(state, action.error)
		case 'CREATE_ACCOUNT': return createAccount(state, action.body, action.data)
		case 'ERROR_ACCOUNT': return errorAccount(state, action.error)
		case 'LOG_OUT': return logOut(state)
		case 'LOG_IN': return logIn(state, action.body, action.data)
		case 'LOG_ERROR': return logError(state, action.error)
		case 'EDIT_PROFILE': return editProfile(state, action.body, action.data)
		case 'ERROR_PROFILE': return errorProfile(state, action.error)
		case 'CREATE_ARTICLE': return createArticle(state, action.body)
		case 'RESET_USER_EDIT': return resetUserEdit(state)
		case 'CHANGE_PAGE': return changePage(state, action.page)
		case 'EDIT_ARTICLE': return editArticle(state, action.body)
		case 'DELETE_ARTICLE': return deleteArticle(state)
		case 'ERROR_DELETE_ARTICLE': return errorDeleteArticle(state, action.error)
		case 'UNFAVORITED': return unfavorited(state, action.body)
		default: return state;
	}
}

export default reducer;