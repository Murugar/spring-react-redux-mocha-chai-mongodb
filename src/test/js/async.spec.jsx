/**
 * http://usejsdoc.org/
 */

import { expect } from 'chai';
import nock from 'nock';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {commentsRefreshed, COMMENTS_REFRESHED, ADD_COMMENT, refreshComments, saveComment,
	addComment, updComment, UPDATE_COMMENT, DELETE_COMMENT, removeComment} 
from '../../main/js/actions';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

describe(' Async Actions Auth Test ', () => {
	
  it('Should return async auth response', () => {
    
	   
	 let mockAdapter = new MockAdapter(axios);

	  
	 const middlewares = [thunk] ;
	 const mockStore = configureStore(middlewares);
	  
		
	  
	     
  });

 
  
  
});


