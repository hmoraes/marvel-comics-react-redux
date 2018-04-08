import agent from '../agent';
import Header from './header';
import ComicList from './comic-list';
import {APP_LOAD} from '../constants/action-types';

import React from 'react';
import Loader from 'react-loader';
import {connect} from 'react-redux';
import {Grid} from 'react-bootstrap';

const mapStateToProps = state => {
	return {
		appLoaded: state.common.appLoaded,
		appName: state.common.appName,
	}
};

const mapDispatchToProps = dispatch => ({
	onLoad: () =>
		dispatch({type: APP_LOAD}),
});

class App extends React.Component {
	componentWillReceiveProps(nextProps) {
		// if (nextProps.redirectTo) {
		// 	// this.context.router.replace(nextProps.redirectTo);
		// 	store.dispatch(push(nextProps.redirectTo));
		// 	this.props.onRedirect();
		// }
	}

	componentWillMount() {
		const apikey = process.env.REACT_APP_MARVEL_APIKEY;
		if (apikey) {
			agent.setApikey(apikey);
		}

		const limitCount = process.env.REACT_APP_LIMIT_COUNT;
		if (limitCount) {
			agent.setLimitCount(limitCount);
		}

		this.props.onLoad();
	}

	render() {
		return (
			<Grid className="row">
				<Header
					appName={this.props.appName}/>
				<Loader loaded={this.props.appLoaded}>
					<ComicList/>
				</Loader>
			</Grid>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);