/**
 * http://usejsdoc.org/
 */

import {expect} from 'chai';

import {commentsReducer, authReducer, errorsReducer} from '../../main/js/reducers.js'

describe('comments reducer', function() {

	describe('default', function() {

		var state = { status: 'stale', data: []};

		var c = {id: '1', author: 'test1', content: 'test1', type: 'plain'};

		console.log(commentsReducer(state, {}));

		it('returns the initial state', function() {
			expect(commentsReducer()).to.deep.equal(state);
		});


		it('should handle Add Comment', () => {


			console.log('Added Comment Reducer');

			console.log(commentsReducer(state , {
				type: 'ADD_COMMENT',
				comment : c
			}));

			expect(
					commentsReducer(state , {
						type: 'ADD_COMMENT',
						comment : c
					})
			).to.deep.equal(
					{ status: 'stale',
						data: [ { id: '1', author: 'test1', content: 'test1', type: 'plain' } ] }
			); 

		});
		
		
		it('should handle Update Comment', () => {

			console.log('Update Comment Reducer');

			console.log(commentsReducer(state , {
				type: 'UPDATE_COMMENT',
				comment : c
			}));

			expect(
					commentsReducer(state , {
						type: 'UPDATE_COMMENT',
						comment : c
					})
			).to.deep.equal(
					{ status: 'stale',
						  data: { id: '1', author: 'test1', content: 'test1', type: 'plain' } }
 
			); 

		});
		
		

	});


});

describe('auth reducer', function() {

	describe('default', function() {

		var state = { signedIn: false, roles: [] };

		console.log(authReducer());

		it('returns the initial state', function() {
			expect(authReducer()).to.deep.equal(state);
		});
		
		it('should handle Auth Logged Out', () => {


			console.log('Auth Reducer : Logged Out');

			console.log(authReducer(state , {
				type: 'LOGGED_OUT'
			}));

			expect(
					authReducer(state , {
						type: 'LOGGED_OUT'
					})
			).to.deep.equal(
					
					{ signedIn: false, roles: [ 'ROLE_ANONYMOUS' ] }
			); 

		});
		
		it('should handle Authenticated', () => {

			console.log('Auth Reducer : Authenticated');

			console.log(authReducer(state , {
				type: 'AUTHENTICATED',
				roles: [ 'ROLE_ANONYMOUS' ]
			}));

			expect(
					authReducer(state , {
						type: 'AUTHENTICATED',
						roles: [ 'ROLE_ANONYMOUS' ]
					})
			).to.deep.equal(
					
					{ signedIn: true, roles: [ 'ROLE_ANONYMOUS' ] }
			); 

		});
		
	});


});

describe('errors reducer', function() {

	describe('default', function() {

		var state = {};

		console.log(errorsReducer());

		it('returns the initial state', function() {
			expect(errorsReducer()).to.deep.equal(state);
		});
	});


});


