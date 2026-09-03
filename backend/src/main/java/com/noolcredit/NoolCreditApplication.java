package com.noolcredit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class NoolCreditApplication {

	public static void main(String[] args) {
		SpringApplication.run(NoolCreditApplication, args);
	}

}
