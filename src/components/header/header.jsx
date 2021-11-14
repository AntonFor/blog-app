/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import * as actions from '../../redux/actions/actions';

import classes from './header.module.scss';

const Header = ({ isLogIn, user, logOut, resetUserEdit, imgIsError, history }) => {
	const [header, setHeader] = useState(<HeaderIsNotLogIn />);
	
	useEffect(() => {
		if (isLogIn) setHeader(<HeaderIsLogIn user={user} onClickLogOut={logOut} resetUserEdit={resetUserEdit} imgIsError={imgIsError} history={history} />)
		else setHeader(<HeaderIsNotLogIn />)
	}, [isLogIn, user, logOut, resetUserEdit, imgIsError, history]);

	return (
		<div>
			{header}
		</div>
	);
}

const HeaderIsNotLogIn = () => (
	<div className={classes.header}>
		<p className={classes.header__title}>
			<Link to="/" className={classes["header__link-title"]}>Realworld Blog</Link>
		</p>
		<Link to="/sign-in" className={classes["header__link-sign-in"]}>
			<button type="button" className={classes["header__btn-sign-in"]}>
				Sign In
			</button>
		</Link>
		<Link to="/sign-up" className={classes["header__link-sign-up"]}>
			<button type="button" className={classes["header__btn-sign-up"]}>
				Sign Up
			</button>
		</Link>
	</div>
);

const HeaderIsLogIn = ({ user, onClickLogOut, resetUserEdit, imgIsError, history }) => {
	const { username } = user;
	let { image } = user;
	if (image === null) image = 'https://api.realworld.io/images/smiley-cyrus.jpeg';

	const onErrorImg = () => {
		imgIsError();
		history.push("/profile");
	}

	resetUserEdit();

	return (
		<div className={classes.header}>
			<p className={classes.header__title}>
				<Link to="/" className={classes["header__link-title"]}>Realworld Blog</Link>
			</p>
			<Link to="/new-article" className={classes["header__link-create-article"]}>
				<button type="button" className={classes["header__btn-create-article"]}>
					Create article
				</button>
			</Link>
			<span className={classes.header__username}>
				<Link to="/profile" className={classes["header__username-link"]}>{username}</Link>
			</span>
			<Link to="/profile" className={classes["header__avatar-link"]}>
				<div className={classes.header__avatar}>
					<img className={classes["header__avatar-img"]} src={image} alt="Avatar" onError={() => onErrorImg()}/>
				</div>
			</Link>
			<Link to="/" className={classes["header__link-sign-out"]}>
				<button type="button" className={classes["header__btn-sign-out"]} onClick={onClickLogOut}>
					Log Out
				</button>
			</Link>
		</div>
	);
};

Header.defaultProps = {
	isLogIn: false,
	user: {},
	logOut: () => {},
	resetUserEdit: () => {},
	imgIsError: () => {},
	history: {}
}

Header.propTypes = {
	isLogIn: PropTypes.bool,
	user: PropTypes.objectOf(PropTypes.string),
	logOut: PropTypes.func,
	resetUserEdit: PropTypes.func,
	imgIsError: PropTypes.func,
	history: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.func
	])
}

HeaderIsLogIn.defaultProps = {
	user: {},
	onClickLogOut: () => {},
	resetUserEdit: () => {},
	imgIsError: () => {},
	history: {}
}

HeaderIsLogIn.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string,
		image: PropTypes.string
	}),
	onClickLogOut: PropTypes.func,
	resetUserEdit: PropTypes.func,
	imgIsError: PropTypes.func,
	history: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.func
	])
}

const mapStateToProps = (state) => {
	const { isLogIn, user } = state;
	return ({
		isLogIn,
		user
	})
}

const mapDispatchToProps = (dispatch) => {
	const { logOut, resetUserEdit, imgIsError } = bindActionCreators(actions, dispatch);
	return ({
		logOut,
		resetUserEdit,
		imgIsError
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));