/**
 * http://usejsdoc.org/
 */
import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';

import AddComment from '../../main/js/components/AddComment';

const mockStore = configureStore();

const getState = {};

const store = mockStore(getState);

const myprops = {
		id: 1, author: 'test1', content: 'test1', type: 'plain' 
};

describe('<AddComment/>', () => {

	it('should have props status and comments', () => {
		const wrapper = shallow(<AddComment store={store} />);
		expect(wrapper.props().dispatch).to.be.defined;


	});

		it('should have h1 elements', () => {
			const wrapper = mount(<AddComment store={store} />);
			console.log(wrapper.html());			
			expect(wrapper.find('h1')).to.have.length(1);

		});		

			it('should have link elements', () => {
				const wrapper = mount(<AddComment store={store} />);
				console.log(wrapper.html());			
				expect(wrapper.find('a')).to.have.length(1);

			});			

			it('should have div elements', () => {
				const wrapper = mount(<AddComment store={store} />);
				expect(wrapper.find('div')).to.have.length(3);

			});	

				it('should have form elements', () => {
					const wrapper = mount(<AddComment store={store} />);
					expect(wrapper.find('form')).to.have.length(1);
				});	


					it('should have label elements', () => {
						const wrapper = mount(<AddComment store={store} />);
						expect(wrapper.find('label')).to.have.length(3);
					});			

						it('should have button elements', () => {
							const wrapper = mount(<AddComment store={store} />);
							expect(wrapper.find('button')).to.have.length(1);
						});					

							it('should have imput elements', () => {
								const wrapper = mount(<AddComment store={store} />);
								expect(wrapper.find('input')).to.have.length(3);
							});			






});


