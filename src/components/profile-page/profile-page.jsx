/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Form, Input, Button } from 'antd';

import AlertErr from '../alert';

import { getPassword } from '../../utilities/utilities';

import * as actions from '../../redux/actions/actions';

import classes from './profile-page.module.scss';

const ProfilePage = ({ onClickEdit, history, errorEditAccount, userEdit, user, imgError }) => {
	useEffect(() => {
		if (!userEdit) history.push("/profile");
		else history.push("/");
	}, [userEdit]);

	const [form] = Form.useForm();
	const [, forceUpdate] = useState({});

	useEffect(() => {
		forceUpdate({});
	}, []);

	const onFinish = (values) => {
		onClickEdit(values);
	};
	
	const onFinishFailed = () => {};

	const alertErr = errorEditAccount ? <AlertErr description="Username or email already taken" /> : null;
	const alertErrImg = imgError ? <AlertErr description="The image does not exist at the specified URL" /> : null;

	return (
		<Form
			form={form}
			name="normal_profile"
			className={classes["profile-form"]}
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			initialValues={{
				username: user.username,
				email: user.email,
				password: getPassword(),
				avatar: user.image
			}}
		>
			{alertErr}
			{alertErrImg}
			<h1 className={classes["profile-form__heading"]}>Edit Profile</h1>
			<p className={classes["profile-form__title"]}>Username</p>
			<Form.Item
				className={classes["profile-form__input-username"]}
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

			<p className={classes["profile-form__title"]}>Email address</p>
			<Form.Item
				className={classes["profile-form__input-email"]}
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

			<p className={classes["profile-form__title"]}>New password</p>
			<Form.Item
				className={classes["profile-form__input-password"]}
				name="password"
				rules={[
					{
						required: false,
						message: 'Please input your Password from 8 to 40 characters!',
						min: 8,
						max: 40
					},
				]}
			>
				<Input
					type="password"
					placeholder="New password"
				/>
			</Form.Item>

			<p className={classes["profile-form__title"]}>Avatar image (url)</p>
			<Form.Item
				className={classes["profile-form__input-avatar"]}
				name="avatar"
				rules={[
					{ required: false,
						message: 'Please input your avatar image (url)!'
					},
					{ type: 'url', 
						warningOnly: true,
						message: 'The input is not valid url!'
					},
					{ type: 'string' },
				]}
			>
				<Input
					type="url"
					placeholder="Avatar image (url)"
				/>
			</Form.Item>

			<Form.Item shouldUpdate className={classes["profile-form__button-container"]}>
				{() => (
					<Button 
						className={classes["profile-form__button"]}
						type="primary"
						htmlType="submit"
						disabled={
							!form.isFieldsTouched(false) ||
							!!form.getFieldsError().filter(({ errors }) => errors.length).length
						}
					>
						Save
					</Button>
				)}
			</Form.Item>
		</Form>
	);
}

ProfilePage.defaultProps = {
	onClickEdit: () => {},
	history: {},
	errorEditAccount: false,
	userEdit: false,
	user: {},
	imgError: false
}

ProfilePage.propTypes = {
	onClickEdit: PropTypes.func,
	history: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.func
	]),
	errorEditAccount: PropTypes.bool,
	userEdit: PropTypes.bool,
	user: PropTypes.objectOf(PropTypes.string),
	imgError: PropTypes.bool
}

const mapStateToProps = (state) => {
	const { errorEditAccount, userEdit, user, imgError } = state;
	return({
		errorEditAccount,
		userEdit,
		user,
		imgError
	})
}

const mapDispatchToProps = (dispatch) => {
	const { editProfile } = bindActionCreators(actions, dispatch);
	return ({
		onClickEdit: editProfile
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePage));