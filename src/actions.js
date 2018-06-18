import fetch from 'cross-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

const requestPosts = posts => {
	return {
		type: REQUEST_POSTS
	};
};

const receivePosts = posts => {
	return {
		type: RECEIVE_POSTS,
		posts
	};
};

const checkStatus = res => {
	if (res.status >= 200 && res.status < 300) {
		return res;
	} else {
		let err = new Error(res.statusText + ' ' + res.status);
		err.response = res;
		throw err;
	}
};

export const fetchPosts = posts => {
	return dispatch => {
		dispatch(requestPosts(posts));
		return (
			fetch('http://localhost:3000/api/posts', {
				method: 'GET'
			})
				.then(res => checkStatus(res))
				.then(res => res.json())
				// .then(json => console.log('JSON' + JSON.stringify(json)))
				.then(json => dispatch(receivePosts(json)))
				.catch(err => {
					console.error(err);
				})
		);
	};
};
