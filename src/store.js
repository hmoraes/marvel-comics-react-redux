import reducers from './reducer'

import {createStore} from 'redux';

export function configureStore(initialState = {}) {
	return createStore(reducers, initialState);
}

export const store = configureStore();
