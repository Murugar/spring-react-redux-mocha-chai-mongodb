package com.iqmsoft.comments;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;

//@Repository
public class InMemoryCommentRepository 
//implements CommentRepository 

{
/*
	private static AtomicLong counter = new AtomicLong();

	private final ConcurrentMap<Long, Comment> comments = new ConcurrentHashMap<>();

	@PostConstruct
	public void populateRepository() {
		this.add(new Comment("Brian Clozel", "This is a test!", "plain"));
		this.add(new Comment("Stéphane Nicoll", "This is another test too!", "plain"));
		this.add(new Comment("Test", "Test", "plain"));
	}

	@Override
	public Comment update(Long id, Comment comment) {
		this.comments.put(id, comment);
		return comment;
	}
	
	@Override
	public Comment add(Comment comment) {
		Long id = counter.incrementAndGet();
		comment.setId(id);
		this.comments.put(id, comment);
		return comment;
	}

	@Override
	public Comment find(Long id) {
		return this.comments.get(id);
	}
	
	@Override
	public boolean remove(Long id) {
		
		if(this.comments.containsKey(id))
		{
		   this.comments.remove(id);
		   return true;
		}
		else
		{
			return false;
		}
		
		
	}

	@Override
	public Iterable<Comment> findAll() {
		return this.comments.values();
	}
	*/
}
