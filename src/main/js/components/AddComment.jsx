import React, { PropTypes } from 'react';
import { IndexLink, routerShape } from 'react-router';
import { connect } from 'react-redux';

import { saveComment } from '../actions';

class AddComment extends React.Component {

  addComment(author, content, type) {
    this.props.dispatch(saveComment(author, content, type));
  }

  handleOnSubmit(e) {
    e.preventDefault();

    const author = this.authorInput;
    const content = this.contextInput;
    const type = this.typeInput;

    this.addComment(author.value.trim(), content.value.trim(), type.value.trim());

    author.value = '';
    content.value = '';
    type.value = '';

    this.context.router.push('/');
  }

  render() {
    return (
      <form onSubmit={e => this.handleOnSubmit(e)}>
        <h1>Add a Comment</h1>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input input="author" className="form-control" type="text" size={30} ref={el => { this.authorInput = el; }} />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <input id="comment" className="form-control" type="text" size={30} ref={el => { this.contextInput = el; }} />
        </div>
          
         <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input id="type" className="form-control" type="text" size={30} ref={el => { this.typeInput = el; }} />
        </div>  
          
        <button className="btn btn-success" type="submit">Submit</button>  
        {' '}
        <IndexLink to="/" className="btn btn-primary">Back</IndexLink>
       
        
      </form>);
  }
}

AddComment.contextTypes = { router: routerShape.isRequired };

AddComment.propTypes = {
  dispatch: PropTypes.func
};

/* Inject dispatch() but no state into props */
export default connect()(AddComment);
