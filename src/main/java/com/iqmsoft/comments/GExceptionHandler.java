package com.iqmsoft.comments;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GExceptionHandler {
	@ExceptionHandler(Exception.class)
	private ResponseEntity<Void> defaultExceptionHandler(Exception e) {
		// usually will log the exception first
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	}
}