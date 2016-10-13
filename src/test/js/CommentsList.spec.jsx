/**
 * http://usejsdoc.org/
 */
import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow, render } from 'enzyme';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';

import CommentList from '../../main/js/components/CommentList.jsx';


const mockStore = configureStore();


export const mystore = (state) => {
	return {
	default: () => {},
	subscribe: () => {},
	dispatch: () => {},
	getState: () => {
		return { state };
	},
	};
};


describe('<CommentList/>', () => {

	it('should have props status and CommentList', () => {




		var state = {

				comments: 

				{	
					data : [
					        { id: '1', author: 'test1', content: 'test1', type: 'plain' },
					        { id: '2', author: 'test2', content: 'test2', type: 'plain' }
					        ] ,
					        status : 'loaded'
				}

		};

		var store = mockStore(state);

		var props = {
				id: '1',

		};


		const wrapper = shallow(<CommentList store={store} />);
		expect(wrapper.props().dispatch).to.be.defined;


	});

		it('should have h1 elements', () => {

			const mockStore = configureStore();

			var state = {

					comments: 

					{	
						data : [
						        { id: '1', author: 'test1', content: 'test1', type: 'plain' },
						        { id: '2', author: 'test2', content: 'test2', type: 'plain' }
						        ] ,
						        status : 'loaded'
					}

			};


			/*var state = {

					status: 'complete', comments: 
					[
					  { id: '1', author: 'test1', content: 'test1', type: 'plain' },
				      { id: '2', author: 'test2', content: 'test2', type: 'plain' }
				    ]

				};*/

			var store = mockStore(
					state
			);





			var props = {


			};




			const wrapper = 
				render(
						<Provider store={store}>
						<CommentList {...props}/>
						</Provider>
				)
				;

			expect(wrapper.find('h1')).to.have.length(1);
		});	


		it('should have div elements', () => {

			const mockStore = configureStore();

			var state = {

					comments: 

					{	
						data : [
						        { id: '1', author: 'test1', content: 'test1', type: 'plain' },
						        { id: '2', author: 'test2', content: 'test2', type: 'plain' }
						        ] ,
						        status : 'loaded'
					}

			};



			var store = mockStore(
					state
			);





			var props = {


			};




			const wrapper = 
				render(
						<Provider store={store}>
						<CommentList {...props}/>
						</Provider>
				)
				;

			expect(wrapper.find('div')).to.have.length(4);
		});	

		it('should have button elements', () => {

			const mockStore = configureStore();

			var state = {

					comments: 

					{	
						data : [
						        { id: '1', author: 'test1', content: 'test1', type: 'plain' },
						        { id: '2', author: 'test2', content: 'test2', type: 'plain' }
						        ] ,
						        status : 'loaded'
					}

			};



			var store = mockStore(
					state
			);





			var props = {


			};




			const wrapper = 
				render(
						<Provider store={store}>
						<CommentList {...props}/>
						</Provider>
				)
				;

			expect(wrapper.find('button')).to.have.length(3);
		});	


		it('should have link elements', () => {

			const mockStore = configureStore();

			var state = {

					comments: 

					{	
						data : [
						        { id: '1', author: 'test1', content: 'test1', type: 'plain' },
						        { id: '2', author: 'test2', content: 'test2', type: 'plain' }
						        ] ,
						        status : 'loaded'
					}

			};



			var store = mockStore(
					state
			);





			var props = {


			};




			const wrapper = 
				render(
						<Provider store={store}>
						<CommentList {...props}/>
						</Provider>
				)
				;

			expect(wrapper.find('a')).to.have.length(3);
		});	





		it('should have h3 elements', () => {

			const mockStore = configureStore();

			var state = {

					comments: 

					{	
						data : [
						        { id: '1', author: 'test1', content: 'test1', type: 'plain' },
						        { id: '2', author: 'test2', content: 'test2', type: 'plain' }
						        ] ,
						        status : 'loaded'
					}

			};



			/*var state = {

					status: 'complete', comments: 
					[
					    { id: '1' ,author: 'test1', content: 'test1', type: 'plain' },
				        { id: '2' ,author: 'test2', content: 'test2', type: 'plain' }
				    ] 

				};*/

			var store = mockStore(
					state
			);

			var props = {


			};




			const wrapper = 
				render(
						<Provider store={store}>
						<CommentList  {...props}/>
						</Provider>
				)
				;

			expect(wrapper.find('h3')).to.have.length(3);
		});	


});




