package com.droneconnector.model;

import com.droneconnector.annotations.Email;

public class LoginRequest {

  @Email(regexp=".*@.*\\..*", message = "Email should be valid")
  private String email;

  private String password;

  public LoginRequest() {
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
