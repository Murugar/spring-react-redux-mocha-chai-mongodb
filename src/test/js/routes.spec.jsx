/** * http://usejsdoc.org/
 */

import { renderToString } from 'react-dom/server';
import expect from 'expect';
import React, { Component } from 'react'
import history from 'history';
import {Route, IndexRoute, match, createRoutes, Router, createMemoryHistory, RouterContext, browserHistory} from 'react-router';
import { render, unmountComponentAtNode } from 'react-dom'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Provider from 'react-redux'
import App from '../../main/js/containers/App';
import { AddComment, UpdateComment, CommentList, Errors, SignIn} from '../../main/js/components';
import buildRoutes from '../../main/js/routes';
import createStore from '../../main/js/store';


describe('Route ', () => {

	beforeEach(() => {



	});


	it('complains about invalid index route with path', function () {

		const invalidRoutes = createRoutes(
				<Route path="/">
				<IndexRoute path="foo" />
					</Route>
		);

		match({ routes: invalidRoutes, location: '/' }, (error, redirectLocation, renderProps) => {
			if (renderProps) {
				console.log('routes test1');
				//console.log(renderProps);
				console.log(renderProps.routes);
				//console.log(renderProps.components);

				expect(renderProps.routes).toExist()



			}
			else {
				console.error(`Failed to render app for path [${path}], error: [${error}]`);
			}
		});



	});

	it('index route with path', function () {


		const middlewares = [thunk] ;
		const mockStore = configureStore(middlewares);

		const store = mockStore({

			auth : {

				signedIn : false
			}

		});

		const props = {};


		function requireAuth(nextState, replace) {

			console.log("requireAuth");

			store.getState().auth.signedIn === true;

			/*replace({
		        pathname: '/signin',
		        state: {
		          nextPathname: nextState.location.pathname
		        }
		      });
			 */
		}	

		var MyHandler1  = React.createClass({
			render() {

				return <UpdateComment id='1'/>;
			}
		});	



		const Routes = createRoutes(
				<Route path="/" component={App}>
				<IndexRoute component={CommentList} />
				<Route path="add" onEnter={requireAuth} component={AddComment} />
				<Route path="update/:id" onEnter={requireAuth} component={MyHandler1}/>  
				<Route path="signin" component={SignIn} />
				<Route path="*" component={Errors} />
				</Route>
		);

		match({ routes: Routes, location: '/' }, (error, redirectLocation, renderProps) => {
			if (renderProps) {
				console.log('routes ');
				//console.log(renderProps);
				console.log(renderProps.routes);
				console.log(renderProps.components);

				expect(renderProps.routes[0]).toExist()
				expect(renderProps.components[0]).toExist()

				expect(renderProps.components[0].WrappedComponent).toExist();

			}
			else {
				console.error(`Failed to render app for path [${path}], error: [${error}]`);
			}
		});



	});

	it('child route with add path', function () {

		const middlewares = [thunk] ;
		const mockStore = configureStore(middlewares);

		const store = mockStore({

			auth : {

				signedIn : false
			}

		});

		const props = {};


		function requireAuth(nextState, replace) {

			console.log("requireAuth");

			store.getState().auth.signedIn === true;

			/*replace({
		        pathname: '/signin',
		        state: {
		          nextPathname: nextState.location.pathname
		        }
		      });
			 */
		}	

		var MyHandler1  = React.createClass({
			render() {

				return <UpdateComment id='1'/>;
			}
		});	




		const Routes = createRoutes(
				<Route path="/" component={App}>
				<IndexRoute component={CommentList} />
				<Route path="add" onEnter={requireAuth} component={AddComment} />
				<Route path="update/:id" onEnter={requireAuth} component={MyHandler1}/>  
				<Route path="signin" component={SignIn} />
				<Route path="*" component={Errors} />
				</Route>
		);

		match({ routes: Routes, location: '/add' }, (error, redirectLocation, renderProps) => {
			if (renderProps) {
				console.log('add child route');
				//console.log(renderProps);
				console.log(renderProps.routes[1]);
				console.log(renderProps.components[1]);

				expect(renderProps.routes[1]).toExist()
				expect(renderProps.components[1]).toExist()
				expect(renderProps.components[1].WrappedComponent).toExist();

			}
			else {
				console.error(`Failed to render app for path [${path}], error: [${error}]`);
			}
		});



	});







	it('child route with signin path', function () {
		const middlewares = [thunk] ;
		const mockStore = configureStore(middlewares);

		const store = mockStore({

			auth : {

				signedIn : false
			}

		});

		const props = {};


		function requireAuth(nextState, replace) {

			console.log("requireAuth");

			store.getState().auth.signedIn === true;

			/*replace({
		        pathname: '/signin',
		        state: {
		          nextPathname: nextState.location.pathname
		        }
		      });
			 */
		}	

		var MyHandler1  = React.createClass({
			render() {

				return <UpdateComment id='1'/>;
			}
		});	




		const Routes = createRoutes(
				<Route path="/" component={App}>
				<IndexRoute component={CommentList} />
				<Route path="add" onEnter={requireAuth} component={AddComment} />
				<Route path="update/:id" onEnter={requireAuth} component={MyHandler1}/>  
				<Route path="signin" component={SignIn} />
				<Route path="*" component={Errors} />
				</Route>
		);

		match({ routes: Routes, location: '/signin' }, (error, redirectLocation, renderProps) => {
			if (renderProps) {
				console.log('child signin route');
				//console.log(renderProps);
				console.log(renderProps.routes[1].path);
				console.log(renderProps.components[1].displayName);

				expect(renderProps.routes[1].path).toEqual('signin');
				//expect(renderProps.components[0]).toExist()
				expect(renderProps.components[1].displayName).toEqual('Connect(SignIn)');
				expect(renderProps.components[1].WrappedComponent).toExist();


			}
			else {
				console.error(`Failed to render app for path [${path}], error: [${error}]`);
			}
		});



	});


	it('route with error path', function () {


		const middlewares = [thunk] ;
		const mockStore = configureStore(middlewares);

		const store = mockStore({

			auth : {

				signedIn : false
			}

		});

		const props = {};


		function requireAuth(nextState, replace) {

			console.log("requireAuth");

			store.getState().auth.signedIn === true;

			/*replace({
		        pathname: '/signin',
		        state: {
		          nextPathname: nextState.location.pathname
		        }
		      });
			 */
		}	

		var MyHandler1  = React.createClass({
			render() {

				return <UpdateComment id='1'/>;
			}
		});	



		const Routes = createRoutes(
				<Route path="/" component={App}>
				<IndexRoute component={CommentList} />
				<Route path="add" onEnter={requireAuth} component={AddComment} />
				<Route path="update/:id" onEnter={requireAuth} component={MyHandler1}/>  
				<Route path="signin" component={SignIn} />
				<Route path="*" component={Errors} />
				</Route>
		);

		match({ routes: Routes, location: '/*' }, (error, redirectLocation, renderProps) => {
			if (renderProps) {
				console.log('error route');
				//console.log(renderProps);
				//console.log(renderProps.routes);
				//console.log(renderProps.components);

				expect(renderProps.routes[1]).toExist()
				expect(renderProps.components[1]).toExist()
				expect(renderProps.components[1].WrappedComponent).toExist();

			}
			else {
				console.error(`Failed to render app for path [${path}], error: [${error}]`);
			}
		});



	});


	it('child route with update path and params', function () {


		const middlewares = [thunk] ;
		const mockStore = configureStore(middlewares);

		const store = mockStore({

			auth : {

				signedIn : false
			}

		});

		const props = {};


		function requireAuth(nextState, replace) {

			console.log("requireAuth");

			//store.getState().auth.signedIn === true;

			/*replace({
		        pathname: '/signin',
		        state: {
		          nextPathname: nextState.location.pathname
		        }
		      });
			 */
		}	

		var MyHandler1  = React.createClass({
			render() {

				return <UpdateComment id='1'/>;
			}
		});	



		const Routes = createRoutes(

				<Route path="/" component={App}>
				<IndexRoute component={CommentList} />
				<Route path="add" onEnter={requireAuth} component={AddComment} />
				<Route path="update/:id" onEnter={requireAuth} component={MyHandler1}/>  
				<Route path="signin" component={SignIn} />
				<Route path="*" component={Errors} />
				</Route>

		);

		match({ routes: Routes, location: '/update/5/' }, (error, redirectLocation, renderProps) => {
			if (renderProps) {
				console.log('update child route with params');
				//	console.log(renderProps);
				 	console.log(renderProps.routes[1]);
				 	console.log(renderProps.components);
				 	console.log(renderProps.params);


				expect(renderProps.routes[1]).toExist()
				expect(renderProps.params).toExist()
				expect(renderProps.params).toEqual({ id: '5'})
				expect(renderProps.routes[1].onEnter).toExist()
				expect(renderProps.routes[1].component.displayName).toEqual('MyHandler1')
				expect(renderProps.routes[1].path).toEqual('update/:id');

			}
			else {
				console.error(`Failed to render app for path [${path}], error: [${error}]`);
			}
		});



	});

	it('child route with update path', function () {

		const middlewares = [thunk] ;
		const mockStore = configureStore(middlewares);

		const store = mockStore({

			auth : {

				signedIn : false
			}

		});

		const props = {};


		function requireAuth(nextState, replace) {

			console.log("requireAuth");

			store.getState().auth.signedIn === true;

			/*
			
			replace({
		        pathname: '/signin',
		        state: {
		          nextPathname: nextState.location.pathname
		        }
		      });
			 */
		}	

		var MyHandler1  = React.createClass({
			render() {

				return <UpdateComment id='1'/>;
			}
		});	



		const Routes = createRoutes(
				<Route path="/" component={App} >
				<IndexRoute component={CommentList} />
				<Route path="add" onEnter={requireAuth} component={AddComment} />
				<Route path="update/:id" onEnter={requireAuth} component={MyHandler1} />  
				<Route path="signin" component={SignIn} />
				<Route path="*" component={Errors} />
				</Route>
		);

		match({ routes: Routes, location: '/update/:id' }, (error, redirectLocation, renderProps) => {
			if (renderProps) {
				console.log('update child route');
				//	console.log(renderProps);
				console.log(renderProps.routes);
				console.log(renderProps.components);
				// 	console.log(renderProps.params);

				expect(renderProps.routes[1]).toExist()
				expect(renderProps.routes[1].path).toExist()
				expect(renderProps.routes[1].onEnter).toExist()
				expect(renderProps.routes[1].component.displayName).toEqual('MyHandler1')
				expect(renderProps.routes[1].path).toEqual('update/:id')		

				expect(renderProps.components[1]).toExist()

				//expect(renderProps.params).toExist()

			}
			else {
				console.error(`Failed to render app for path [${path}], error: [${error}]`);
			}
		});

	});
				
	it('Create Router', () => {
		
		
		const middlewares = [thunk] ;
		const mockStore = configureStore(middlewares);

		const history1 = createMemoryHistory('/')

		const store = mockStore({id : '1'});
		
		let node = document.createElement('div')
		
		let sh = (
						<Provider store={store}>
							<Router history={createMemoryHistory('/')}
								routes={buildRoutes(store)}
							    foo='bar'
							/>
						</Provider>  
			      )
			      
	    
	    console.log('Create Router')	
		console.log(sh)	
		expect(sh.props.store).toExist()		      
	});	
	
	
	it('handles forward slashes', function (done) {
	     
		
		 let node = document.createElement('div')
		 
		
	      class Parent extends Component {
	        render() {
	          return <div>apple/banana</div>
	        }
	      }

	      class Child extends Component {
	        render() {
	          return <h1>child</h1>
	        }
	      }

	      render((
	        <Router history={createMemoryHistory('/apple%2Fbanana')}>
	          <Route component={Parent}>
	            <Route path="/:name" component={Child} />
	          </Route>
	        </Router>
	      ), node, function () {
	        expect(node.textContent).toEqual('apple/banana')
	        done()
	      });
	    
	});
	    
	
	 it('renders routes', function (done) {
		 
		 	let node = document.createElement('div')

			class Parent extends Component {
				render() {
					return <div>parent</div>
				}
			}

			class Child extends Component {
				render() {
					return <div>child</div>
				}
			}
	 	 
			render((
					<Router history={createMemoryHistory('/')}>
					<Route path="/" component={Parent} />
					</Router>
			), node, function () {
				expect(node.textContent).toEqual('parent')
				done()
			})
		  
	 });

	
	
	it('renders child routes when the parent does not have a path', function (done) {

		let node = document.createElement('div')

		class Parent extends Component {
			render() {
				return <div>parent parent child</div>
			}
		}

		class Child extends Component {
			render() {
				return <div>child</div>
			}
		}
		
		render((
				<Router history={createMemoryHistory('/')}>
					<Route component={Parent}>
						<Route component={Parent}>
							<Route path="/" component={Child} />
						 </Route>
				     </Route>
				</Router>
		), node, function () {
			expect(node.textContent).toEqual('parent parent child')
			done()
		})

	});
	
	it('renders with the render prop', function (done) {
		
		  class Parent extends Component {
		        render() {
		          return <div>parent</div>
		        }
		      }
		  
		  let node = document.createElement('div')
		
	      render((
	        <Router
	          history={createMemoryHistory('/')}
	          render={() => <div>test</div>}
	          routes={{ path: '/', component: Parent }}
	        />
	      ), node, function () {
	        expect(node.textContent).toBe('test')
	        done()
	      })
	});

	it('passes router props to render prop', function (done) {
		
	
	      const MyComponent = () => <div/>
	      
	      const route = { path: '/', component: MyComponent }

	      let node = document.createElement('div')
	      
	      const assertProps = (props) => {
	        expect(props.routes).toEqual([ route ])
	        expect(props.components).toEqual([ MyComponent ])
	        expect(props.id).toBe('1')
	        expect(props.render).toNotExist()
	        done()
	        return <div/>
	      }

	   
	      render((
	    	        <Router
	    	          history={createMemoryHistory('/')}
	    	          routes={route}
	    	          render={assertProps}
	    	          id="1"
	    	        />
	    	      ), node)
	      
	  })
	
	  it('handlesin parameters', function (done) {
		
		  class MyComponent extends Component {
			  render() {
				  return <div>{this.props.params.name}</div>
			  }
		  }
		  
		  let node = document.createElement('div')
		  
		  render((
				  <Router history={createMemoryHistory('/company/hello')}>
				  <Route path="/company/:name" component={MyComponent} />
				  </Router>
		  ), node, function () {
			  expect(node.textContent).toEqual('hello')
			  done()
		  })
	  })
	  
	 it('is happy to have colons in parameter values', function (done) {
   
	  let node = document.createElement('div')	 
		 
      class MyComponent extends Component {
        render() {
          return <div>{this.props.params.foo}</div>
        }
      }

      render((
        <Router history={createMemoryHistory('/update/aaa:bbb/1')}>
          <Route path="update/:foo/1" component={MyComponent} />
        </Router>
      ), node, function () {
        expect(node.textContent).toEqual('aaa:bbb')
        done()
      })
    })
	
});
   