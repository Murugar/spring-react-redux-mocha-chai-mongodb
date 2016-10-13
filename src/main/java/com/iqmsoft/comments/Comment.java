package com.iqmsoft.comments;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//import lombok.Data;
//import lombok.NoArgsConstructor;

/**
 * Simple data container class. We need a no-args constructor so that Jackson
 * can deserialise these.
 */
//@Data
//@NoArgsConstructor

@Document
public class Comment {
	
	
	@Id
	private String id;
	private String author;
	private String content;
	private String type;

	public Comment() {
		
	}
	
	public Comment(String author, String content, String type) {
		this.author = author;
		this.content = content;
		this.type = type;
	}

	
	
	public String getId() { 
		return id; 
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
