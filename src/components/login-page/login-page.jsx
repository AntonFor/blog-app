import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { Form, Input, Button } from 'antd';

import * as actions from '../../actions';

import classes from './login-page.module.scss';

const LoginPage = ({ onClickLogIn, history }) => {
	const onFinish = (values) => {
		console.log('Success:', values);
		onClickLogIn(values);
		history.push("/");
	};
	
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	
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
	history: {}
}

LoginPage.propTypes = {
	onClickLogIn: PropTypes.func,
	history: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
		PropTypes.func
  ])
}

const mapStateToProps = () => {}

const mapDispatchToProps = (dispatch) => {
	const { logIn } = bindActionCreators(actions, dispatch);
	return ({
		onClickLogIn: logIn
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));