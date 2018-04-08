import {
	COMICS_EMPTY, COMICS_CHANGE_FILTER, COMICS_RENDER, COMICS_SEARCH, COMICS_ERROR,
	CODE_SEARCH_BY_TITLE
} from '../constants/action-types';

const defaultState = {
	server_data: {},
	comics: [],
	filters: {search_by: CODE_SEARCH_BY_TITLE, search: null},
	error: null,
	fetching: false
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case COMICS_EMPTY:
			return {
				...state,
				comics: [],
				error: null,
				fetching: false
			};
		case COMICS_RENDER:
			const data = action.result.data;
			return {
				...state,
				server_data: data,
				comics: data ? data.results : [],
				error: null,
				fetching: false
			};
		case COMICS_CHANGE_FILTER:
			return {
				...state,
				filters: action.filters,
				fetching: false
			};
		case COMICS_SEARCH:
			return {
				...state,
				filters: {...state.filters, search: action.search},
				fetching: true
			};
		case COMICS_ERROR:
			return {
				...state,
				comics: [],
				error: action.error.code,
				message: action.error.status,
				fetching: false
			};
		default:
			return state;
	}
};