/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';

import * as actions from '../../actions';

import classes from './app.module.scss';
import 'antd/dist/antd.css';

import Header from '../header';
import ArticleList from '../article-list';
import ArticleMarkdown from '../article-markdown';
import LoginPage from '../login-page';
import CreatePage from '../create-page';
import ProfilePage from '../profile-page';
import CreateArticle from '../create-article';
import EditArticle from '../edit-article';
import Spiner from '../spiner';

const App = ({ updateArticles, article, logIn, user, currentPage, loading }) => {
	useEffect(() => {
		updateArticles();
	}, [article, user, currentPage]);

	useEffect(() => {
		const isLogIn = localStorage.getItem('isLogIn');
		const getIsLogIn = JSON.parse(isLogIn);
		if (getIsLogIn) {
			const getUser = localStorage.getItem('user');
			const getUserPars = JSON.parse(getUser);
			logIn(getUserPars);
		}
	}, []);

	const spiner = loading ? <Spiner /> : null;

	return (
		<BrowserRouter>
			<div className={classes.app}>
				<Header />
				{spiner}
				<Route path="/" exact component={ArticleList} />
				<Route path="/articles" exact component={ArticleList} />
				<Route path="/articles/:slug" exact component={ArticleMarkdown} />
				<Route path="/sign-in" component={LoginPage} />
				<Route path="/sign-up" component={CreatePage} />
				<Route path="/profile" component={ProfilePage} />
				<Route path="/new-article" component={CreateArticle} />
				<Route path="/articles/:slug/edit"component={EditArticle} />
			</div>
		</BrowserRouter>
	)
}

App.defaultProps = {
	updateArticles: () => {},
	article: {},
	logIn: () => {},
	user: {},
	currentPage: 0,
	loading: false
}

App.propTypes = {
	updateArticles: PropTypes.func,
	article: PropTypes.objectOf(PropTypes.object),
	logIn: PropTypes.func,
	user: PropTypes.objectOf(PropTypes.string),
	currentPage: PropTypes.number,
	loading: PropTypes.bool
}

const mapStateToProps = (state) => {
	const { article, errorCreateAccount, user, currentPage, loading } = state;
	return ({
		article,
		errorCreateAccount,
		user,
		currentPage,
		loading
	})
}

const mapDispatchToProps = (dispatch) => {
	const { articles, logIn } = bindActionCreators(actions, dispatch);
	return ({
		updateArticles: articles,
		logIn
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(App);