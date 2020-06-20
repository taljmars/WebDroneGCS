package com.droneconnector.configuration;

import com.generic_tools.environment.Environment;
import com.generic_tools.logger.Logger;
import com.generic_tools.validations.RuntimeValidator;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import javax.validation.Validator;
import java.net.URISyntaxException;

@Configuration
public class Framework {

  @Value("${envdir}")
  private String envdir = null;

  @Bean
  public Environment environment() {
//    try {
      Environment env = new Environment(envdir);
//      env.setBaseRunningDirectoryByClass(".");
      System.out.println("Env directory " + envdir);
//      LOGGER.debug("Base running environment was set to {}", env.getRunningEnvBaseDirectory());
      return env;
//    }
//    catch (URISyntaxException e) {
//      throw new BeanCreationException(e.getMessage());
//    }
  }

  @Bean
  public Logger logger(@Autowired Environment environment) {
    return new Logger(environment);
  }

  @Bean
  public Validator validator() {
    return new LocalValidatorFactoryBean();
  }

  @Bean
  public RuntimeValidator runtimeValidator(@Autowired Validator validator) {
    RuntimeValidator rtv = new RuntimeValidator();
    rtv.setValidator(validator);
    return rtv;
  }

}
