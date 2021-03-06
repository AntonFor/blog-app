/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import * as actions from '../../redux/actions/actions';

import classes from './header.module.scss';

const Header = ({ state, dispatch }) => {
	const { isLogIn, user } = state;
	const { logOut, resetUserEdit } = bindActionCreators(actions, dispatch);
	
	const [header, setHeader] = useState(<HeaderIsNotLogIn />);
	
	useEffect(() => {
		if (isLogIn) setHeader(<HeaderIsLogIn user={user} onClickLogOut={logOut} resetUserEdit={resetUserEdit} />)
		else setHeader(<HeaderIsNotLogIn />)
	}, [isLogIn, user]);

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

const HeaderIsLogIn = ({ user, onClickLogOut, resetUserEdit }) => {
	const { username } = user;
	let { image } = user;
	if (image === null) image = 'https://api.realworld.io/images/smiley-cyrus.jpeg';

	useEffect(() =>resetUserEdit(), [user]);

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
					<img className={classes["header__avatar-img"]} src={image} alt="Avatar" />
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
	state: {},
	dispatch: () => {}
}

Header.propTypes = {
	state: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.object,
		PropTypes.arrayOf(PropTypes.object),
		PropTypes.bool
	]),
	dispatch: PropTypes.func
}

HeaderIsLogIn.defaultProps = {
	user: {},
	onClickLogOut: () => {},
	resetUserEdit: () => {}
}

HeaderIsLogIn.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string,
		image: PropTypes.string
	}),
	onClickLogOut: PropTypes.func,
	resetUserEdit: PropTypes.func
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Header);