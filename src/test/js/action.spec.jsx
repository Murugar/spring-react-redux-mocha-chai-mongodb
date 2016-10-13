/**
 * http://usejsdoc.org/
 */
import { expect } from 'chai';

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
 
const middlewares = [thunk] 
const mockStore = configureStore(middlewares)

import {ADD_COMMENT, addComment, updateComment, UPDATE_COMMENT, DELETE_COMMENT, deleteComment, 
	COMMENTS_REFRESHED, LOGGED_OUT, loggedOut
	, commentsRefreshed, authenticated, AUTHENTICATED} 
   from '../../main/js/actions';
   

it('should dispatch comment action', () => {
	
	  const initialState = {};
	  
	  var c = {id: '1', author: 'test1', content: 'test1', type: 'plain'};
	  
	  
	  var crr = [
	              
	              {id: '1', author: 'test1', content: 'test1', type: 'plain'},
	              {id: '2', author: 'test2', content: 'test2', type: 'plain'}
	  ];
	  
	  const eComment = (comment) => ({ type: 'ADD_COMMENT', comment});
	 
	  const store = mockStore();
	  
	  const expectedActions = [
            { type: 'ADD_COMMENT',  c }
	  ];
	  
	  var k = [ { type: 'ADD_COMMENT',
		    comment: { id: '1', author: 'test1', content: 'test1', type: 'plain' } } ]
	  
	  store.dispatch(addComment(c));
	  store.dispatch(updateComment(c));
	  store.dispatch(deleteComment('1'));
	  store.dispatch(commentsRefreshed(crr));
	  
	  
	  const actions = store.getActions();
	 
	  console.log(actions);
	  
	  //expect(actions).to.exist;
	  
	  expect(actions).to.deep.include({type: 'ADD_COMMENT',
		    comment: { id: '1', author: 'test1', content: 'test1', type: 'plain' }});
	  
	  expect(actions).to.deep.include({type: 'UPDATE_COMMENT',
		    comment: { id: '1', author: 'test1', content: 'test1', type: 'plain' }});
	  
	  expect(actions).to.deep.include({  type: 'DELETE_COMMENT', id: '1' });
	  
	  expect(actions).to.deep.include( { type: 'COMMENTS_REFRESHED', 
		  comments: [ {id: '1', author: 'test1', content: 'test1', type: 'plain'},
		              {id: '2', author: 'test2', content: 'test2', type: 'plain'} ] });



});

it('should dispatch loggedOut action', () => {
	  
	  const store = mockStore();

	  store.dispatch(loggedOut());
	  
	  const actions = store.getActions();
	 
	  console.log(actions);
	  
	  expect(actions).to.deep.include({type: 'LOGGED_OUT'});


});

it('should dispatch authentication action', () => {
	  
	  const store = mockStore();

	  var authdata = {roles : ['ROLE_ANONYMOUS']};
	  
	  
	  store.dispatch(
			  authenticated(
					    authdata
			  )
	  );
	  
	  const actions = store.getActions();
	 
	  console.log(actions);
	  
	  expect(actions).to.deep.include( { type: 'AUTHENTICATED', roles: [ 'ROLE_ANONYMOUS' ] });


});




