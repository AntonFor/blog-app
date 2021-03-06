/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable import/no-cycle */
import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { Form, Input, Button } from 'antd';

import * as actions from '../../redux/actions/actions';

import EditTags from '../edit-tags';

import classes from './edit-article.module.scss';

const EditArticle = ({ history, match, state, dispatch }) => {
	const { articles } = state;
	const { editArticle } = bindActionCreators(actions, dispatch);
	
	const { params } = match;
	const { slug } = params;
	const idx = articles.findIndex((el) => el.slug === slug);

	const [form] = Form.useForm();
	const [, forceUpdate] = useState({});

	useEffect(() => {
		forceUpdate({});
	}, []);
	
	const onFinish = (values) => {
		editArticle(values, slug);
		history.push(`/articles/${slug}`);
	};
	
	const onFinishFailed = () => {};
	
	return (
		<Form
			form={form}
			name="article_edit"
			className={classes["edit-form"]}
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			initialValues={{
				title: articles[idx].title,
				description: articles[idx].description,
				text: articles[idx].body
			}}
		>
			<h1 className={classes["edit-form__heading"]}>Edit article</h1>
			<p className={classes["edit-form__title"]}>Title</p>
			<Form.Item
				className={classes["edit-form__input-title"]}
				name="title"
				rules={[
					{
						required: true,
						message: 'Please input title article!',
					},
				]}
			>
				<Input placeholder="Title" />
			</Form.Item>

			<p className={classes["edit-form__description"]}>Short description</p>
			<Form.Item
				className={classes["edit-form__input-description"]}
				name="description"
				rules={[
					{
						required: true,
						message: 'Please input short description article!',
					},
				]}
			>
				<Input
					placeholder="Short description"
				/>
			</Form.Item>

			<p className={classes["edit-form__text"]}>Text</p>
			<Form.Item
				className={classes["edit-form__input-text"]}
				name="text"
				rules={[
					{
						required: true,
						message: 'Please input text article!',
					},
				]}
			>
				<Input.TextArea placeholder="Text" autoSize={{ minRows: 7, maxRows: 7 }} />
			</Form.Item>

			<div><EditTags tags={articles[idx].tagList} /></div>

			<Form.Item shouldUpdate className={classes["edit-form__button-container"]}>
				{() => (
					<Button 
						className={classes["edit-form__button"]}
						type="primary"
						htmlType="submit"
						disabled={
							!form.isFieldsTouched(false) ||
							!!form.getFieldsError().filter(({ errors }) => errors.length).length
						}
					>
						Send
					</Button>
				)}
			</Form.Item>
		</Form>
	);
}

EditArticle.defaultProps = {
	history: {},
	match: {},
	state: {},
	dispatch: () => {}
}

EditArticle.propTypes = {
	history: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.func
	]),
	match: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.object,
		PropTypes.string
	]),
	state: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.object,
		PropTypes.arrayOf(PropTypes.object),
		PropTypes.bool
	]),
	dispatch: PropTypes.func
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditArticle));