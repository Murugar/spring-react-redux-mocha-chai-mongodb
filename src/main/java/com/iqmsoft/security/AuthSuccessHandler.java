package com.iqmsoft.security;

import java.io.IOException;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iqmsoft.utils.Cookies;
import com.iqmsoft.utils.State;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class AuthSuccessHandler implements AuthenticationSuccessHandler {

	@Inject
	private ObjectMapper mapper;

	/** Return 200 OK for successful AJAX authentications, plus user's roles */

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		response.setStatus(HttpServletResponse.SC_OK);
		Cookies.setSecurityTokens(request, response);

		ServletOutputStream outputStream = response.getOutputStream();

		mapper.writeValue(outputStream, State.getAuthState(request));

		outputStream.close();
	}
}
