/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { Form, Input, Button, Checkbox } from 'antd';

import AlertErr from '../alert';

import * as actions from '../../redux/actions/actions';

import classes from './create-page.module.scss';
import './create-page.css';

const CreatePage = ({ dispatch, history, state }) => {
	const { errorCreateAccount, user } = state;
	const { createAccount } = bindActionCreators(actions, dispatch);
	
	useEffect(() => {
		if (user === null) history.push("/sign-up");
		else history.push("/");
	}, [user]);

	const [form] = Form.useForm();
	const [, forceUpdate] = useState({});

	useEffect(() => {
		forceUpdate({});
	}, []);
	
	const onFinish = (values) => {
		createAccount(values);
	};
	
	const onFinishFailed = () => {};

	const alertErr = errorCreateAccount ? <AlertErr description="Username or email already taken" /> : null;

	return (
		<Form
			form={form}
			name="normal_create"
			className={classes["create-form"]}
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			{alertErr}
			<h1 className={classes["create-form__heading"]}>Create new account</h1>
			<p className={classes["create-form__title"]}>Username</p>
			<Form.Item
				className={classes["create-form__input-username"]}
				name="username"
				rules={[
					{
						required: true,
						message: 'Please input your Username from 3 to 20 characters!',
						min: 3,
						max: 20
					},
				]}
			>
				<Input placeholder="Username" />
			</Form.Item>
	
			<p className={classes["create-form__title"]}>Email address</p>
			<Form.Item
				className={classes["create-form__input-email"]}
				name="email"
				rules={[
					{
						type: 'email',
						message: 'The input is not valid E-mail!',
					},
					{
						required: true,
						message: 'Please input your Email address!',
					},
				]}
			>
				<Input
					type="email"
					placeholder="Email address" 
				/>
			</Form.Item>
	
			<p className={classes["create-form__title"]}>Password</p>
			<Form.Item
				className={classes["create-form__input-password"]}
				name="password"
				rules={[
					{
						required: true,
						message: 'Please input your Password from 8 to 40 characters!',
						min: 8,
						max: 40
					},
				]}
			>
				<Input
					type="password"
					placeholder="Password"
				/>
			</Form.Item>
	
			<p className={classes["create-form__title"]}>Repeat Password</p>
			<Form.Item
				className={classes["create-form__input-repeatpassword"]}
				name="repeatpassword"
				rules={[
					{
						required: true,
						message: 'Please input your Password!',
					},
					({ getFieldValue }) => ({
						validator(__, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
	
							return Promise.reject(new Error('Passwords must match!'));
						},
					}),
				]}
			>
				<Input
					type="password"
					placeholder="Repeat Password"
				/>
			</Form.Item>
			<div className={classes["create-form__devider"]} />
	
			<Form.Item
				className={classes["create-form__checked"]}
				name="agreement"
				valuePropName="checked"
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
				rules={[
					{
						validator: (__, value) =>
							value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
					},
				]}
			>
				<Checkbox className={classes["create-form__checkbox"]}>I agree to the processing of my personal information</Checkbox>
			</Form.Item>
	
			<Form.Item shouldUpdate className={classes["create-form__button-container"]}>
				{() => (
					<Button 
						className={classes["create-form__button"]}
						type="primary"
						htmlType="submit"
						disabled={
							!form.isFieldsTouched(true) ||
							!!form.getFieldsError().filter(({ errors }) => errors.length).length
						}
					>
						Create
					</Button>
				)}
			</Form.Item>
			<p className={classes["create-form__ref"]}>Already have an account? <Link to="/sign-in">Sign In.</Link></p>
		</Form>
	)
}

CreatePage.defaultProps = {
	dispatch: () => {},
	history: {},
	state: {}
}

CreatePage.propTypes = {
	dispatch: PropTypes.func,
	history: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.func
	]),
	state: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.object,
		PropTypes.arrayOf(PropTypes.object),
		PropTypes.bool
	])
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePage));