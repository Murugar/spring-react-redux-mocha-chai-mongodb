package com.iqmsoft.tests;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.*;

import javax.servlet.Filter;

import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iqmsoft.Application;
import com.iqmsoft.books.Book;
import com.iqmsoft.books.BookRepository;
import com.iqmsoft.comments.Comment;
import com.iqmsoft.comments.CommentRepository;
import com.iqmsoft.config.*;

import static org.hamcrest.Matchers.*;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = { Application.class, ReposConfig.class })
@WebAppConfiguration
public class ApplicationTests {

	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype());

	@Autowired
	private BookRepository brepo;

	@Autowired
	private CommentRepository crepo;

	// @Autowired
	// private Filter springSecurityFilterChain;

	private List<Book> b;
	private List<Comment> c;

	private MockMvc mockMvc;

	private MockMvc smockMvc;

	private String userName = "bdussault";

	private HttpMessageConverter mappingJackson2HttpMessageConverter;

	@Autowired
	private WebApplicationContext webApplicationContext;

	@Before

	public void setup() throws Exception {
		this.mockMvc = webAppContextSetup(webApplicationContext).build();

		this.smockMvc = webAppContextSetup(webApplicationContext).apply(springSecurity()).build();

		b = brepo.findAll();
		c = crepo.findAll();

	}

	protected String json(Object o) throws IOException {
		MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
		this.mappingJackson2HttpMessageConverter.write(o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
		return mockHttpOutputMessage.getBodyAsString();
	}

	@Test
	@WithMockUser(username = "admin", password = "admin", roles = { "USER", "ADMIN" })
	public void auth() throws Exception {
		this.smockMvc.perform(get("/signin")).andExpect(status().isOk());
	}

	@Test
	@WithMockUser(username = "admin", password = "admin", roles = { "USER", "ADMIN" })
	public void authaccount() throws Exception {
		this.smockMvc.perform(get("/api/account")).andExpect(status().isOk());
	}

	@Test
	@WithMockUser(username = "admin", password = "admin", roles = { "USER", "ADMIN" })
	public void authform() throws Exception {
		this.smockMvc.perform(formLogin("/signin").user("admin").password("admin")).andExpect(status().isOk());

	}

	@Test
	@WithMockUser(username = "admin", password = "admin", roles = { "USER", "ADMIN" })
	public void authlogout() throws Exception {

		this.smockMvc.perform(logout("/api/signout"))

				.andExpect(status().is3xxRedirection());

	}

	@Test
	@WithMockUser(username = "admin", password = "admin", roles = { "USER", "ADMIN" })
	public void authcomments() throws Exception {
		this.smockMvc.perform(get("/api/comments")).andExpect(status().isOk());
	}

	@Test
	public void readComments() throws Exception {
		mockMvc.perform(get("http://localhost:8080/api/comments")).andExpect(status().isOk())
				.andExpect(content().contentType(contentType));
		// andExpect(jsonPath("$.*", hasSize(4)));

	}

	@Test
	public void readBooks() throws Exception {
		mockMvc.perform(get("http://localhost:8080/api/books")).andExpect(status().isOk())
				.andExpect(content().contentType(contentType));
		// .andExpect(jsonPath("$.*", hasSize(4)));

	}

	@Test
	public void errController() throws Exception {

		mockMvc.perform(get("/error")).andExpect(status().is5xxServerError())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8));

	}

	@Test
	public void explodeController() throws Exception {

		mockMvc.perform(get("/explode")).andExpect(status().is5xxServerError())

		;

	}

	@Test
	public void accController() throws Exception {

		mockMvc.perform(get("/signin")).andExpect(status().isOk()).andExpect(view().name("index"));

	}

	@Test
	public void webControllerAdd() throws Exception {

		MvcResult result = this.mockMvc.perform(get("/add")).andExpect(status().isOk())
				.andExpect(model().attributeExists("comments")).andReturn();
		
		
		@SuppressWarnings("unchecked")
		Map<String, Object> recipes = (Map<String, Object>)result.getModelAndView().getModel().get("comments");

		@SuppressWarnings("unchecked")
		List<Comment> l = (List<Comment>) recipes.get("data");
		
		System.out.println("Hell");
		
		Comment c = l.get(0);
		
		List<Comment> cl = crepo.findAll();
		
		
		System.out.println(c.getAuthor());
		System.out.println(c.getContent());
		System.out.println(c.getType());
		
		System.out.println(l.size());
		System.out.println(recipes);
		
		assertEquals("there should be three recipes", l.size(), cl.size());
		
		int i = 0;
		
		for(Comment a : l)
		{
			Comment c1 = cl.get(i);
			assertEquals("Author", a.getAuthor(), c1.getAuthor() );
			assertEquals("Content", a.getContent(), c1.getContent());
			assertEquals("Type", a.getType(), c1.getType());
			
			i = i + 1;
		}
		
		
		
		
		
	}
	
	
	@Test
	public void webController() throws Exception {

		MvcResult result = this.mockMvc.perform(get("/")).andExpect(status().isOk())
				.andExpect(model().attributeExists("comments")).andReturn();
		
		
		@SuppressWarnings("unchecked")
		Map<String, Object> recipes = (Map<String, Object>)result.getModelAndView().getModel().get("comments");

		@SuppressWarnings("unchecked")
		List<Comment> l = (List<Comment>) recipes.get("data");
		
		System.out.println("Hell");
		
		Comment c = l.get(0);
		
		System.out.println(c.getAuthor());
		System.out.println(c.getContent());
		System.out.println(c.getType());
		
		System.out.println(l.size());
		System.out.println(recipes);
		
        List<Comment> cl = crepo.findAll();
		
        assertEquals("sizes ", l.size(), cl.size());
        
        int i = 0;
		
		for(Comment a : l)
		{
			Comment c1 = cl.get(i);
			assertEquals("Author", a.getAuthor(), c1.getAuthor() );
			assertEquals("Content", a.getContent(), c1.getContent());
			assertEquals("Type", a.getType(), c1.getType());
			
			i = i + 1;
		}
		
		
		
		
	}

	@Test
	public void defController() throws Exception {

		mockMvc.perform(get("/")).andExpect(status().isOk()).andExpect(view().name("index"))
				.andExpect(model().attribute("state", "completed")).andExpect(model().attribute("status", "completed"))
				.andExpect(model().attribute("comments", Matchers.hasKey("data"))).andExpect(model().errorCount(0))
				.andExpect(model().attribute("comments",
				 Matchers.hasKey("status")))
				.andExpect(model().attribute("comments",
				Matchers.hasKey("state")))
				.andExpect(model().attribute("comments",
				 Matchers.hasValue("completed")))
				.andExpect(model().attribute("comments", Matchers.notNullValue()));

	

	}


	@Test
	public void addController() throws Exception {

		mockMvc.perform(get("/add")).andExpect(status().isOk()).andExpect(view().name("index"))
				.andExpect(model().attribute("state", "completed")).andExpect(model().attribute("status", "completed"))
				.andExpect(model().attribute("comments", Matchers.hasKey("data")))
				.andExpect(model().attribute("comments", Matchers.notNullValue())).andExpect(model().errorCount(0))
				.andExpect(model().hasNoErrors()).andExpect(model().attributeExists("comments"))
				.andExpect(model().attribute("comments",
				 Matchers.hasKey("status")))
				.andExpect(model().attribute("comments",
				Matchers.hasKey("state")))
				.andExpect(model().attribute("comments",
				Matchers.hasValue("completed")))
				.andExpect(model().attribute("comments",
				Matchers.hasValue("loaded")))

		;

	}

	@Test
	public void readBook() throws Exception {

		Book b1 = b.get(0);

		mockMvc.perform(get("http://localhost:8080/api/books")).andExpect(status().isOk())
				.andExpect(content().contentType(contentType)).andExpect(jsonPath("$[0].id", is(b1.getId())))
				.andExpect(jsonPath("$[0].name", is(b1.getName())));
	}

	@Test
	public void readComment() throws Exception {

		Comment c1 = c.get(0);

		mockMvc.perform(get("http://localhost:8080/api/comments")).andExpect(status().isOk())
				.andExpect(content().contentType(contentType)).andExpect(jsonPath("$[0].id", is(c1.getId())))
				.andExpect(jsonPath("$[0].author", is(c1.getAuthor())));
	}

	@Test
	@WithMockUser(username = "admin", password = "admin", roles = { "USER", "ADMIN" })
	public void createComment() throws Exception {
		String commentjson = "";

		Comment u = new Comment("zzz", "zzz", "zzz");

		commentjson = GetJSON(commentjson, u);

		System.out.println(commentjson);

		System.out.println(crepo.findAll());

		this.smockMvc
				.perform(post("http://localhost:8080/api/comments").with(user("admin").password("admin").roles("ADMIN"))
						.contentType(contentType).with(csrf()).content(commentjson))
				.andExpect(status().is2xxSuccessful());
	}

	@Test
	@WithMockUser(username = "admin", password = "admin", roles = { "USER", "ADMIN" })
	public void updateComment() throws Exception {

		String commentjson = "";

		Comment b1 = c.get(0);

		commentjson = GetJSON(commentjson, b1);

		System.out.println("Update Comment");

		System.out.println(commentjson);

		System.out.println(crepo.findAll());

		this.smockMvc.perform(put("http://localhost:8080/api/comments/update/" + b1.getId())
				.with(user("admin").password("admin").roles("ADMIN")).contentType(contentType).with(csrf())
				.content(commentjson)).andExpect(status().isOk());
	}

	@Test
	@WithMockUser(username = "admin", password = "admin", roles = { "USER", "ADMIN" })
	public void deleteComment() throws Exception {

		Comment b1 = c.get(c.size() - 1);

		System.out.println("Delete Comment");

		System.out.println(b1);
		System.out.println(b.size());

		this.smockMvc.perform(delete("http://localhost:8080/api/comments/remove/" + b1.getId())
				.with(user("admin").password("admin").roles("ADMIN")).with(csrf())
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
	}

	@Test
	public void createBook() throws Exception {
		String bookjson = "";

		Book u = new Book("zzz", "zzz", "zzz", 10);

		bookjson = GetJSON(bookjson, u);

		System.out.println(bookjson);

		b = brepo.findAll();

		System.out.println(b);

		this.mockMvc.perform(post("http://localhost:8080/api/books").contentType(contentType).content(bookjson))
				.andExpect(status().isCreated());
	}

	@Test
	public void updateBook() throws Exception {

		String bookjson = "";

		Book b1 = b.get(0);

		bookjson = GetJSON(bookjson, b1);

		System.out.println(bookjson);

		b = brepo.findAll();

		System.out.println();

		this.mockMvc
				.perform(
						put("http://localhost:8080/api/books/" + b1.getId()).contentType(contentType).content(bookjson))
				.andExpect(status().isOk());
	}

	@Test
	public void deleteBook() throws Exception {

		String bookjson = "";

		Book b1 = b.get(b.size() - 1);

		System.out.println(b);
		System.out.println(b.size());

		this.mockMvc
				.perform(
						delete("http://localhost:8080/api/books/" + b1.getId()).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());
	}

	private String GetJSON(String bookjson, Book b1) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();

		try {
			// convert user object to json string and return it
			bookjson = mapper.writeValueAsString(b1);
		}

		// catch various errors
		catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		}
		return bookjson;
	}

	private String GetJSON(String bookjson, Comment b1) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();

		try {
			// convert user object to json string and return it
			bookjson = mapper.writeValueAsString(b1);
		}

		// catch various errors
		catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		}
		return bookjson;
	}

}
