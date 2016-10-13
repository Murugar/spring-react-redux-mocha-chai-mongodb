/**
 * http://usejsdoc.org/
 */
import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow, render } from 'enzyme';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';

import UpdateComment from '../../main/js/components/UpdateComment';

import Comment from '../../main/js/components/Comment';

const mockStore = configureStore([thunk]);




describe('<UpdateComment/>', () => {

	it('should have props status and comments', () => {

		var state = {

				status: 'complete', comments: 
					[
					 { id: '1', author: 'test1', content: 'test1', type: 'plain' },
					 { id: '2', author: 'test2', content: 'test2', type: 'plain' }
					 ] 

		};

		var store = mockStore(state);

		var props = {
				id: '1',

		};


		const wrapper = shallow(<UpdateComment store={store} />);
		expect(wrapper.props().dispatch).to.be.defined;


	});

		it('should have h1 elements', () => {


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
					id: '1'
			};




			const wrapper = render(<Provider store={store}>
			<UpdateComment {...props}	/>
			</Provider>);

			expect(wrapper.find('h1')).to.have.length(1);
		});	

		it('should have link elements', () => {


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
					id: '1'

			};

			const wrapper = render(<Provider store={store}>
			<UpdateComment {...props}	/>
			</Provider>);

			expect(wrapper.find('a')).to.have.length(1);		
		});			

		it('should have div elements', () => {

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
					id: '1'
			};

			const wrapper = render(<Provider store={store}>
			<UpdateComment {...props}	/>
			</Provider>);

			expect(wrapper.find('div')).to.have.length(3);

		});	



		it('should have form elements', () => {

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
					id: '1'
			};

			const wrapper = render(<Provider store={store}>
			<UpdateComment {...props}	/>
			</Provider>);

			expect(wrapper.find('form')).to.have.length(1);
		});	

		it('should have label elements', () => {

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
					id: '1'
			};

			const wrapper = render(<Provider store={store}>
			<UpdateComment {...props}	/>
			</Provider>);

			expect(wrapper.find('label')).to.have.length(3);
		});			

		it('should have button elements', () => {

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

			const store = mockStore(state);

			const props = {
					id: '1'

			};


			const wrapper = render(<Provider store={store}>
			<UpdateComment {...props}	/>
			</Provider>);

			expect(wrapper.find('button')).to.have.length(1);
		});					

		it('should have imput elements', () => {

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

			const store = mockStore(state);

			const props = {
					id: '1'

			};
			const wrapper = render(<Provider store={store}>
			<UpdateComment {...props}	/>
			</Provider>);

			expect(wrapper.find('input')).to.have.length(3);
		});		




});


