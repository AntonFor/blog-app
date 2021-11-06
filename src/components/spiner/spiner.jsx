import React from 'react';

import { Spin } from 'antd';

import classes from './spiner.module.scss';

const Spinner = () => (
		<div className={classes.example}>
			<Spin size="large" />
		</div>
	);

export default Spinner;