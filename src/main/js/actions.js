import axios from 'axios';


export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const COMMENTS_REFRESHED = 'COMMENTS_REFRESHED';
export const AUTHENTICATED = 'AUTHENTICATED';
export const LOGGED_OUT = 'LOGGED_OUT';

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export function updateComment(comment) {
	  return {
	    type: UPDATE_COMMENT,
	    comment
	  };
	}

export function deleteComment(id) {
	  return {
	    type: DELETE_COMMENT,
	    id
	  };
}

export function removeComment(id) {
	  return dispatch => {
	    axios.delete('/api/comments/remove/' + id)
	      .then(
	        success => dispatch(deleteComment(success.data)),
	        failure => console.error(failure)
	      );
	  };
	}

export function saveComment(author, content, type) {
  return dispatch => {
    axios.post('/api/comments', { author, content, type })
      .then(
        success => dispatch(addComment(success.data)),
        failure => console.error(failure)
      );
  };
}

export function updComment(id, author, content, type) {
	  return dispatch => {
	    axios.put('/api/comments/update/' + id, {id, author, content, type })
	      .then(
	        success => dispatch(updateComment(success.data)),
	        failure => console.error(failure)
	      );
	  };
	}


export function commentsRefreshed(comments) {
  return {
    type: COMMENTS_REFRESHED,
    comments
  };
}

export function refreshComments() {
  return dispatch => {
    axios.get('/api/comments')
      .then(
        success => dispatch(commentsRefreshed(success.data)),
        failure => console.log(failure)
      );
  };
}

export function authenticated(authData) {
  return {
    type: AUTHENTICATED,
    roles: authData.roles
  };
}

export function loggedOut() {
  return {
    type: LOGGED_OUT
  };
}




