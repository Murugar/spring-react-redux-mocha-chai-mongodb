/**
 * http://usejsdoc.org/
 */
import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';

import Comment from '../../main/js/components/Comment';

const mockStore = configureStore();

const getState = {status: "complete", comments:[
                                                { id: 1, author: 'test1', content: 'test1', type: 'plain' },
                                                { id: 2, author: 'test2', content: 'test2', type: 'plain' },
                                                { id: 3, author: 'test3', content: 'test3', type: 'plain' }   ]         
};

const store = mockStore(getState);
const myprops = {
		author: "test",
		content: "test",
		type: "test",
		id: "1"
};

describe('<Comment/>', () => {

	it('should have props for content, author and type', () => {
		const wrapper = shallow(<Comment store={store} />);
		expect(wrapper.props().author).to.be.defined;
		expect(wrapper.props().content).to.be.defined;
		expect(wrapper.props().type).to.be.defined;
		expect(wrapper.props().id).to.be.defined;
	});

		it('should have an initial src state', () => {
			const wrapper =  mount( 
					<Provider store={store}>
					<Comment author='add' content='add'  type='plain' id='1'	/>
						</Provider>
			);

			const formPropsFromReduxForm = wrapper.find(Comment).props();

			console.log(wrapper.html());

			expect(
					formPropsFromReduxForm
			).to.be.deep.equal({
				author: 'add',
				content: 'add',
				type: 'plain',
				id: '1'
			});


		});				


});


