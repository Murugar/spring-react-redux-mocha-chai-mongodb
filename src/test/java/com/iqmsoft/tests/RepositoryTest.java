package com.iqmsoft.tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.iqmsoft.books.Book;
import com.iqmsoft.books.BookRepository;
import com.iqmsoft.comments.Comment;
import com.iqmsoft.comments.CommentRepository;
import com.iqmsoft.config.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {ReposConfig.class})
public class RepositoryTest {

	@Autowired
	private BookRepository brepo;
	
	@Autowired
	private CommentRepository crepo;

	@Test
	public void testSaveBook() {
		
		Book b = new Book("bbbb", "bbbb", "bbbb", 10);
		
	 
		
		assertNull(b.getId());
		brepo.save(b);
		assertNotNull(b.getId());

		Book c = brepo.findOne(b.getId());
		
		

		assertNotNull(b);
		
		assertEquals(b.getId(), c.getId());
		
		assertEquals(b.getAuthor(), c.getAuthor());
		assertEquals(b.getName(), c.getName());
		assertEquals(b.getPages(), c.getPages());
		
		brepo.delete(c);
		
	
	}
	
	@Test
	public void testSaveComment() {
		
		Comment b = new Comment("bbbb", "bbbb", "bbbb");
		
	 
		
		assertNull(b.getId());
		crepo.save(b);
		assertNotNull(b.getId());

		Comment c = crepo.findOne(b.getId());
		
		

		assertNotNull(b);
		
		assertEquals(b.getId(), c.getId());
		
		assertEquals(b.getAuthor(), c.getAuthor());
		assertEquals(b.getContent(), c.getContent());
		
		assertEquals(c.getType(), c.getType());
		
		crepo.delete(c);
		
	
	}

	
	
}
