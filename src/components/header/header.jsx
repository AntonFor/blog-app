import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import * as actions from '../../actions';

import classes from './header.module.scss';

const Header = ({ isLogIn, users, logOut, currentUser }) => {
	const [header, setHeader] = useState(<HeaderIsNotLogIn />);
	
	useEffect(() => {
		if (isLogIn) setHeader(<HeaderIsLogIn user={users[currentUser]} onClickLogOut={logOut} />)
		else setHeader(<HeaderIsNotLogIn />)
	}, [isLogIn, users, logOut, currentUser]);

	return (
		<div>
			{header}
		</div>
	);
}

const HeaderIsNotLogIn = () => (
	<div className={classes.header}>
		<p className={classes.header__title}>Realworld Blog</p>
		<button type="button" className={classes["header__btn-sign-in"]}>
			<Link to="/sign-in" className={classes["header__link-sign-in"]}>Sign In</Link>
		</button>
		<button type="button" className={classes["header__btn-sign-up"]}>
			<Link to="/sign-up" className={classes["header__link-sign-up"]}>Sign Up</Link>
		</button>
	</div>
);

const HeaderIsLogIn = ({ user, onClickLogOut }) => {
	const { username, avatar } = user;
	const imageUser = {
		backgroundImage: `url(${avatar})`
	}

	return (
		<div className={classes.header}>
			<p className={classes.header__title}>Realworld Blog</p>
			<button type="button" className={classes["header__btn-create-article"]}>
				<Link to="/sign-in" className={classes["header__link-create-article"]}>Create article</Link>
			</button>
			<span className={classes.header__username}>
				<Link to="/profile">{username}</Link>
			</span>
			<div className={classes.header__avatar} style={imageUser}>
				<Link to="/profile" />
			</div>
			<button type="button" className={classes["header__btn-sign-out"]} onClick={onClickLogOut}>
				<Link to="/" className={classes["header__link-sign-out"]}>Log Out</Link>
			</button>
		</div>
	);
};

Header.defaultProps = {
	isLogIn: false,
	users: [],
	logOut: () => {},
	currentUser: 0
}

Header.propTypes = {
	isLogIn: PropTypes.bool,
	users: PropTypes.arrayOf(PropTypes.object),
	logOut: PropTypes.func,
	currentUser: PropTypes.number
}

HeaderIsLogIn.defaultProps = {
	user: {},
	onClickLogOut: () => {}
}

HeaderIsLogIn.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string,
		avatar: PropTypes.string
	}),
	onClickLogOut: PropTypes.func
}

const mapStateToProps = (state) => {
	const { isLogIn, users, currentUser } = state;
	return ({
		isLogIn,
		users,
		currentUser
	})
}

const mapDispatchToProps = (dispatch) => {
	const { logOut } = bindActionCreators(actions, dispatch);
	return ({
		logOut
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);