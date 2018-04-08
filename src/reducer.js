import common from './reducers/common';
import comics from './reducers/comics';
import characters from './reducers/characters';

import {combineReducers} from 'redux';

export default combineReducers({
	common,
	comics,
	characters
});
