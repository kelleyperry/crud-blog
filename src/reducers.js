import { combineReducers } from 'redux';

import { REQUEST_POSTS, RECEIVE_POSTS, REQUEST_POST, RECEIVE_POST } from './actions';

function posts(
	state = {
		isFetching: false,
		posts: []
	},
	action
){
	switch (action.type) {
		case REQUEST_POSTS:
			return Object.assign({}, state, {
				isFetching: true
			});
		case RECEIVE_POSTS:
			return Object.assign({}, state, {
				isFetching: false,
				posts: action.posts
			});
		default:
			return state;
	}
}

function post(
	state = {
		activePost: []
	},
	action
){
	switch (action.type) {
		case REQUEST_POST:
			return Object.assign({}, state, {
				isFetching: true
			});
		case RECEIVE_POST:
			return Object.assign({}, state, {
				isFetching: false,
				activePost: action.post
			});
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	posts,
	post
});

export default rootReducer;
