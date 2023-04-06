package com.intellisoft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello IntelliSOFT Consulting Ltd!");
        SpringApplication.run(Main.class, args);
    }
}