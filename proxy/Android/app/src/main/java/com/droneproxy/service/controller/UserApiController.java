package com.droneproxy.service.controller;

import com.dronegcs.mavlink.is.connection.ConnectionStatistics;
import com.droneproxy.service.model.LoginRequest;
import com.droneproxy.service.model.LoginResponse;
import com.droneproxy.service.model.LogoutRequest;
import com.droneproxy.service.model.LogoutResponse;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
//import org.json.JSONObject;
//import org.json.simple.JSONObject;
//import org.json.simple.parser.JSONParser;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserApiController {

  private static final String RESULT = "result";

  private JSONObject getResponseTemplate() throws JSONException {
    JSONObject obj = new JSONObject();
    obj.put(RESULT, true);
    return obj;
  }

  @PostConstruct
  private void init() {
  }

  @PostMapping("/login")
  public Map login(@RequestBody LoginRequest loginRequest) {
    System.out.println(loginRequest.getEmail());
    System.out.println(loginRequest.getPassword());
    LoginResponse loginResponse = new LoginResponse();
    loginResponse.setToken(UUID.randomUUID().toString());
    loginResponse.setError("");
    String str = new Gson().toJson(loginResponse, LoginResponse.class);
//    JSONObject obj = new JSONObject(str);
    return new Gson().fromJson(str, new TypeToken<HashMap<String, Object>>() {}.getType());
  }

  @PostMapping("/logout")
  public Map logout(@RequestBody LogoutRequest logoutRequest) {
    System.out.println(logoutRequest.getToken());
    LogoutResponse loginResponse = new LogoutResponse();
    loginResponse.setError("");
    String str = new Gson().toJson(loginResponse, LogoutResponse.class);
//    JSONObject obj = new JSONObject(str);
    return new Gson().fromJson(str, new TypeToken<HashMap<String, Object>>() {}.getType());
  }

}
