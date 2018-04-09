import React from 'react';

import {Row, Col} from 'react-bootstrap';

class Header extends React.Component {
	render() {
		document.title = this.props.appName;
		return (
			<Row>
				<Col sm={12}>
					<h1 className="text-muted">{this.props.appName}</h1>
				</Col>
			</Row>
		);
	}
}

export default Header;