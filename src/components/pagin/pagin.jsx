/* eslint-disable import/no-cycle */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';

import { Pagination } from 'antd';

import * as actions from '../../redux/actions/actions';

import classes from './pagin.module.scss';

const Pagin = ({ state, dispatch }) => {
	const { articlesCount, currentPage, loading } = state;
	const { changePage } = bindActionCreators(actions, dispatch);

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
	state: {},
	dispatch: () => {}
}

Pagin.propTypes = {
	state: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.object,
		PropTypes.arrayOf(PropTypes.object),
		PropTypes.bool
	]),
	dispatch: PropTypes.func
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Pagin);