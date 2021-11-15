/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Modal } from 'antd';
import { HeartOutlined, HeartTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';

import { format } from 'date-fns';

import * as actions from '../../redux/actions/actions';

import classes from './article-markdown.module.scss';

const { confirm } = Modal;

const ArticleMarkdown = ({ match, articles, user, history, deleteArticle, favorites }) => {
	const [ heartIcon, setHeartIcon ] = useState();
	
	const { params } = match;
	const { slug } = params;
	let idx = articles.findIndex((el) => el.slug === slug);

	if (idx === -1) idx = 0;
	const tags = articles[idx].tagList.map((item, i) => (
		<li key={i} className={classes["content__tag-item"]}>{item}</li>
	));

	useEffect(() => {
		const { favorited } = articles[idx];
		if (favorited === true) setHeartIcon(<HeartTwoTone twoToneColor="red" onClick={() => favorites(articles[idx].favorited, slug)} />);
		else setHeartIcon(<HeartOutlined onClick={() => favorites(articles[idx].favorited, slug)} />);
	}, [articles]);

	const buttonGroup = (user.username === articles[idx].author.username) ? <ButtonGroup slug={slug} history={history} deleteArticle={deleteArticle} /> : null;

	return(
		<div className={classes.container}>
			<div className={classes.container__content}>
				<div className={classes.content}>
					<div className={classes.content__title}>
						<h2 className={classes.content__heading}>{articles[idx].title}</h2>
						{heartIcon}
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
	history: {},
	deleteArticle: () => {},
	favorites: () => {}
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
	]),
	deleteArticle: PropTypes.func,
	favorites: PropTypes.func
}

const mapStateToProps = (state) => {
	const { articles, user } = state;
	return ({
		articles,
		user
	})
}

const mapDispatchToProps = (dispatch) => {
	const { deleteArticle, favorites } = bindActionCreators(actions, dispatch);
	return ({
		deleteArticle,
		favorites
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticleMarkdown));

const ButtonGroup = ({ slug, history, deleteArticle }) => {
	const onClickEditButton = () => {
		history.push(`/articles/${slug}/edit`);
	}

	const showDeleteConfirm = () => {
		confirm({
			title: 'Are you sure to delete this article?',
			icon: <ExclamationCircleOutlined />,
			content: '',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteArticle(slug);
				history.push(`/articles`);
			},
			onCancel() {},
		});
	}

	return (
		<div className={classes.buttons}>
			<button className={classes["button-del"]} onClick={showDeleteConfirm} type="button">Delete</button>
			<button className={classes["button-edit"]} type="button" onClick={() => onClickEditButton(slug)}>Edit</button>
		</div>
	)
}

ButtonGroup.defaultProps = {
	slug: '',
	history: {},
	deleteArticle: () => {}
}

ButtonGroup.propTypes = {
	slug: PropTypes.string,
	history: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.func
	]),
	deleteArticle: PropTypes.func
}