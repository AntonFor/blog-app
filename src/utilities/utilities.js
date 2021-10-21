export const updateArticles = (state, bodyArticles) => {
	const newState = {...state, loading: false, error: false, articles: bodyArticles.articles};
	return newState;
}

export const errorArticles = (state) => {
	const newState = {...state, loading: false, error: true};
	return newState;
}

export const createAccount = (state, dataAccount) => {
	const newUser = {
		username: dataAccount.username,
		email: dataAccount.email,
		password: dataAccount.password,
		avatar: './rectangle.png'
	}
	const { users } = state;
	const usersNew = [...users, newUser];
	const newState = {...state, isLogIn: true, users: usersNew};
	return newState;
}

export const logOut = (state) => {
	const newState = {...state, isLogIn: false}
	return newState;
}

export const logIn = (state, dataAccount) => {
	let newState = {...state};
	const { users } = newState;
	users.forEach((user, i) => {
		if (user.email === dataAccount.email && user.password === dataAccount.password) {
			newState = {...newState, isLogIn: true, currentUser: i}
		}
	});
	return newState;
}

export const editProfile = (state, dataAccount) => {
	let editUser = {
		username: dataAccount.username,
		email: dataAccount.email,
		password: dataAccount.password,
		avatar: dataAccount.avatar
	}
	if (dataAccount.password === undefined) editUser = {...editUser, password: state.users[state.currentUser].password}
	if (dataAccount.avatar === undefined) editUser = {...editUser, avatar: state.users[state.currentUser].avatar}
	const { users } = state;
	const newUsers = [...users.slice(0, state.currentUser), editUser, ...users.slice(state.currentUser + 1)];
	const newState = {...state, users: newUsers};
	return newState;
}