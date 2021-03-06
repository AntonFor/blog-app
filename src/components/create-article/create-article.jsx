/* eslint-disable import/no-cycle */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { Form, Input, Button } from 'antd';

import * as actions from '../../redux/actions/actions';

import Tags from '../tags';

import classes from './create-article.module.scss';

const CreateArticle = ({ dispatch, history }) => {
	const { createArticle } = bindActionCreators(actions, dispatch);

	const [form] = Form.useForm();
	
	const onFinish = (values) => {
		createArticle(values);
		history.push("/");
	};
	
	const onFinishFailed = () => {};
	
	return (
		<Form
			form={form}
			name="article_create"
			className={classes["create-form"]}
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<h1 className={classes["create-form__heading"]}>Create new article</h1>
			<p className={classes["create-form__title"]}>Title</p>
			<Form.Item
				className={classes["create-form__input-title"]}
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

			<p className={classes["create-form__description"]}>Short description</p>
			<Form.Item
				className={classes["create-form__input-description"]}
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

			<p className={classes["create-form__text"]}>Text</p>
			<Form.Item
				className={classes["create-form__input-text"]}
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

			<div><Tags /></div>

			<Form.Item shouldUpdate className={classes["create-form__button-container"]}>
				{() => (
					<Button 
						className={classes["create-form__button"]}
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

CreateArticle.defaultProps = {
	dispatch: () => {},
	history: {}
}

CreateArticle.propTypes = {
	dispatch: PropTypes.func,
	history: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.func
	])
}

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(null, mapDispatchToProps)(withRouter(CreateArticle));