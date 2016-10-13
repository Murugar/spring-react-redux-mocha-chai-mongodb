import React, { PropTypes } from 'react';
import { IndexLink, routerShape } from 'react-router';
import { connect } from 'react-redux';

import { updComment, refreshComments } from '../actions';


class UpdateComment extends React.Component {
	
	propTypes : {
		  content: PropTypes.string.isRequired,
		  author: PropTypes.string.isRequired,
		  type: PropTypes.string.isRequired,
		  id: PropTypes.number.isRequired
	 }
	
constructor(props)
{
	super(props);
	
	console.log("UpdateComment Cons");
	
	this.state = {
			content : "",
            author : "",
            id : this.props.id,
            type : ""
	};
	
	console.log(this.state.id);
	console.log(this.props);
	
	this.test = this.props.comments.find((item)=>item.id == this.props.id);
	
	//this.test = this.state
	
	console.log(this.props.comments);
	
	console.log(this.test);
}
	 
	componentWillMount()
	{
		console.log("UpdateComment Will Mounted");
		
	}
	 
	componentDidMount()
	{
		console.log("UpdateComment Did Mounted");
		if (this.props.status === 'stale') {
		      this.props.dispatch(refreshComments());
		}
		
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
		
		console.log("UpdateComment Set State");
	} 		
		
	componentWillUpdate(nextProps, nextState)
	{
		console.log("UpdateComment Will Update");
	} 
  
  
  updateComment(id, author, content, type) {
    this.props.dispatch(updComment(id, author, content, type));
  }
  
  refresh()
  {
	  this.props.dispatch(refreshComments());
  }

  handleOnSubmit(e) {
    e.preventDefault();

    const author = this.authorInput;
    const content = this.contextInput;
    const type = this.typeInput;
    
    
    
  
    
    this.updateComment(this.state.id, author.value.trim(), content.value.trim(), type.value.trim());

    this.refresh();
  
    author.value = '';
    content.value = '';
    type.value = '';
    

    this.context.router.push('/');
  }

  render() {
	  
	

	  
    return (
      <form onSubmit={e => this.handleOnSubmit(e)}>
        <h1>Update Comment</h1>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input input="author" className="form-control" defaultValue={this.test.author} type="text" size={30} ref={el => { this.authorInput = el; }} />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <input id="comment" className="form-control" type="text" defaultValue={this.test.content} size={30} ref={el => { this.contextInput = el; }} />
        </div>
          
         <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input id="type" className="form-control" type="text" defaultValue={this.test.type} size={30} ref={el => { this.typeInput = el; }} />
        </div>  
          
        <button className="btn btn-success" type="submit">Submit</button>  
        {' '}
        <IndexLink to="/" className="btn btn-primary">Back</IndexLink>
       
        
      </form>);
  }
}

UpdateComment.contextTypes = { router: routerShape.isRequired };

UpdateComment.propTypes = {
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
	  return {
		status: state.comments.status,  
	    //status1: state.comments.status,
	    comments: state.comments.data
	   
	  };
}

/* Inject dispatch() but state into props */
export default connect(mapStateToProps)(UpdateComment);
