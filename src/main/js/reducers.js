import { combineReducers } from 'redux';
import { ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, COMMENTS_REFRESHED, AUTHENTICATED, LOGGED_OUT } from './actions';

export function commentsReducer(state = { status: 'stale', data: [] }, action = {}) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        status: state.status,
        data: state.data.concat(action.comment)
      };
      
    case UPDATE_COMMENT:
        return {
          status: state.status,
          data: action.comment
        };  

    case DELETE_COMMENT:
        return {
          status: state.status,
          data: action.comment.id
    }; 
      
    case COMMENTS_REFRESHED:
      return {
        status: 'loaded',
        data: action.comments
      };

    default:
      return state;
  }
}

export function authReducer(state = { signedIn: false, roles: [] }, action = {}) {
  switch (action.type) {
    case AUTHENTICATED:
      return Object.assign({}, state, {
        signedIn: true,
        roles: action.roles
      });

    case LOGGED_OUT:
      return Object.assign({}, state, {
        signedIn: false,
        roles: ['ROLE_ANONYMOUS']
      });

    default:
      return state;
  }
}

export function errorsReducer(state = {} /* , action */) {
  return state;
}

/* Combine the routing reducer with the application's reducer(s) */
const reducer = combineReducers(Object.assign({}, {
  auth: authReducer,
  comments: commentsReducer,
  errors: errorsReducer
}));

export default reducer;
