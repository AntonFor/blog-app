/* eslint-disable import/no-cycle */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';

import { Pagination } from 'antd';

import * as actions from '../../actions';

import classes from './pagin.module.scss';

const Pagin = ({ articlesCount, currentPage, changePage, loading }) => {
	const hide = !!loading;
	return (
		<Pagination
			className={classes.pagin}
			size="small"
			total={articlesCount}
			current={currentPage}
			pageSize={10}
			hideOnSinglePage={hide}
			onChange={changePage}
			showSizeChanger={false}
		/>
	)
}

Pagin.defaultProps = {
	articlesCount: 0,
	currentPage: 1,
	changePage: () => {},
	loading: true
}

Pagin.propTypes = {
	articlesCount: PropTypes.number,
	currentPage: PropTypes.number,
	changePage: PropTypes.func,
	loading: PropTypes.bool
}

const mapStateToProps = (state) => {
	const { articlesCount, currentPage, loading } = state;
	return ({
		articlesCount,
		currentPage,
		loading
	})
}

const mapDispatchToProps = (dispatch) => {
	const { changePage } = bindActionCreators(actions, dispatch);
	return ({
		changePage
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagin);