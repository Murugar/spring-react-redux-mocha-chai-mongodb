package com.iqmsoft.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableAutoConfiguration
@ComponentScan({"com.iqmsoft.books", "com.iqmsoft.comments"})
@EnableMongoRepositories(basePackages = {"com.iqmsoft.books", "com.iqmsoft.comments"})
@EnableTransactionManagement
public class ReposConfig {



}