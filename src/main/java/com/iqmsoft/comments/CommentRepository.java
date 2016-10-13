package com.iqmsoft.comments;


import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment, String> {
	
	
}



/*public interface CommentRepository {
	Iterable<Comment> findAll();
	Comment update(Long id, Comment comment);
	Comment add(Comment comment);
	Comment find(Long id);
	boolean remove(Long id);
}*/
