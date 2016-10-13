import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import { AddComment, UpdateComment, CommentList, Errors, SignIn } from './components';

export function requireAuth(store, nextState, replace) {
	
	console.log("requireAuth");
	console.log(store);  
	
    if (!signedIn(store)) {
      replace({
        pathname: '/signin',
        state: {
          nextPathname: nextState.location.pathname
        }
      });
    }
  }	


export function signedIn(store) {
	
	console.log("SignedIn");  
	console.log(store);  
    return store.getState().auth.signedIn === true;
  }	

export var MyHandler1 = React.createClass({
	  render() {
		  
		console.log("Update");  
		console.log(this.props.params.id)  ;
		console.log(this.props.comments)  ;
	    return <UpdateComment id={this.props.params.id}/>;
	  }
	});	


function buildRoutes(store) {
	
	//console.log("buildRoutes");
	//console.log(store);  

  return (
    <Route path="/" component={App}>
      <IndexRoute component={CommentList} />
      <Route path="add" onEnter={requireAuth.bind(this, store)} component={AddComment} />
      <Route path="update/:id" onEnter={requireAuth.bind(this, store)} component={MyHandler1} />  
      <Route path="signin" component={SignIn} />
      <Route path="*" component={Errors} />
    </Route>
  );
  
}

export default buildRoutes;

