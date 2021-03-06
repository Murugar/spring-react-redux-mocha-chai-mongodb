import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerShape } from 'react-router';

import axios from 'axios';

import { authenticated } from '../actions';

class SignIn extends React.Component {

  constructor(props) {
	  
	console.log("Component Cons");	  
	  
    super(props);
    
    console.log(props);	  
    
    this.state = { authFailed: false };
  }
  
  componentWillMount(props) {
	   console.log("Component Will Mount");
   }
   
  componentDidMount(props) {
	  console.log("Component Did Mount");
  }

  handleOnSignIn(event) {
    event.preventDefault();

    const username = this.usernameInput.value.trim();
    const password = this.passwordInput.value.trim();

    if (username.length === 0) {
      return;
    }
    
    if (password.length === 0) {
        return;
    }

    const data = `username=${encodeURIComponent(username)
       }&password=${encodeURIComponent(password)}`;

    axios.post('/api/authenticate', data)
      .then(
        success => {
          this.props.dispatch(authenticated(success.data));

          const { location } = this.props;
          const nextPathname = location.state && location.state.nextPathname ? location.state.nextPathname : '/';

          this.context.router.replace(nextPathname);
        },
        failure => {
          console.error(failure);
          this.setState({ authFailed: true });
        }
      );
  }

  authFailedMessage() {
    if (!this.state.authFailed) {
      return null;
    }

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-sm-offset-3 alert alert-danger" role="alert">
          Authentication Failed!
        </div>
      </div>);
  }

  render() {
    return (
      <form onSubmit={e => this.handleOnSignIn(e)}>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <h1>Sign In</h1>
          </div>
        </div>
        {this.authFailedMessage()}
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 form-group">
            <label htmlFor="userInput">Username</label>
            <input id="userInput" className="form-control" ref={el => { this.usernameInput = el; }} />
          </div>
          <div className="col-sm-6 col-sm-offset-3 form-group">
            <label htmlFor="passInput">Password</label>
            <input id="passInput" className="form-control" ref={el => { this.passwordInput = el; }} type="password" />
          </div>
          <div className="col-sm-6 col-sm-offset-3 form-group">
            <button type="submit" className="btn btn-primary">Sign In</button>
          </div>
        </div>
      </form>
    );
  }
}

SignIn.contextTypes = { router: routerShape.isRequired };

SignIn.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object
};

function mapStateToProps(state) {
  
  console.log("SignIn MapStateProps");		
	
  console.log(state.auth);	
	
  return { auth: state.auth };
}

/* Inject all state and dispatch() into props */
export default connect(mapStateToProps)(SignIn);
