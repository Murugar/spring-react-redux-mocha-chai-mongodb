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
 
var crr = [
        	{id: '1', author: 'test1', content: 'test1', type: 'plain'},
        	{id: '2', author: 'test1', content: 'test1', type: 'plain'}
       ];


describe(' Async Actions Test ', () => {

	
	
	
  it('Should return async comments response', () => {
    
	   
	 let mockAdapter = new MockAdapter(axios);

		
	 mockAdapter.onGet('/api/comments').reply(200,  crr
			// {
              //     	id: '1', author: 'test1', content: 'test1', type: 'plain'
    	    //}
	 
	 );
	  
	 const middlewares = [thunk] ;
	 const mockStore = configureStore(middlewares);
	  
	 //const store = mockStore({}, expectedActions, done);
	 
	 const store = mockStore();
	  
	 store.dispatch(refreshComments());
	 
	 const actions = store.getActions();
      
     //console.log(store.getActions());
	  
     setTimeout(() => {
    	 console.log(store.getActions());
         expect(store.getActions()).to.deep.include( { type: COMMENTS_REFRESHED, 
            	 comments: 
          
            	 [
            	    {id: '1', author: 'test1', content: 'test1', type: 'plain'},
            	    {id: '2', author: 'test1', content: 'test1', type: 'plain'}
                 ]
         
         }
         
         );
       }, 20);
     
	
	  
	     
  });

 
  it('Should return async add comment response', () => {
	    
	    let mockAdapter = new MockAdapter(axios);
			
		 mockAdapter.onPost('/api/comments', {author: 'test1', content: 'test1', type: 'plain'})
				 .reply(200,
				{id: '1', author: 'test1', content: 'test1', type: 'plain'}
		 );
		 
		  
		 const middlewares = [thunk] ;
		 const mockStore = configureStore(middlewares);
		  
		 //const store = mockStore({}, expectedActions, done);
		 
		 const store = mockStore();
		  
		 store.dispatch(saveComment('test1', 'test1', 'plain'));
		  
	     setTimeout(() => {
	    	 console.log(store.getActions());
	         expect(store.getActions()).to.deep.include( { type: ADD_COMMENT, 
	            	 comment: 
	            	    {id: '1', author: 'test1', content: 'test1', type: 'plain'},
	         }
	         );
	         
	       }, 2000);
	     
		     
	  });

	 
  it('Should return async update comment response', () => {
	    
	    let mockAdapter = new MockAdapter(axios);
			
		 mockAdapter.onPut('/api/comments/update/1', 
				           {id: '1', author: 'test1', content: 'test1', type: 'plain'})
				 .reply(200,
				{id: '1', author: 'test1', content: 'test1', type: 'plain'}
		 );
		 
		  
		 const middlewares = [thunk] ;
		 const mockStore = configureStore(middlewares);
		  
		 //const store = mockStore({}, expectedActions, done);
		 
		 const store = mockStore();
		  
		 store.dispatch(updComment('1','test1','test1','plain'));
		  
	     setTimeout(() => {
	    	 console.log(store.getActions());
	         expect(store.getActions()).to.deep.include( { type: UPDATE_COMMENT, 
	            	 comment: 
	            	    {id: '1', author: 'test1', content: 'test1', type: 'plain'},
	         }
	         );
	         
	       }, 2000);
	     
		     
	  });
  
  it('Should return async delete comment response', () => {
	    
	    let mockAdapter = new MockAdapter(axios);
			
		 mockAdapter.onDelete('/api/comments/remove/1')
				 .reply(200,
				{id: '1'}
		 );
		 
		  
		 const middlewares = [thunk] ;
		 const mockStore = configureStore(middlewares);
		  
		 //const store = mockStore({}, expectedActions, done);
		 
		 const store = mockStore();
		  
		 store.dispatch(removeComment('1'));
		  
	     setTimeout(() => {
	    	 console.log(store.getActions());
	         expect(store.getActions()).to.deep.include( { type: DELETE_COMMENT,
	        	 id: { id: '1' } 
	         }
	         );
	         
	       }, 2000);
	     
		     
	  });

  
});
