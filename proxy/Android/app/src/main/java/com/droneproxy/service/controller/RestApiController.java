package com.droneproxy.service.controller;

import android.util.Log;

import com.dronegcs.mavlink.core.gcs.GCSHeartbeat;
import com.dronegcs.mavlink.is.connection.ConnectionStatistics;
import com.dronegcs.mavlink.is.connection.MavLinkConnectionStatisticsListener;
import com.dronegcs.mavlink.is.drone.Drone;
import com.droneproxy.service.model.PortConfig;
import com.generic_tools.devices.SerialConnection;
import com.google.gson.Gson;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

//import org.json.simple.JSONArray;
//import org.json.simple.JSONObject;
//import org.json.simple.JSONArray;
//import org.json.simple.JSONObject;
//import org.json.simple.parser.JSONParser;
//import org.json.simple.parser.ParseException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class RestApiController implements MavLinkConnectionStatisticsListener {

  @Autowired
  private SerialConnection serialConnection;

  @Autowired
  private Drone drone;

  @Autowired
  private GCSHeartbeat gcsHeartbeat;

  @Autowired
  private WebSocketController webSocketController;

  private ConnectionStatistics connectionStatistics = new ConnectionStatistics();

  private static final String RESULT = "result";
  private Instant startTime;

  private JSONObject getResponseTemplate() throws Exception {
    JSONObject obj = new JSONObject();
    obj.put(RESULT, true);
    return obj;
  }

  @PostConstruct
  private void init() {
    Log.e("talma " + RestApiController.class.getName(), "Post Construct");
    drone.getMavClient().addMavLinkConnectionStatisticsListener(this.getClass().getName(), this);
//    startTime = Instant.now();

  }

  @GetMapping("/listports")
  public Map listports() throws Exception {
    Object[] ports = serialConnection.listPorts();
    JSONObject obj = new JSONObject();
    JSONArray array = new JSONArray();
    for (int i = 0 ; i < ports.length ; i++)
      array.put(ports[i]);
    obj.put("ports", array);
    return new Gson().fromJson(obj.toString(), new TypeToken<HashMap<String, Object>>() {}.getType());
  }

  @GetMapping("/stat")
  public Map stat() throws Exception {
    JSONObject obj = getResponseTemplate();
    String str = new Gson().toJson(this.connectionStatistics, ConnectionStatistics.class);
    obj.put("connection", new JsonParser().parse(str));
    return new Gson().fromJson(obj.toString(), new TypeToken<HashMap<String, Object>>() {}.getType());
  }

  @GetMapping("/info")
  public Map info() throws Exception {
    JSONObject obj = getResponseTemplate();
    obj.put("type", drone.getType().getDroneType().name());
    JSONObject fw = new JSONObject();
    fw.put("type", drone.getFirmwareType().toString());
    fw.put("version", drone.getFirmwareVersion() != null ? drone.getFirmwareVersion() : "Unknown");
    obj.put("firmware", fw);
    return new Gson().fromJson(obj.toString(), new TypeToken<HashMap<String, Object>>() {}.getType());
  }

  @PostMapping("/connect")
  public Map connect(@RequestBody PortConfig portConfig) throws Exception {
    JSONObject obj = getResponseTemplate();
    try {
      if (portConfig.getBaud() != serialConnection.getBaud() || portConfig.getName() != serialConnection.getPortName()) {
        if (serialConnection.isConnect()) {
          if (drone.isConnectionAlive()) {
            System.out.println("Mavlink Drone is connected and binded, disconnecting it");
            gcsHeartbeat.setActive(false);
            drone.getMavClient().disconnect();
          }
          System.out.println("Port Already connected, but request arrived to change connection properties");
          serialConnection.disconnect();
        }

        serialConnection.setBaud(portConfig.getBaud());
        serialConnection.setPortName(portConfig.getName());
        drone.getMavClient().connect();
        System.out.println("Start HB");
        gcsHeartbeat.setActive(true);
      }
      else {
        System.out.println("Port Already connected");
      }
      JSONObject info = new JSONObject();
      info.put("name", serialConnection.getPortName());
      info.put("baud", serialConnection.getBaud());
      obj.put("connection", info);
    }
    catch (Exception e) {
      e.printStackTrace();
      obj.put(RESULT, false);
      obj.put("message", e.getMessage());
    }

        return new Gson().fromJson(obj.toString(), new TypeToken<HashMap<String, Object>>() {}.getType());
  }


  @PostMapping("/disconnect")
  public Map disconnect() throws Exception {
    JSONObject obj = getResponseTemplate();

    try {
      drone.getMavClient().disconnect();
    }
    catch (Exception e) {
      e.printStackTrace();
      obj.put(RESULT, false);
      obj.put("message", e.getMessage());
    }
        return new Gson().fromJson(obj.toString(), new TypeToken<HashMap<String, Object>>() {}.getType());
  }

  @Override
  public void onConnectionStatistics(ConnectionStatistics connectionStatistics) {
    this.connectionStatistics = connectionStatistics;
  }

  @GetMapping("/getMavlinkVersion")
  public Map getMavlinkVersion() throws Exception {
    JSONObject object = getResponseTemplate();
    object.put("message", drone.getMavClient().getMavlinkVersion());
    return new Gson().fromJson(object.toString(), new TypeToken<HashMap<String, Object>>() {}.getType());
  }

  @GetMapping("/refreshParameters")
  public Map refreshParameters() throws Exception {
    System.out.println("Sync Parameters");
    drone.getParameters().refreshParameters();
//    return getResponseTemplate().toMap();
    return new Gson().fromJson(getResponseTemplate().toString(), new TypeToken<HashMap<String, Object>>() {}.getType());

  }

  @GetMapping("/getParametersList")
  public Map getOfflineParameters() throws Exception {
    System.out.println("Get Offline Parameters");
    JSONObject object = getResponseTemplate();
    if (drone.getMavClient().isConnected()) {
      object.put("parameters", drone.getParameters().getParametersList());
      object.put("online", true);
    }
    else {
      object.put("parameters", drone.getParameters().getParametersMetadata());
      object.put("online", false);
    }
    return new Gson().fromJson(object.toString(), new TypeToken<HashMap<String, Object>>() {}.getType());
  }

  @GetMapping("/fetchWaypoints")
  public Map fetchWaypoints() throws Exception {
    System.out.println("Fetch Waypoints");
    drone.getWaypointManager().getWaypoints();
    return new Gson().fromJson(getResponseTemplate().toString(), new TypeToken<HashMap<String, Object>>() {}.getType());
  }

  @GetMapping("/ping")
  public Map ping() throws Exception {
    System.out.println("Ping");
    JSONObject object = getResponseTemplate();
    object.put("version", "v1.0");
//    Duration duration = Duration.between(startTime, Instant.now());
//    String val = String.format("%d:%02d:%02d", duration.toHours(), duration.toMinutes() % 60 , duration.getSeconds() % 60);
//    object.put("uptime", val);
    object.put("uptime", "66");
    JSONObject conn = new JSONObject();
    conn.put("drone", drone.getMavClient().isConnected());
    conn.put("port", serialConnection.getPortName());
    conn.put("baud-rate", serialConnection.getBaud());
    object.put("connection",conn);
    return new Gson().fromJson(conn.toString(), new TypeToken<HashMap<String, Object>>() {}.getType());
  }

}
