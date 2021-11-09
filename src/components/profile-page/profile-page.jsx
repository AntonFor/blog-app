/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Form, Input, Button } from 'antd';

import AlertErr from '../alert';

import * as actions from '../../actions';

import classes from './profile-page.module.scss';

const ProfilePage = ({ onClickEdit, history, errorEditAccount, userEdit }) => {
	useEffect(() => {
		if (!userEdit) history.push("/profile");
		else history.push("/");
	}, [userEdit]);

	const onFinish = (values) => {
		onClickEdit(values);
	};
	
	const onFinishFailed = () => {};

	const alertErr = errorEditAccount ? <AlertErr description="Username or email already taken" /> : null;

	return (
		<Form
      name="normal_profile"
      className={classes["profile-form"]}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
			onFinishFailed={onFinishFailed}
    >
			{alertErr}
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

      <Form.Item className={classes["profile-form__button-container"]}>
        <Button 
					className={classes["profile-form__button"]}
					type="primary"
					htmlType="submit"
				>
					Save
        </Button>
      </Form.Item>
    </Form>
	);
}

ProfilePage.defaultProps = {
	onClickEdit: () => {},
	history: {},
	errorEditAccount: false,
	userEdit: false
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
	userEdit: PropTypes.bool
}

const mapStateToProps = (state) => {
	const { errorEditAccount, userEdit } = state;
	return({
		errorEditAccount,
		userEdit
	})
}

const mapDispatchToProps = (dispatch) => {
	const { editProfile } = bindActionCreators(actions, dispatch);
	return ({
		onClickEdit: editProfile
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePage));