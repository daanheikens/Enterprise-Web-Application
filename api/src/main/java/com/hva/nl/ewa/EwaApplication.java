package com.hva.nl.ewa;

import com.hva.nl.ewa.services.storage.StorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class EwaApplication {
    public static void main(String[] args) {
        SpringApplication.run(EwaApplication.class, args);
    }
}
