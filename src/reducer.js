import { updateArticles, errorArticles, createAccount, logOut, logIn, editProfile, saveProfile } from './utilities/utilities';

const dateState = {
	loading: true,
	error: false,
	isLogIn: false,
	articles: [],
	users: [],
	currentUser: 0
}

const reducer = (state = dateState, action) => {
	switch (action.type) {
		case 'UPDATE_ARTICLES': return updateArticles(state, action.body)
		case 'ERROR_ARTICLES': return errorArticles(state, action.error)
		case 'CREATE_ACCOUNT': return createAccount(state, action.data)
		case 'LOG_OUT': return logOut(state)
		case 'LOG_IN': return logIn(state, action.data)
		case 'EDIT_PROFILE': return editProfile(state, action.data)
		case 'SAVE_PROFILE': return saveProfile(state)
		default: return state;
	}
}

export default reducer;