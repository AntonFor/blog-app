import React from 'react';
import PropTypes from 'prop-types';

import { HeartOutlined } from '@ant-design/icons';
import classes from './article-item.module.scss';


const ArticleItem = (props) => {
	const { article } = props;
	
	const tags = article.tagList.map(item => (
		<li>{item}</li>
	));
	
	const imageAuthor = {
		backgroundImage: `url(${article.author.image})`
	}

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<div className={classes.content__title}>
					<h2 className={classes.content__heading}>{article.title}</h2>
					<HeartOutlined />
					<span className={classes.content__number}>{article.favoritesCount}</span>
				</div>
				<div className={classes.content__tag}>
					<ul className={classes["content__tag-list"]}>{tags}</ul>
				</div>
				<div className={classes.content__text}>
					<p className={classes.content__paragraph}>{article.description}</p>
				</div>
			</div>
			<div className={classes.person}>
				<div className={classes.person__description}>
					<p className={classes.person__name}>{article.author.username}</p>
					<span className={classes.person__date}>11111</span>
				</div>
				<div className={classes.person__avatar} style={imageAuthor} />
			</div>
		</div>
	)
}

ArticleItem.defaultProps = {
	article: {}
}

ArticleItem.propTypes = {
	article: PropTypes.shape({
		title: PropTypes.string,
		favoritesCount: PropTypes.number,
		tagList: PropTypes.arrayOf(PropTypes.object),
		description: PropTypes.string,
		author: PropTypes.shape({
			username: PropTypes.string,
			image: PropTypes.string
		}),
		updatedAt: PropTypes.string
	})
}

export default ArticleItem;