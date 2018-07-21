import fetch from 'cross-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';

const requestPosts = posts => {
  return {
    type : REQUEST_POSTS
  };
};

const receivePosts = posts => {
  return {
    type  : RECEIVE_POSTS,
    posts
  };
};

const requestPost = id => {
  return { type: REQUEST_POST };
};

const receivePost = post => {
  return {
    type : RECEIVE_POST,
    post
  };
};

const checkStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  else {
    let err = new Error(res.statusText + ' ' + res.status);
    err.response = res;
    throw err;
  }
};

export const fetchPosts = posts => {
  return dispatch => {
    dispatch(requestPosts(posts));
    return fetch('http://localhost:3000/api/posts', {
      method : 'GET'
    })
      .then(res => checkStatus(res))
      .then(res => res.json())
      .then(json => dispatch(receivePosts(json)))
      .catch(err => {
        console.error(err);
      });
  };
};

export const fetchPost = id => {
  return dispatch => {
    dispatch(requestPost(id));
    return fetch('http://localhost:3000/api/posts/' + id, {
      method : 'GET'
    })
      .then(res => checkStatus(res))
      .then(res => res.json())
      .then(json => dispatch(receivePost(json)))
      .catch(err => {
        console.error(err);
      });
  };
};
