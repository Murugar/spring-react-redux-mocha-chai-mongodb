import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { removeComment, refreshComments } from '../actions';
import { connect } from 'react-redux';

import UpdateComment from './UpdateComment';

class Comment extends React.Component {		
	
	propTypes : {
		  content: PropTypes.string.isRequired,
		  author: PropTypes.string.isRequired,
		  type: PropTypes.string.isRequired,
		  id: PropTypes.string.isRequired
	 }
	

   handleDeleteComments(id,e) {
	   
	   e.preventDefault();
	   
	   this.props.dispatch(removeComment(id));
       this.props.dispatch(refreshComments());
      
   }

	constructor(props)
	{
		super(props);
		
		
		console.log("Comment Cons");
		
		this.state = {
				
				
				 content : this.props.content,
	             author : this.props.author,
	             id : this.props.id,
	             type : this.props.type
				
		};
	}
	
     
	componentWillMount()
	{
		console.log("Comment Will Mounted");
		
	}
	 
	componentDidMount()
	{
		console.log("Comment Did Mounted");
	} 
	
	componentWillUpdate(nextProps, nextState)
	{
		console.log("Comment Will Update");
	} 
	 
	componentWillReceiveProps(nextProps)
	{
		this.setState(
				{
					 content : nextProps.content,
		             author : nextProps.author,
		             id : nextProps.id,
		             type : nextProps.type
				}
		);
		
		console.log("Comment Set State");
	}
		
	 
  render() {
	  
	    return (
  <div className="message">
    <h3 className="text-info">{this.state.content}</h3>
    <p className="text-danger">By {this.state.author}</p>
    <p className="text-success">Type : {this.state.type}</p>
    <p className="text-warning">Id : {this.state.id}</p>
    
    <Link to={`/update/${this.state.id}`} className="btn btn-warning" >Update​</Link>
    {' '}
    <button className="btn btn-danger" onClick={(e) => this.handleDeleteComments(this.state.id,e)}>Remove</button>
    
  </div>
 );
	}

}

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

function mapStateToProps(state) {
	  return {
	    status: state.comments.status,
	    comments: state.comments.data
	  };
}

export default connect(mapStateToProps)(Comment);
