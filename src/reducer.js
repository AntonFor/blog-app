import { updateArticles, errorArticles, createAccount, logOut, logIn, editProfile, createArticle, 
	saveProfile, errorAccount, errorProfile, resetUserEdit, logError } from './utilities/utilities';

const dateState = {
	loading: true,
	error: false,
	errorCreateAccount: false,
	errorEditAccount: false,
	errorLogIn: false,
	// errorMessage: '',
	isLogIn: false,
	articles: [],
	user: null,
	article: null,
	userEdit: false,
	logIn: false
}

const reducer = (state = dateState, action) => {
	switch (action.type) {
		case 'UPDATE_ARTICLES': return updateArticles(state, action.body)
		case 'ERROR_ARTICLES': return errorArticles(state, action.error)
		case 'CREATE_ACCOUNT': return createAccount(state, action.body)
		case 'ERROR_ACCOUNT': return errorAccount(state, action.error)
		case 'LOG_OUT': return logOut(state)
		case 'LOG_IN': return logIn(state, action.body)
		case 'LOG_ERROR': return logError(state, action.error)
		case 'EDIT_PROFILE': return editProfile(state, action.body)
		case 'ERROR_PROFILE': return errorProfile(state, action.error)
		case 'CREATE_ARTICLE': return createArticle(state, action.body)
		case 'RESET_USER_EDIT': return resetUserEdit(state)
		case 'SAVE_PROFILE': return saveProfile(state)
		default: return state;
	}
}

export default reducer;