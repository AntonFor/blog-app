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

const App = ({ updateArticles }) => {
	useEffect(() => updateArticles(), []);

	return (
		<BrowserRouter>
			<div className={classes.app}>
				<Header />
				<Route path="/" exact component={ArticleList} />
				<Route path="/1" component={ArticleMarkdown} />
				<Route path="/sign-in" component={LoginPage} />
				<Route path="/sign-up" component={CreatePage} />
				<Route path="/profile" component={ProfilePage} />
			</div>
		</BrowserRouter>
	)
}

App.defaultProps = {
	updateArticles: () => {}
}

App.propTypes = {
	updateArticles: PropTypes.func
}

const mapStateToProps = () => {}

const mapDispatchToProps = (dispatch) => {
	const { articles } = bindActionCreators(actions, dispatch);
	return ({
		updateArticles: articles
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(App);