import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import classes from './article-list.module.scss';

import ArticleItem from '../article-item';
import Pagin from '../pagin';

const ArticleList = ({ articles }) => {
	const elements = articles.map((__, i) => (
		<li key={uuidv4()}><ArticleItem article={articles[i]} /></li>
	));
	
	return (
		<>
			<ul className={classes.list}>{elements}</ul>
			<Pagin />
		</>
	)
}

ArticleList.defaultProps = {
	articles: []
}

ArticleList.propTypes = {
	articles: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state) => {
	const { articles } = state;
	return ({
		articles
	})
}

const mapDispatchToProps = () => {}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);