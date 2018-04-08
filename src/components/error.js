import React from 'react';
import {Panel} from 'react-bootstrap';

class Error extends React.Component {
	render() {
		console.log('Render error: ' + JSON.stringify(this.props));

		const error = this.props.error;
		const message = this.props.message;
		if (error) {
			return (
				<Panel bsStyle="danger">
					<Panel.Heading>{message || error}</Panel.Heading>
				</Panel>
			);
		} else {
			return null;
		}
	}
}

export default Error;