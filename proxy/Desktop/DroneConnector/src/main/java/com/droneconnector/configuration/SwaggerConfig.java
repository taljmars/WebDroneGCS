package com.droneconnector.configuration;

import static com.google.common.collect.Lists.newArrayList;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMethod;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.paths.RelativePathProvider;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import javax.servlet.ServletContext;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

  @Autowired
  private ServletContext servletContext;

  @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2)
      .pathProvider(new RelativePathProvider(servletContext) {
        @Override
        public String getApplicationBasePath() {
          return "/swagger";
        }
      })
      .select()
      .apis(RequestHandlerSelectors.any())
//      .apis(RequestHandlerSelectors.basePackage("com.droneconnector.controller"))
//      .paths(PathSelectors.ant("*"))
      .paths(PathSelectors.any())
      .build()
      .apiInfo(apiInfo())
      .useDefaultResponseMessages(false)

      .globalResponseMessage(RequestMethod.GET, newArrayList(new ResponseMessageBuilder().code(500)
          .message("500 message")
          .responseModel(new ModelRef("Error"))
          .build(),
        new ResponseMessageBuilder().code(403)
          .message("Forbidden!!!!!")
          .build()));
  }

  private ApiInfo apiInfo() {
    ApiInfo apiInfo = new ApiInfo(
      "Drone Connector GCS API",
      "API to communicate with Drone Connector engine",
      "v1.0",
      "Any use",
      new Contact(
        "Tal Martsiano",
        "https://github.com/taljmars/WebDroneGCS",
        "taljmars@gmail.com"
      ),
      "Free License",
      "<API license URL>");
    return apiInfo;
  }
}
