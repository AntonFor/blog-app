import React from 'react';

import classes from './header.module.scss';

const Header = () => {
	return (
		<div className={classes.header}>
			<p className={classes["header__title"]}>Realworld Blog</p>
			<button className={classes["header__btn-sign-in"]}>Sign In</button>
			<button className={classes["header__btn-sign-up"]}>Sign Up</button>
		</div>
	)
}

export default Header;