export const updateArticles = (state, bodyArticles) => {
	const newState = {...state, loading: false, error: false, articles: bodyArticles.articles};
	return newState;
}

export const errorArticles = (state) => {
	const newState = {...state, loading: false, error: true};
	return newState;
}

export const createAccount = (state, dataAccount) => {
	const newState = {...state, errorCreateAccount: false, isLogIn: true, user: dataAccount.user};
	return newState;
}

export const errorAccount = (state) => {
	const newState = {...state, errorCreateAccount: true};
	return newState;
}

export const logOut = (state) => {
	const newState = {...state, isLogIn: false, user: null, logIn: false}
	return newState;
}

export const logIn = (state, dataAccount) => {
	const newState = {...state, errorLogIn: false, isLogIn: true, user: dataAccount.user, logIn: true};
	return newState;
}

export const logError = (state) => {
	const newState = {...state, errorLogIn: true};
	return newState;
}

export const editProfile = (state, dataAccount) => {
	const newState = {...state, errorEditAccount: false, user: dataAccount.user, userEdit: true};
	return newState;
}

export const errorProfile = (state) => {
	const newState = {...state, errorEditAccount: true};
	return newState;
}

export const createArticle = (state, dataAccount) => {
	const newState = {...state, article: dataAccount};
	return newState;
}

export const resetUserEdit = (state) => {
	const newState = {...state, userEdit: false};
	return newState;
}

export const saveProfile = (state) => {
	localStorage.setItem('state', JSON.stringify(state));
}