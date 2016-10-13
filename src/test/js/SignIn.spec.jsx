/**
 * http://usejsdoc.org/
 */
/**
 * http://usejsdoc.org/
 */
import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';

import SignIn from '../../main/js/components/SignIn';

const mockStore = configureStore();

describe('<SignIn/>', () => {

	it('should have props dispatch', () => {

		var getState = {

				state : {

					auth : {


					}

				}

		};

		var store = mockStore(getState);

		const wrapper = shallow(<SignIn store={store} />);
		expect(wrapper.props().dispatch).to.be.defined;


	});

		it('should have form elements', () => {

			var state = {

					auth : {
						signedIn : false,
						roles : ['ROLE_ANONYMOUS']
					}

			};

			var store = mockStore(state); 

			const wrapper = mount(<SignIn store={store} />);
			console.log(wrapper.html());			
			expect(wrapper.find('form')).to.have.length(1);

		});		

			it('should have div elements', () => {

				var state = {
						auth : {
							signedIn : false,
							roles : ['ROLE_ANONYMOUS']
						}
				};

				var store = mockStore(state); 

				const wrapper = mount(<SignIn store={store} />);
				console.log(wrapper.html());			
				expect(wrapper.find('div')).to.have.length(6);

			});		

			it('should have label elements', () => {


				var state = {
						auth : {
							signedIn : false,
							roles : ['ROLE_ANONYMOUS']
						}
				};

				var store = mockStore(state); 

				const wrapper = mount(<SignIn store={store} />);
				console.log(wrapper.html());			
				expect(wrapper.find('label')).to.have.length(2);

			});		


			it('should have input elements', () => {

				var state = {
						auth : {
							signedIn : false,
							roles : ['ROLE_ANONYMOUS']
						}
				};

				var store = mockStore(state); 

				const wrapper = mount(<SignIn store={store} />);
				console.log(wrapper.html());			
				expect(wrapper.find('input')).to.have.length(2);

			});		

			it('should have button elements', () => {

				var state = {
						auth : {
							signedIn : false,
							roles : ['ROLE_ANONYMOUS']
						}
				};

				var store = mockStore(state); 

				const wrapper = mount(<SignIn store={store} />);
				console.log(wrapper.html());			
				expect(wrapper.find('button')).to.have.length(1);

			});		


			it('should have h1 elements', () => {

				var state = {
						auth : {
							signedIn : false,
							roles : ['ROLE_ANONYMOUS']
						}
				};


				var store = mockStore(state); 

				const wrapper = mount(<SignIn store={store} />);
				console.log(wrapper.html());			
				expect(wrapper.find('h1')).to.have.length(1);

			});		





});


