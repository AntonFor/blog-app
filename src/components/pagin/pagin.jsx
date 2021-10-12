import React from 'react';

import { Pagination } from 'antd';

import classes from './pagin.module.scss';

const Pagin = () => {
	return (
		<Pagination className={classes.pagin} size="small" total={50} />
	)
}

export default Pagin;