package com.iqmsoft;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.iqmsoft.books.Book;
import com.iqmsoft.books.BookRepository;
import com.iqmsoft.comments.Comment;
import com.iqmsoft.comments.CommentRepository;

@Component
public class AppRunner implements CommandLineRunner {

	@Autowired
	private BookRepository bookRepository;	
	
	@Autowired
	private CommentRepository commentRepository;
	
   @Override    
   public void run(String... args) throws Exception {

	   
	   if(commentRepository.count() == 0)
	   {
	     commentRepository.save(new Comment("Joseph Butler", "This is a test!", "plain"));
	     commentRepository.save(new Comment("Stephen Cortzen", "This is another test too!", "plain"));
	     commentRepository.save(new Comment("Test", "Test", "plain"));
	   }
	   
	   if(bookRepository.count() == 0)
	   {
	     bookRepository.save(new Book("test1", "test1", "test1", 40));
	     bookRepository.save(new Book("test2", "test2", "test2", 40));
	     bookRepository.save(new Book("test3", "test3", "test3", 40));
	   }
	   
	   
	   System.out.println( bookRepository.findAll());
	   System.out.println( commentRepository.findAll());
   }
}


