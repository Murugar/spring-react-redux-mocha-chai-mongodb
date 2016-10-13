package com.iqmsoft.books;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value="/api/books", produces=APPLICATION_JSON_VALUE)
public class BookController {

	@Inject
    private BookRepository bookRepository;
    
    private static final Logger LOG = LoggerFactory.getLogger(BookController.class);

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Book> createBook(@RequestBody @Valid final Book book) {
        return new ResponseEntity<Book>(bookRepository.save(book),HttpStatus.CREATED); 
    }
    
    @RequestMapping(value = "/{bookId}", method = RequestMethod.PUT)
    public ResponseEntity<Book> updateBook(@PathVariable String bookId, 
    		@RequestBody @Valid final Book book) {
    
    	Book b = bookRepository.findOne(bookId);
    	
    	if(b != null)
    	{
            return new ResponseEntity<Book>(bookRepository.save(book),HttpStatus.OK); 
    	}
    	else
    	{
    		return new ResponseEntity<Book>(HttpStatus.NOT_FOUND); 
    	}
    }

    
    @RequestMapping(value = "/{bookId}", method = RequestMethod.GET)
    public Book getBook(@PathVariable String bookId) {
        return bookRepository.findOne(bookId);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Book>> getBooks() {
        List<Book> l =  bookRepository.findAll();
        
		
		if(l != null)
		{
			LOG.info("Returning all Books {}", l);
			return new ResponseEntity<>(l,HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
        
    }

    @RequestMapping(value = "/{bookId}", method = RequestMethod.DELETE)
    public void deleteBook(@PathVariable String bookId) {
        bookRepository.delete(bookId);
    }

}