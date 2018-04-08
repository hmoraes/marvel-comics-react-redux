import {
	COMICS_EMPTY, COMICS_CHANGE_FILTER, COMICS_RENDER,
	COMICS_SEARCH_BY_TITLE, COMICS_SEARCH_BY_YEAR,
	CODE_SEARCH_BY_TITLE
} from '../constants/action-types';

const defaultState = {
	comics: [],
	filters: {search_by: CODE_SEARCH_BY_TITLE},
	fetching: false
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case COMICS_EMPTY:
			return {
				...state,
				comics: [],
				fetching: false
			};
		case COMICS_RENDER:
			return {
				...state,
				comics: action.comics,
				fetching: false
			};
		case COMICS_CHANGE_FILTER:
			return {
				...state,
				filters: action.filters,
			};
		case COMICS_SEARCH_BY_TITLE:
		case COMICS_SEARCH_BY_YEAR:
			return {
				...state,
				fetching: true
			};
		default:
			return state;
	}
};