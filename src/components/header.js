import React from 'react';

class Header extends React.Component {
	render() {
		document.title = this.props.appName;
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="row-fluid">
						<h1 className="text-muted">{this.props.appName}</h1>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;