/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { HeartOutlined } from '@ant-design/icons';

import { format } from 'date-fns';

import classes from './article-item.module.scss';

const ArticleItem = ({ article, history }) => {
	const tags = article.tagList.map((item, i) => (
		<li key={i} className={classes["content__tag-item"]}>{item}</li>
	));

	const onClickTitle = ({ target }) => {
		const { id } = target;
		history.push(`/articles/${id}`)
	}

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<div className={classes.content__title}>
					<div role="button" tabIndex={0} onClick={(event) => {onClickTitle(event)}} onKeyPress={(event) => {onClickTitle(event)}}>
						<h2 id={article.slug} className={classes.content__heading}>{article.title}</h2>
					</div>
					<HeartOutlined />
					<span className={classes.content__number}>{article.favoritesCount}</span>
				</div>
				<div className={classes.content__tag}>
					<ul className={classes["content__tags-list"]}>{tags}</ul>
				</div>
				<div className={classes.content__text}>
					<p className={classes.content__paragraph}>{article.description}</p>
				</div>
			</div>
			<div className={classes.person}>
				<div className={classes.person__description}>
					<p className={classes.person__name}>{article.author.username}</p>
					<span className={classes.person__date}>{format(new Date(article.updatedAt), "MMMM d, yyyy")}</span>
				</div>
				<div className={classes.person__avatar}>
					<img className={classes["person__avatar-img"]} src={article.author.image} alt="Avatar"/>
				</div>
			</div>
		</div>
	)
}

ArticleItem.defaultProps = {
	article: {},
	history: {}
}

ArticleItem.propTypes = {
	article: PropTypes.shape({
		slug: PropTypes.string,
		title: PropTypes.string,
		favoritesCount: PropTypes.number,
		tagList: PropTypes.arrayOf(PropTypes.string),
		description: PropTypes.string,
		author: PropTypes.shape({
			username: PropTypes.string,
			image: PropTypes.string
		}),
		updatedAt: PropTypes.string,
	}),
	history: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.func
	])
}

export default withRouter(ArticleItem);