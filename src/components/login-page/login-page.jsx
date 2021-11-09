/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { Form, Input, Button } from 'antd';

import AlertErr from '../alert';

import * as actions from '../../actions';

import classes from './login-page.module.scss';

const LoginPage = ({ onClickLogIn, history, errorLogIn, logIn }) => {
	useEffect(() => {
		if (!logIn) history.push("/sign-in");
		else history.push("/");
	}, [logIn]);

	const onFinish = (values) => {
		onClickLogIn(values);
	};
	
	const onFinishFailed = () => {};

	const alertErr = errorLogIn ? <AlertErr description="Email or password is invalid" /> : null;
	
	return (
		<Form
      name="normal_login"
      className={classes["login-form"]}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
			onFinishFailed={onFinishFailed}
    >
			{alertErr}
			<h1 className={classes["login-form__heading"]}>Sign In</h1>
			<p className={classes["login-form__title"]}>Email address</p>
      <Form.Item
        className={classes["login-form__input-email"]}
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
      <p className={classes["login-form__title"]}>Password</p>
			<Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item className={classes["login-form__button-container"]}>
        <Button className={classes["login-form__button"]} type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
			<p className={classes["login-form__ref"]}>Don’t have an account? <Link to="/sign-up">Sign Up.</Link></p>
    </Form>
	);
}

LoginPage.defaultProps = {
	onClickLogIn: () => {},
	history: {},
	errorLogIn: false,
	logIn: false
}

LoginPage.propTypes = {
	onClickLogIn: PropTypes.func,
	history: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
		PropTypes.func
  ]),
	errorLogIn: PropTypes.bool,
	logIn: PropTypes.bool
}

const mapStateToProps = (state) => {
	const { errorLogIn, logIn } = state;
	return({
		errorLogIn,
		logIn
	})
}

const mapDispatchToProps = (dispatch) => {
	const { logIn } = bindActionCreators(actions, dispatch);
	return ({
		onClickLogIn: logIn
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));