/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';

import * as actions from '../../actions';

import classes from './app.module.scss';
import 'antd/dist/antd.css';

import Header from '../header';
import ArticleList from '../article-list';

const App = ({ updateArticles }) => {
	useEffect(() => updateArticles(), []);

	return (
		<div className={classes.app}>
			<Header />
			<ArticleList />
		</div>
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