/* eslint-disable import/no-cycle */
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import classes from './article-list.module.scss';

import ArticleItem from '../article-item';
import Pagin from '../pagin';
import AlertErr from '../alert';

const ArticleList = ({ articles, error }) => {
	const elements = articles.map((__, i) => (
		<li key={uuidv4()}><ArticleItem article={articles[i]} /></li>
	));

	const alertErr = error ? <AlertErr description="List of articles not available" /> : null;
	const pagin = error ? null : <Pagin />;
	
	return (
		<>
			{alertErr}
			<ul className={classes.list}>{elements}</ul>
			{pagin}
		</>
	)
}

ArticleList.defaultProps = {
	articles: [],
	error: false
}

ArticleList.propTypes = {
	articles: PropTypes.arrayOf(PropTypes.object),
	error: PropTypes.bool
}

const mapStateToProps = (state) => {
	const { articles, error } = state;
	return ({
		articles,
		error
	})
}

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);