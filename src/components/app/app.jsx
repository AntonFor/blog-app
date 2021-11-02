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

const App = ({ updateArticles, saveProfile, article, user }) => {
	useEffect(() => {
		updateArticles();
	}, [article]);

	useEffect(() => {
		console.log(saveProfile);
	}, [user]);

	return (
		<BrowserRouter>
			<div className={classes.app}>
				<Header />
				<Route path="/" exact component={ArticleList} />
				<Route path="/1" component={ArticleMarkdown} />
				<Route path="/sign-in" component={LoginPage} />
				<Route path="/sign-up" component={CreatePage} />
				<Route path="/profile" component={ProfilePage} />
				<Route path="/new-article" component={CreateArticle} />
				<Route path="/edit" component={EditArticle} />
			</div>
		</BrowserRouter>
	)
}

App.defaultProps = {
	updateArticles: () => {},
	saveProfile: () => {},
	article: {},
	user: {}
}

App.propTypes = {
	updateArticles: PropTypes.func,
	saveProfile: PropTypes.func,
	article: PropTypes.objectOf(PropTypes.object),
	user: PropTypes.objectOf(PropTypes.string)
}

const mapStateToProps = (state) => {
	const { article, user, errorCreateAccount } = state;
	return ({
		article,
		user,
		errorCreateAccount
	})
}

const mapDispatchToProps = (dispatch) => {
	const { articles, saveProfile } = bindActionCreators(actions, dispatch);
	return ({
		updateArticles: articles,
		saveProfile
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(App);