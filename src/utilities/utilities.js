/* eslint-disable eqeqeq */
export const updateArticles = (state, bodyArticles) => {
	const newState = {...state, loading: false, error: false, articles: bodyArticles.articles, articlesCount: bodyArticles.articlesCount};
	return newState;
}

export const errorArticles = (state) => {
	const newState = {...state, loading: false, error: true};
	return newState;
}

export const createAccount = (state, dataAccount, dataUser) => {
	const newState = {...state, errorCreateAccount: false, isLogIn: true, user: dataAccount.user};
	const body = {
		"email": dataUser.email,
		"password": dataUser.password
	};
	localStorage.setItem('user', JSON.stringify(body));
	localStorage.setItem('isLogIn', JSON.stringify(true));
	return newState;
}

export const errorAccount = (state) => {
	const newState = {...state, errorCreateAccount: true};
	return newState;
}

export const logOut = (state) => {
	const newState = {...state, isLogIn: false, user: null, logIn: false};
	localStorage.setItem('isLogIn', JSON.stringify(false));
	return newState;
}

export const logIn = (state, dataAccount, dataUser) => {
	const newState = {...state, errorLogIn: false, isLogIn: true, user: dataAccount.user, logIn: true};
	localStorage.setItem('user', JSON.stringify(dataUser));
	localStorage.setItem('isLogIn', JSON.stringify(true));
	return newState;
}

export const logError = (state) => {
	const newState = {...state, errorLogIn: true};
	return newState;
}

export const editProfile = (state, dataAccount, dataUser) => {
	const newState = {...state, errorEditAccount: false, user: dataAccount.user, userEdit: true};
	let body = {
		"email": dataUser.email
	};
	if (dataUser.password !== undefined) body = {...body, "password": dataUser.password}
	else {
		const user = localStorage.getItem('user');
		const getUser = JSON.parse(user);
		body = {...body, "password": getUser.password};
	}
	localStorage.setItem('user', JSON.stringify(body));
	return newState;
}

export const errorProfile = (state) => {
	const newState = {...state, errorEditAccount: true};
	return newState;
}

export const createArticle = (state, dataAccount) => {
	const newState = {...state, article: dataAccount.article};
	return newState;
}

export const resetUserEdit = (state) => {
	const newState = {...state, userEdit: false, imgError: false};
	return newState;
}

export const changePage = (state, page) => {
	const newState = {...state, currentPage: page};
	return newState;
}

export const editArticle = (state, dataArticle) => {
	const newState = {...state, article: dataArticle.article};
	return newState;
}

export const deleteArticle = (state) => {
	const newState = {...state, article: {}};
	return newState;
}

export const errorDeleteArticle = (state, error) => {
	if (error == 'Error: 204') {
		const newState = {...state, article: {}};
		return newState;
	}
	return state;
}

export const unfavorited = (state, dataArticle) => {
	const newState = {...state, article: dataArticle.article};
	return newState;
}

export const setImgError = (state) => {
	const newState = {...state, imgError: true};
	return newState;
}

export const creatorActionObj = (type, ...arg) => {
	let obj = {
		type
	};
	const [ body = null, data = null ] = arg;
	obj = {...obj, body, data};
	return obj;
}

export const getOfset = (currentPage) => ((currentPage - 1) * 10);

export const getToken = (obj) => {
	if (obj === null) return '';
	return obj.token;
}

export const getTags = (value) => {
	const arrKeys = Object.keys(value);
	let tags = [];
	arrKeys.forEach((item) => {
		const str = item.slice("-", 3);
		if (str === 'tag') tags.push(value[item]);
	});
	if (tags[0] === undefined) tags = [];
	return tags;
}

export const getPassword = () => {
	const user = localStorage.getItem('user');
	const getUser = JSON.parse(user);
	return getUser.password;
}

export const imgCheck = (srcImg, callback, callbackErr, arg) => {
	const img = new Image();
	img.src = srcImg;
	img.onload = () => callback(arg);
	img.onerror = () => callbackErr();
}