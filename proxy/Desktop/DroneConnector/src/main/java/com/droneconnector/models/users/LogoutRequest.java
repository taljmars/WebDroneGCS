package com.droneconnector.models.users;

public class LogoutRequest {

  private String token;

  public LogoutRequest() {
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }
}
