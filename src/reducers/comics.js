import {
	COMICS_EMPTY, COMICS_CHANGE_FILTER, COMICS_RENDER, COMICS_SEARCH, COMICS_ERROR,
	CODE_SEARCH_BY_TITLE, COMICS_SET_PAGE
} from '../constants/action-types';

const defaultState = {
	server_data: {},
	comics: [],
	filters: {search_by: CODE_SEARCH_BY_TITLE, search: null, page: 0},
	error: null,
	fetching: false
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case COMICS_EMPTY:
			return {
				...state,
				server_data: {},
				comics: [],
				error: null,
				fetching: false
			};
		case COMICS_RENDER:
			const data = action.result.data;
			const comics = data.results || [];
			delete data.results;
			return {
				...state,
				server_data: data,
				comics: comics,
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
				filters: {...state.filters, search: action.search ? action.search.toLowerCase() : action.search, page: 0},
				fetching: true
			};
		case COMICS_SET_PAGE:
			return {
				...state,
				filters: {...state.filters, page: action.page},
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