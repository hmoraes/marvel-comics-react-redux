import {APP_LOAD} from '../constants/action-types';

const defaultState = {
	appName: 'Marvel Comics',
	appLoaded: false
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case APP_LOAD:
			return {
				...state,
				appLoaded: true
			};
		default:
			return state;
	}
};