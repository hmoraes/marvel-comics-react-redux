import common from './reducers/common';
import comics from './reducers/comics';

import {combineReducers} from 'redux';

export default combineReducers({
	common,
	comics
});
