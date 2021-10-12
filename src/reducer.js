import { updateArticles, errorArticles } from './utilities/utilities';

const dateState = {
	loading: true,
	error: false
}

const reducer = (state = dateState, action) => {
	switch (action.type) {
		case 'UPDATE_ARTICLES': return updateArticles(state, action.body)
		case 'ERROR_ARTICLES': return errorArticles(state, action.error)
		default: return state;
	}
}

export default reducer;