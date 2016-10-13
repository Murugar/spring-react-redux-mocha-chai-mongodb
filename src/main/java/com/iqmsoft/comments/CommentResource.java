package com.iqmsoft.comments;

import java.util.List;
import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import static com.iqmsoft.utils.Functions.map;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
public class CommentResource {

	private static final Logger LOG = LoggerFactory.getLogger(CommentResource.class);

	
	@Inject
	private CommentRepository repository;

	@RequestMapping(path = "/comments/remove/{id}", method = DELETE)
	public ResponseEntity<?> delete(@PathVariable String id) {
		
		 repository.delete(id);
		 return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(path = "/comments/update/{id}", method = PUT)
	public ResponseEntity<Comment> update(@PathVariable String id, @RequestBody Comment comment) {
		LOG.info("Updated Comment {}", comment);
		
		Comment c = repository.findOne(id);
		
		if(c != null)
		{
			Comment p = repository.save(comment);
			return new ResponseEntity<Comment>(p,HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<Comment>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	
	@RequestMapping(path = "/comments", method = POST)
	public ResponseEntity<Comment> add(@RequestBody Comment comment) {
		LOG.info("Added New Comment {}", comment);
		Comment c = repository.save(comment);
		return new ResponseEntity<Comment>(c, HttpStatus.CREATED);
	}

	@RequestMapping(path = "/comments/{id}", method = GET)
	public ResponseEntity<Comment> getComment(@PathVariable String id) {
	      
		 Comment c = this.repository.findOne(id);
		 
		 if(c != null)
		 {
			 return new ResponseEntity<Comment>(c,HttpStatus.OK);
		 }
		 else
		 {
			 return new ResponseEntity<Comment>(HttpStatus.NOT_FOUND);
		 }
	}
	
	
	 @ExceptionHandler(ResourceNotFoundException.class)
	 private ResponseEntity<Void> handleResourceNotFoundException(ResourceNotFoundException e) {
	  return ResponseEntity.notFound().build();
	 }
	
	 
	@SuppressWarnings("serial")
	@ResponseStatus(value=HttpStatus.NOT_FOUND,reason="Server Error")
	private class ResourceNotFoundException extends RuntimeException { }
	
	@RequestMapping(path = "/comments", method = GET)
	public ResponseEntity<List<Comment>> comments() {
		// You shouldn't do this in a real app - you should page the data.
		
		List<Comment> l = repository.findAll();
		
		if(l != null)
		{
			LOG.info("Returning all Comments {}", l);
			return new ResponseEntity<>(l,HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		
		
	}
}
