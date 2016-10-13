/**
 * http://usejsdoc.org/
 */

import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';

import App from '../../main/js/containers/App';

const mockStore = configureStore();

describe('<App/>', () => {

	it('should have props dispatch', () => {

		var state = {
				auth : {

					signedIn : false,
					roles : ['ROLE_ANONYMOUS']
				}
		};

		var store = mockStore(state);

		const wrapper = shallow(<App store={store} />);
		expect(wrapper.props().dispatch).to.be.defined;


	});

		it('should have div elements', () => {

			var state = {

					auth : {
						signedIn : false,
						roles : ['ROLE_ANONYMOUS']
					}

			};

			var store = mockStore(state); 

			const wrapper = mount(<App store={store} />);
			console.log(wrapper.html());			
			expect(wrapper.find('div')).to.have.length(5);

		});		

			it('should have span elements', () => {

				var state = {

						auth : {
							signedIn : false,
							roles : ['ROLE_ANONYMOUS']
						}

				};

				var store = mockStore(state); 

				const wrapper = mount(<App store={store} />);
				console.log(wrapper.html());			
				expect(wrapper.find('span')).to.have.length(4);

			});	


			it('should have button elements', () => {

				var state = {

						auth : {
							signedIn : false,
							roles : ['ROLE_ANONYMOUS']
						}

				};

				var store = mockStore(state); 

				const wrapper = mount(<App store={store} />);
				console.log(wrapper.html());			
				expect(wrapper.find('button')).to.have.length(1);

			});		


			it('should have ul elements', () => {

				var state = {

						auth : {
							signedIn : false,
							roles : ['ROLE_ANONYMOUS']
						}

				};

				var store = mockStore(state); 

				const wrapper = mount(<App store={store} />);
				console.log(wrapper.html());			
				expect(wrapper.find('ul')).to.have.length(1);

			});		

			it('should have li elements', () => {

				var state = {

						auth : {
							signedIn : false,
							roles : ['ROLE_ANONYMOUS']
						}

				};

				var store = mockStore(state); 

				const wrapper = mount(<App store={store} />);
				console.log(wrapper.html());			
				expect(wrapper.find('li')).to.have.length(3);

			});		



});


