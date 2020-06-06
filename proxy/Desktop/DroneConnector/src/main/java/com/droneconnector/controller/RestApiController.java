package com.droneconnector.controller;

import com.droneconnector.model.Modes;
import com.droneconnector.model.PortConfig;
import com.droneconnector.model.StreamRates;
import com.dronegcs.mavlink.core.gcs.GCSHeartbeat;
import com.dronegcs.mavlink.is.connection.ConnectionStatistics;
import com.dronegcs.mavlink.is.connection.MavLinkConnection;
import com.dronegcs.mavlink.is.connection.MavLinkConnectionStatisticsListener;
import com.dronegcs.mavlink.is.drone.Drone;
import com.dronegcs.mavlink.is.drone.Preferences;
import com.dronegcs.mavlink.is.drone.parameters.Parameter;
import com.dronegcs.mavlink.is.drone.variables.Calibration;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmCommands;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmModes;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmTuning;
import com.generic_tools.devices.SerialConnection;
import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.Period;
import java.util.Map;
import java.util.Vector;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class RestApiController implements MavLinkConnectionStatisticsListener {

  @Autowired
  private SerialConnection serialConnection;

  @Autowired
  private Drone drone;

  @Autowired
  private Calibration calibration;

  @Autowired
  private GCSHeartbeat gcsHeartbeat;

  @Autowired
  private WebSocketController webSocketController;

  private ConnectionStatistics connectionStatistics = new ConnectionStatistics();

  private static final String RESULT = "result";
  private Instant startTime;

  private JSONObject getResponseTemplate() {
    JSONObject obj = new JSONObject();
    obj.put(RESULT, true);
    return obj;
  }

  @PostConstruct
  private void init() {
    drone.getMavClient().addMavLinkConnectionStatisticsListener(this.getClass().getName(), this);
    startTime = Instant.now();
  }

  @GetMapping("/listports")
  public Map listports() {
    Object[] ports = serialConnection.listPorts();
    JSONObject obj = new JSONObject();
    JSONArray array = new JSONArray();
    for (int i = 0 ; i < ports.length ; i++)
      array.put(ports[i]);
    obj.put("ports", array);
    return obj.toMap();
  }

  @GetMapping("/stat")
  public Map stat() {
    JSONObject obj = getResponseTemplate();
    String str = new Gson().toJson(this.connectionStatistics, ConnectionStatistics.class);
    obj.put("connection", new JSONObject(str));
    return obj.toMap();
  }

  @GetMapping("/info")
  public Map info() {
    JSONObject obj = getResponseTemplate();
    obj.put("type", drone.getType().getDroneType().name());
    JSONObject fw = new JSONObject();
    fw.put("type", drone.getFirmwareType().toString());
    fw.put("version", drone.getFirmwareVersion() != null ? drone.getFirmwareVersion() : "Unknown");
    obj.put("firmware", fw);

    JSONObject protocol = new JSONObject();
    protocol.put("gcsid", drone.getGCS().getId());
    protocol.put("type",
      drone.getMavClient().getProtocolState().equals(MavLinkConnection.ProtocolExamine.LEARNING)
      ? MavLinkConnection.ProtocolExamine.LEARNING
      : drone.getMavClient().getMavlinkVersion());
    protocol.put("heartbeatinterval", gcsHeartbeat.getFrequency());
    protocol.put("gcsid", drone.getMavClient().getMavlinkVersion());
    protocol.put("refreshparam", drone.getParameters().isFetchOnConnect());
//    protocol.put("streamrates", new StreamRates(drone.getPreferences().getRates()));
    obj.put("protocol", protocol);

    return obj.toMap();
  }

  @GetMapping("/")
  public Map index() {
    JSONObject obj = getResponseTemplate();
    obj.put("message", "welcome");
    return obj.toMap();
  }

  @PostMapping("/connect")
  public Map connect(@RequestBody PortConfig portConfig) {
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

    return obj.toMap();
  }


  @PostMapping("/disconnect")
  public Map disconnect() {
    JSONObject obj = getResponseTemplate();

    try {
      drone.getMavClient().disconnect();
    }
    catch (Exception e) {
      e.printStackTrace();
      obj.put(RESULT, false);
      obj.put("message", e.getMessage());
    }
    return obj.toMap();
  }

  @Override
  public void onConnectionStatistics(ConnectionStatistics connectionStatistics) {
    this.connectionStatistics = connectionStatistics;
  }

  @GetMapping("/getMavlinkVersion")
  public Map getMavlinkVersion() {
    JSONObject object = getResponseTemplate();
    object.put("message", drone.getMavClient().getMavlinkVersion());
    return object.toMap();
  }

  @GetMapping("/refreshParameters")
  public Map refreshParameters() {
    System.out.println("Sync Parameters");
    drone.getParameters().refreshParameters();
    return getResponseTemplate().toMap();
  }

  @GetMapping("/getParametersList")
  public Map getOfflineParameters() {
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
    return object.toMap();
  }

  @GetMapping("/fetchWaypoints")
  public Map fetchWaypoints() {
    System.out.println("Fetch Waypoints");
    drone.getWaypointManager().getWaypoints();
    return getResponseTemplate().toMap();
  }

  @GetMapping("/ping")
  public Map ping() {
    System.out.println("Ping");
    JSONObject object = getResponseTemplate();
    object.put("version", "v1.0");
    Duration duration = Duration.between(startTime, Instant.now());
    String val = String.format("%d:%02d:%02d", duration.toHours(), duration.toMinutes() % 60 , duration.getSeconds() % 60);
    object.put("uptime", val);
    JSONObject conn = new JSONObject();
    conn.put("drone", drone.getMavClient().isConnected());
    conn.put("port", serialConnection.getPortName());
    conn.put("baud-rate", serialConnection.getBaud());
    object.put("connection",conn);
    return object.toMap();
  }

  @PostMapping("/setStreamRates")
  public Map setStreamRates(@RequestBody StreamRates streamRates) {
    System.out.println("setStreamRates");
    System.out.println(streamRates.toString());
    drone.getPreferences().setRates(streamRates.toRates());
    JSONObject object = getResponseTemplate();
    return object.toMap();
  }

  @GetMapping("/getStreamRates")
  public Map getStreamRates() {
    System.out.println("getStreamRates");
    String str = new Gson().toJson(new StreamRates(drone.getPreferences().getRates()), StreamRates.class);
    JSONObject object = new JSONObject(str);
    return object.toMap();
  }

  @GetMapping("/getModesOptions")
  public Map getModesOptions() {
    System.out.println("getModesOptions");
    JSONObject object = getResponseTemplate();
    // Generate flight mode combo-boxs and keys
    object.put("modes",ApmModes.getModeList(drone.getType().getDroneType()));
    return object.toMap();
  }

  @GetMapping("/getCommandsOptions")
  public Map getCommandsOptions() {
    System.out.println("getCommandsOptions");
    JSONObject object = getResponseTemplate();
    // Generate command combo-boxs and keys
    object.put("commands",ApmCommands.getCommandsList());
    return object.toMap();
  }

  @GetMapping("/getTuneOptions")
  public Map getTuneOptions() {
    System.out.println("getTuneOptions");
    JSONObject object = getResponseTemplate();
    // Generate tunning combo-boxs and keys
    object.put("tunes",ApmTuning.getTuningList());
    return object.toMap();
  }

  @GetMapping("/getModes")
  public Map getModes() {
    System.out.println("getModes");
    String str = new Gson().toJson(new Modes(drone), Modes.class);
    JSONObject object = new JSONObject(str);
    return object.toMap();
  }

  @PostMapping("setModes")
  public Map setMode(@RequestBody Modes modes) {
    System.out.println("setModes");
    System.out.println(modes);
    modes.toDrone(drone);
    JSONObject object = getResponseTemplate();
    return object.toMap();
  }

  @PostMapping("startEscCalibrate")
  public Map startEscCalibrate() {
    System.out.println("startEscCalibrate");
    Parameter parameter = drone.getParameters().getParameter("ESC_CALIBRATION");
    parameter.setValue(3);
    drone.getParameters().sendParameter(parameter);
    JSONObject object = getResponseTemplate();
    return object.toMap();
  }

  @PostMapping("startLevelCalibrate")
  public Map startLevelCalibrate() {
    System.out.println("startLevelCalibrate");
    calibration.startLevelCalibration();
    JSONObject object = getResponseTemplate();
    return object.toMap();
  }

  @PostMapping("startGyroCalibrate")
  public Map startGyroCalibrate() {
    System.out.println("startGyroCalibrate");
    JSONObject object = getResponseTemplate();
    if (calibration.isCalibrating()) {
      object.put(RESULT, false);
      object.put("messege", "Calibration Already Started");
    }
    else {
      calibration.startAccelerometerCalibration();
    }
    return object.toMap();
  }

}
