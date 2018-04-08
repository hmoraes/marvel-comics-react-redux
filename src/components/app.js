import agent from '../agent';
import Header from './header';
import {APP_LOAD} from '../constants/action-types';

import React from 'react';
import Loader from 'react-loader';
import {connect} from 'react-redux';

const mapStateToProps = state => {
	return {
		appLoaded: state.common.appLoaded,
		appName: state.common.appName,
	}
};

const mapDispatchToProps = dispatch => ({
	onLoad: () =>
		dispatch({type: APP_LOAD, skipTracking: true}),
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
		const apikey = process.env.MARVEL_APIKEY;
		if (apikey) {
			agent.setApikey(apikey);
		}

		const limitCount = process.env.LIMIT_COUNT;
		if (limitCount) {
			agent.setLimitCount(limitCount);
		}

		this.props.onLoad();
	}

	render() {
		return (
			<div>
				<Header
					appName={this.props.appName}/>
				<Loader loaded={this.props.appLoaded}>
					Carregado
				</Loader>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);