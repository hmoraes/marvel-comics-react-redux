import {
	CHAR_SEARCH_BY_NAME
} from "../constants/action-types";

const defaultState = {
	chars: [],
	filters: {}
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case CHAR_SEARCH_BY_NAME:
			return {
				...state,
				chars: [],
				filters: {}
			};
		default:
			return state;
	}
};