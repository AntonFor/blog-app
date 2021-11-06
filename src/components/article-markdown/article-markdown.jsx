/* eslint-disable react/no-array-index-key */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { HeartOutlined } from '@ant-design/icons';

import { format } from 'date-fns';

import classes from './article-markdown.module.scss';

const ArticleMarkdown = ({ match, articles, user, history }) => {
	const { params } = match;
	const { slug } = params;
	let idx = articles.findIndex((el) => el.slug === slug);

	if (idx === -1) idx = 0;
	const tags = articles[idx].tagList.map((item, i) => (
		<li key={i} className={classes["content__tag-item"]}>{item}</li>
	));

	const buttonGroup = (user.username === articles[idx].author.username) ? <ButtonGroup slug={slug} history={history} /> : null;

	return(
		<div className={classes.container}>
			<div className={classes.container__content}>
				<div className={classes.content}>
					<div className={classes.content__title}>
						<h2 className={classes.content__heading}>{articles[idx].title}</h2>
						<HeartOutlined />
						<span className={classes.content__number}>{articles[idx].favoritesCount}</span>
					</div>
					<div className={classes.content__tag}>
						<ul className={classes["content__tags-list"]}>{tags}</ul>
					</div>
					<div className={classes.content__text}>
						<p className={classes.content__paragraph}>{articles[idx].description}</p>
					</div>
				</div>
				<div className={classes.person}>
					<div className={classes["person-box"]}>
						<div className={classes.person__description}>
							<p className={classes.person__name}>{articles[idx].author.username}</p>
							<span className={classes.person__date}>{format(new Date(articles[idx].updatedAt), "MMMM d, yyyy")}</span>
						</div>
						<div className={classes.person__avatar}>
							<img className={classes["person__avatar-img"]} src={articles[idx].author.image} alt="Avatar"/>
						</div>
					</div>
					{buttonGroup}
				</div>
			</div>
			<ReactMarkdown className={classes.container__markdown}>{articles[idx].body}</ReactMarkdown>
		</div>
	)
}

ArticleMarkdown.defaultProps = {
	articles: [],
	match: {},
	user: {},
	history: {}
}

ArticleMarkdown.propTypes = {
	articles: PropTypes.arrayOf(PropTypes.object),
	match: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
		PropTypes.string
  ]),
	user: PropTypes.objectOf(PropTypes.string),
	history: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
		PropTypes.func
  ])
}

const mapStateToProps = (state) => {
	const { articles, user } = state;
	return ({
		articles,
		user
	})
}

const mapDispatchToProps = () => {}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticleMarkdown));

const ButtonGroup = ({ slug, history }) => {
	const onClickEditButton = () => {
		history.push(`/articles/${slug}/edit`);
	}
	return (
		<div className={classes.buttons}>
			<button className={classes["button-del"]} type="button">Delete</button>
			<button className={classes["button-edit"]} type="button" onClick={() => onClickEditButton(slug)}>Edit</button>
		</div>
	)
}

ButtonGroup.defaultProps = {
	slug: '',
	history: {}
}

ButtonGroup.propTypes = {
	slug: PropTypes.string,
	history: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
		PropTypes.func
  ])
}