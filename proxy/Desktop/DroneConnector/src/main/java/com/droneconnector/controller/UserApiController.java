package com.droneconnector.controller;

import com.droneconnector.models.ConnectorException;
import com.droneconnector.models.users.LoginRequest;
import com.droneconnector.models.users.LoginResponse;
import com.droneconnector.models.users.LogoutRequest;
import com.droneconnector.models.users.LogoutResponse;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = "/user/")
@RestController
public class UserApiController {

  @ExceptionHandler({ ConnectorException.class })
  public void handleException() {}

//  private JSONObject getResponseTemplate() {
//    JSONObject obj = new JSONObject();
//    obj.put(Constants.RESULT, true);
//    return obj;
//  }

  @PostConstruct
  private void init() {
  }

  @PostMapping("/login")
  public LoginResponse login(@RequestBody LoginRequest loginRequest) {
    System.out.println(loginRequest.getEmail());
    System.out.println(loginRequest.getPassword());
    LoginResponse loginResponse = new LoginResponse();
    loginResponse.setToken(UUID.randomUUID().toString());
    loginResponse.setError("");
//    String str = new Gson().toJson(loginResponse, LoginResponse.class);
//    JSONObject obj = new JSONObject(str);
//    return obj.toMap();
    return loginResponse;
  }

  @PostMapping("/logout")
  public LogoutResponse logout(@RequestBody LogoutRequest logoutRequest) {
    System.out.println(logoutRequest.getToken());
    LogoutResponse loginResponse = new LogoutResponse();
    loginResponse.setError("");
//    String str = new Gson().toJson(loginResponse, LogoutResponse.class);
//    JSONObject obj = new JSONObject(str);
//    return obj.toMap();
    return loginResponse;
  }

}
