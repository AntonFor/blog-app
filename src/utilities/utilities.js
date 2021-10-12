export const updateArticles = (state, bodyArticles) => {
	console.log(bodyArticles);
	const newState = {...state, loading: false, error: false};
	return newState;
}

export const errorArticles = (state) => {
	const newState = {...state, loading: false, error: true};
	return newState;
}