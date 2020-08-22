package com.droneconnector.controller;

import com.droneconnector.model.Modes;
import com.droneconnector.model.PortConfig;
import com.droneconnector.model.SingleData;
import com.droneconnector.model.StreamRates;
import com.dronegcs.mavlink.core.gcs.GCSHeartbeat;
import com.dronegcs.mavlink.is.connection.ConnectionStatistics;
import com.dronegcs.mavlink.is.connection.MavLinkConnection;
import com.dronegcs.mavlink.is.connection.MavLinkConnectionStatisticsListener;
import com.dronegcs.mavlink.is.drone.Drone;
import com.dronegcs.mavlink.is.drone.calibration.CalibrateCompass;
import com.dronegcs.mavlink.is.drone.calibration.CalibrateGyroLevel;
import com.dronegcs.mavlink.is.drone.calibration.CalibrateGyroOrientation;
import com.dronegcs.mavlink.is.drone.calibration.CalibrateRC;
import com.dronegcs.mavlink.is.drone.parameters.Parameter;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmCommands;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmModes;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmTuning;
import com.dronegcs.mavlink.is.protocol.msg_metadata.enums.MAV_EXT_COMPASS_ORIENTATION;
import com.generic_tools.devices.SerialConnection;
import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.net.InterfaceAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.time.Duration;
import java.time.Instant;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class RestApiController implements MavLinkConnectionStatisticsListener {

  @Autowired
  private SerialConnection serialConnection;

  @Autowired
  private Drone drone;

  @Autowired
  private CalibrateGyroOrientation calibrateGyroOrientation;

  @Autowired
  private CalibrateGyroLevel calibrateGyroLevel;

  @Autowired
  private CalibrateCompass calibrateCompass;

  @Autowired
  private CalibrateRC calibrateRC;

  @Autowired
  private GCSHeartbeat gcsHeartbeat;

  @Autowired
  private WebSocketController webSocketController;

  private ConnectionStatistics connectionStatistics = new ConnectionStatistics();

  private List<String> ips = new ArrayList<>();

  private static final String RESULT = "result";
  private Instant startTime;

  private Set<String> connectedUsers = new HashSet<>();

  private JSONObject getResponseTemplate() {
    JSONObject obj = new JSONObject();
    obj.put(RESULT, true);
    return obj;
  }

  @PostConstruct
  private void init() {
    drone.getMavClient().addMavLinkConnectionStatisticsListener(this.getClass().getName(), this);
    startTime = Instant.now();

    try {
      Enumeration<NetworkInterface> nIfs = NetworkInterface.getNetworkInterfaces();
      while (nIfs.hasMoreElements()) {
        NetworkInterface nIf = nIfs.nextElement();
        for (InterfaceAddress address : nIf.getInterfaceAddresses())
          if (!address.getAddress().toString().contains(":"))
            ips.add(address.getAddress().toString().substring(1));
      }
    }
    catch (SocketException e) {
      e.printStackTrace();
    }
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
  public Map connect(@RequestBody PortConfig portConfig, HttpServletRequest request) {
    JSONObject obj = getResponseTemplate();
    try {
      connectedUsers.add(request.getRemoteAddr());
      if (!portConfig.getBaud().equals(serialConnection.getBaud()) || !portConfig.getName().equals(serialConnection.getPortName())
        || !serialConnection.isConnect()) {
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

        System.out.println("Refresh Parameters");
        drone.getParameters().refreshParameters();
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
  public Map disconnect(HttpServletRequest request) {
    JSONObject obj = getResponseTemplate();
    connectedUsers.add(request.getRemoteAddr());

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
  public Map ping(@RequestParam(required = false, defaultValue = "untagged") String id) {
//    System.out.println("Ping " + id);
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
    object.put("addresses", ips);
    object.put("connected-users", connectedUsers);
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
    calibrateGyroLevel.start();
    JSONObject object = getResponseTemplate();
    return object.toMap();
  }

  @PostMapping("startGyroCalibrate")
  public Map startGyroCalibrate() {
    System.out.println("startGyroCalibrate");
    JSONObject object = getResponseTemplate();
    if (calibrateGyroOrientation.isCalibrating()) {
      object.put(RESULT, false);
      object.put("messege", "Calibration Already Started");
    }
    else {
      calibrateGyroOrientation.start();
      gyroClibrateStep = 0;
    }
    return object.toMap();
  }

  private int gyroClibrateStep = 0;

  @PostMapping("ackGyroCalibrate")
  public Map ackGyroCalibrate() {
    System.out.println("ackGyroCalibrate");
    JSONObject object = getResponseTemplate();
    if (!calibrateGyroOrientation.isCalibrating()) {
      object.put(RESULT, false);
      object.put("messege", "Calibration Haven't Started");
    }
    else {
      calibrateGyroOrientation.ack(gyroClibrateStep);
    }
    return object.toMap();
  }

  public int increaseGyroCalibrateStep() {
    this.gyroClibrateStep++;
    return this.gyroClibrateStep;
  }

  @GetMapping("getSupportCompassMethods")
//  public Map startMagCalibrate(@RequestBody(required = false) int measurements) {
  public Map getSupportCompassMethods() {
    System.out.println("getSupportCompassMethods");
    Set<CalibrateCompass.CompassType> methods = calibrateCompass.getCompassFeatures();
//    for (CalibrateCompass.CompassType ct : calibrateCompass.getCompassFeatures()) {
//      ct.name();
//    }
    JSONObject object = getResponseTemplate();
    object.put("methods", methods == null ? new ArrayList<>() : calibrateCompass.getCompassFeatures());
    return object.toMap();
  }

  @PostMapping("setMagnometerCalibrateMethod")
  public Map setMagnometerCalibrateMethod(@RequestBody SingleData payload) {
    System.out.println("setMagnometerCalibrateMethod");
    CalibrateCompass.CompassType type = CalibrateCompass.CompassType.valueOf(payload.getData());
    calibrateCompass.setType(type);
    JSONObject object = getResponseTemplate();
    object.put("rotation", calibrateCompass.getOrientation());
    return object.toMap();
  }

  @PostMapping("setMagnometerCalibrateRotation")
  public Map setMagnometerCalibrateRotation(@RequestBody SingleData payload) {
    System.out.println("setMagnometerCalibrateRotation");
    MAV_EXT_COMPASS_ORIENTATION rt = MAV_EXT_COMPASS_ORIENTATION.valueOf(payload.getData());
    calibrateCompass.setOrientation(rt);
    JSONObject object = getResponseTemplate();
    return object.toMap();
  }

  @PostMapping("startMagCalibrate")
//  public Map startMagCalibrate(@RequestBody(required = false) int measurements) {
  public Map startMagCalibrate() {
    System.out.println("startMagCalibrate");
//    System.out.println("startMagCalibrate " + measurements);
//    if (measurements != 0)
//      calibrateCompass.startCompassCalibration(measurements);
//    else
    calibrateCompass.start();
    JSONObject object = getResponseTemplate();
    return object.toMap();
  }

  @PostMapping("stopMagCalibrate")
  public Map stopMagCalibrate() {
    System.out.println("stopMagCalibrate");
    calibrateCompass.stop();
    JSONObject object = getResponseTemplate();
    return object.toMap();
  }

  @PostMapping("startRCCalibrate")
  public Map startRCCalibrate() {
    System.out.println("startRCCalibrate");
    calibrateRC.start();
    JSONObject object = getResponseTemplate();
    return object.toMap();
  }

  @PostMapping("stopRCCalibrate")
  public Map stopRCCalibrate() {
    System.out.println("stopRCCalibrate");
    calibrateRC.stop();
    JSONObject object = getResponseTemplate();
    return object.toMap();
  }

}
