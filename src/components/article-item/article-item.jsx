import React from 'react';

import classes from './article-item.module.scss';

import { HeartOutlined } from '@ant-design/icons';

const ArticleItem = () => {
	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<div className={classes["content__title"]}>
					<h2 className={classes["content__heading"]}>Some article title</h2>
					<HeartOutlined />
					<span className={classes["content__number"]}>12</span>
				</div>
				<div className={classes["content__tag"]}>
					<span>Tag1</span>
				</div>
				<div className={classes["content__text"]}>
					<p className={classes["content__paragraph"]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				</div>
			</div>
			<div className={classes.person}>
				<div className={classes["person__description"]}>
					<p className={classes["person__name"]}>John Doe</p>
					<span className={classes["person__date"]}>March 5, 2020</span>
				</div>
				<div className={classes["person__avatar"]}></div>
			</div>
		</div>
	)
}

export default ArticleItem;