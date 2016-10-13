import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Comment from './Comment';
import { refreshComments } from '../actions';

import '../css/CommentLists.less';

class CommentList extends React.Component {

	
  constructor(props)
	{
		super(props);
		console.log('CommentList Cons');
		console.log(props);
   }
	
  componentWillMount() {
	  console.log('CommentList Will Mount');  
  }
  
  componentDidMount() {
	  
	console.log('CommentList Mount');  
  
   if (this.props.status === 'stale') {
    	console.log('CommentList Stale Mount');    	

      this.props.dispatch(refreshComments());
   }
    
    console.log('CommentList Mount');
    
  }

  handleRefreshComments() {
    this.props.dispatch(refreshComments());
  }

  render() {   
    return (
      <div className="comments">
        <h1 className="text-primary">Welcome</h1>
      
        <h3 className="text-warning">Messages</h3>
        
        <br/>
        
        <div>
          <Link to="/add" className="btn btn-primary">Add a Comment</Link>
          {' '}
          <button className="btn btn-success" onClick={() => this.handleRefreshComments()}>Refresh</button>
        </div>
        { this.props.comments.length === 0
            ? <p>No comments yet! You could add one&hellip;?</p>
            : this.props.comments.map(each => <Comment author={each.author} content={each.content} type={each.type} id={each.id} key={each.id}/> )}
                        
      
           
        </div>
    );
  }
}

CommentList.propTypes = {
  status: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    /* eslint-disable react/no-unused-prop-types */
    content: PropTypes.string,
    author: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string
    /* eslint-enable react/no-unused-prop-types */
  }).isRequired).isRequired,
  dispatch: PropTypes.func
};

function mapStateToProps(state, myprops = {}) {
	
  console.log('CommentsList'); 		
  console.log(state.comments.data); 
  console.log(state.comments.status);
  

  return {
    status: state.comments.status,
   // comments1: state.comments.data,
    comments: state.comments.data
    
  };
}

/* Inject the comments and dispatch() into props */
export default connect(mapStateToProps)(CommentList);
