package com.droneproxy.service.controller;


//import org.json.JSONObject;
//import org.json.simple.JSONObject;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

//import org.json.simple.JSONObject;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;


@Controller
public class WebSocketController {

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    public static final String Q_DRONE = "drone";
    public static final String Q_PORT = "port";

//    @MessageMapping("/message")
//    @SendTo("/topic/events/drone")
//    public String processMessageFromClient(@Payload String message) throws Exception {
//        System.out.println(">>> " + message);
//        JSONObject jsonObject = new JSONObject(message);
//        String name = "TA(" + jsonObject.getString("name") + ")";//new Gson().fromJson(message, Map.class).get("name").toString();
//        return name;
//    }


    @MessageExceptionHandler
    public String handleException(Throwable exception) {
        messagingTemplate.convertAndSend("/errors", exception.getMessage());
        return exception.getMessage();
    }

    public boolean broadcast(String queue, JSONObject msg) {
      Map val =  new Gson().fromJson(msg.toString(), new TypeToken<HashMap<String, Object>>() {}.getType());

      messagingTemplate.convertAndSend("/topic/events/" + queue, val);
        return true;
    }

}
