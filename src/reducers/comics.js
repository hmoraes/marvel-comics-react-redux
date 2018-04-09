import {
	COMICS_EMPTY, COMICS_CHANGE_FILTER, COMICS_RENDER, COMICS_SEARCH, COMICS_ERROR, CHAR_SHOW,
	CODE_SEARCH_BY_TITLE, COMICS_SET_PAGE
} from '../constants/action-types';

const defaultState = {
	server_data: {},
	comics: [],
	filters: {search_by: CODE_SEARCH_BY_TITLE, search: null, page: 0},
	character: null,
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
				character: null,
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
				character: null,
				error: null,
				fetching: false
			};
		case COMICS_CHANGE_FILTER:
			return {
				...state,
				filters: action.filters,
				character: null,
				fetching: false
			};
		case COMICS_SEARCH:
			return {
				...state,
				filters: {...state.filters, search: action.search ? action.search.toLowerCase() : action.search, page: 0},
				character: null,
				fetching: true
			};
		case COMICS_SET_PAGE:
			return {
				...state,
				filters: {...state.filters, page: action.page},
				character: null,
				fetching: true
			};
		case COMICS_ERROR:
			return {
				...state,
				comics: [],
				error: action.error.code,
				message: action.error.status,
				character: null,
				fetching: false
			};
		case CHAR_SHOW:
			const char = action.character;
			if (char.response && char.response.data && char.response.data.results.length > 0) {
				const result = char.response.data.results[0];
				return {
					...state,
					character: {
						...action.character,
						...result,
						done: true
					}
				};
			}
			return {
				...state,
				character: action.character
			};
		default:
			return state;
	}
};