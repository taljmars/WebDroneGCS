package com.droneconnector.annotations;

import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class EmailValidator implements ConstraintValidator<Email, String> {

  @Override
  public void initialize(Email constraintAnnotation) {

  }

  @Override
  public boolean isValid(String emailValue, ConstraintValidatorContext constraintValidatorContext) {
    return emailValue != null;
  }
}
