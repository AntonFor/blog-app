import React from 'react';
import { PropTypes } from 'prop-types';

import { Alert } from 'antd';

const AlertErr = ({ description }) => (
	<Alert
		message="Error"
		description={description}
		type="error"
		showIcon
	/>
)

AlertErr.defaultProps = {
	description: ''
}

AlertErr.propTypes = {
	description: PropTypes.string
}

export default AlertErr;