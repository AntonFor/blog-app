/* eslint-disable import/no-cycle */
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import classes from './article-list.module.scss';

import ArticleItem from '../article-item';
import Pagin from '../pagin';
import AlertErr from '../alert';

const ArticleList = ({ state }) => {
	const { articles, error } = state;

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
	state: {}
}

ArticleList.propTypes = {
	state: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.object,
		PropTypes.arrayOf(PropTypes.object),
		PropTypes.bool
	])
}

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps, )(ArticleList);