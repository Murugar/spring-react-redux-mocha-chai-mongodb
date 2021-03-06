/* eslint jsx-a11y/href-no-hash:"off" */
/* I discourage you from leaving the above disabled - I've only done this as this is a demo app. */

import React, { PropTypes } from 'react';
import { IndexLink, Link, routerShape } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';

import { refreshComments, loggedOut } from '../actions';

class App extends React.Component {

	constructor(props) {
		  
		console.log("Component Cons");	  
		  
	    super(props);
	    
	    console.log(props);	 
	}
	
	
  handleSignOut() {
    axios.post('/api/signout')
      .then(
        (/* success*/) => {
          this.props.dispatch(loggedOut());
          this.context.router.replace('/');
        },
        failure => console.error(`Failed to log out successfully: ${failure}`)
      );
  }

  adminMenu() {
    return this.props.auth.roles.some(r => r === 'ROLE_ADMIN')
      ? (<li className="dropdown">
        <a
          href="#"
          className="dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >Admin <span className="caret" /></a>
        <ul className="dropdown-menu">
          <li><a href="#">Action</a></li>
        </ul>
      </li>)
      : null;
  }

  authLink() {
    if (!this.props.auth.signedIn) {
      return <Link to="/signin">Sign In</Link>;
    }

    return (
      <div className="navbar-form" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <button className="btn btn-link" onClick={() => this.handleSignOut()}>Sign Out</button>
      </div>
    );
  }

  render() {

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <IndexLink to="/" className="navbar-brand">Spring React Demo</IndexLink>
            </div>
            <div id="navbar" className="collapse navbar-right navbar-collapse">
              <ul className="nav navbar-nav">
                {this.adminMenu()}
                <li><IndexLink to="/">Home</IndexLink></li>
                <li><Link to="/add">Add Comment</Link></li>
                <li>{this.authLink()}</li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string),
    signedIn: PropTypes.bool
  }),
  children: PropTypes.arrayOf(PropTypes.element),
  dispatch: PropTypes.func
};

App.contextTypes = { router: routerShape.isRequired };

function mapStateToProps(state) {
	
 console.log("App MapStateProps");		
 console.log(state.auth);		
	
  return { auth: state.auth };
}

/* Inject all state and dispatch() into props */
export default connect(mapStateToProps)(App);
