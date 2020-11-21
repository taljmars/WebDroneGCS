package com.droneconnector.controller;

import com.droneconnector.models.*;
import com.droneconnector.models.configuration.PortConfig;
import com.droneconnector.models.connection.ConnectResponse;
import com.droneconnector.models.connection.DisconnectResponse;
import com.droneconnector.models.connection.InfoResponse;
import com.droneconnector.models.connection.PingResponse;
import com.dronegcs.mavlink.core.gcs.GCSHeartbeat;
import com.dronegcs.mavlink.is.connection.ConnectionStatistics;
import com.dronegcs.mavlink.is.connection.MavLinkConnection;
import com.dronegcs.mavlink.is.connection.MavLinkConnectionStatisticsListener;
import com.dronegcs.mavlink.is.drone.Drone;
import com.generic_tools.devices.SerialConnection;
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
@RequestMapping(path = "/connection/")
@RestController
public class ConnectionApiController implements MavLinkConnectionStatisticsListener {

  @ExceptionHandler({ ConnectorException.class })
  public void handleException() {}

  @Autowired
  private SerialConnection serialConnection;

  @Autowired
  private Drone drone;

  @Autowired
  private GCSHeartbeat gcsHeartbeat;

  private ConnectionStatistics connectionStatistics = new ConnectionStatistics();

  private List<String> ips = new ArrayList<>();

  private Instant startTime;

  private Set<String> connectedUsers = new HashSet<>();

//  private JSONObject getResponseTemplate() {
//    JSONObject obj = new JSONObject();
//    obj.put(Constants.RESULT, true);
//    return obj;
//  }

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
  public ExtendedStandardResponse<ConnectionStatistics> stat() {
    ExtendedStandardResponse<ConnectionStatistics> message = new ExtendedStandardResponse<ConnectionStatistics>(true);
    message.setExtendedField(this.connectionStatistics);
    return message;
//    JSONObject obj = getResponseTemplate();
//    String str = new Gson().toJson(this.connectionStatistics, ConnectionStatistics.class);
//    obj.put("connection", new JSONObject(str));
//    return obj.toMap();
  }

  @GetMapping("/info")
  public InfoResponse info() {
    InfoResponse ir = new InfoResponse(true);
    ir.setType(drone.getType().getDroneType().name());

    InfoResponse.Firmware fw = new InfoResponse.Firmware();
    fw.setType(drone.getFirmwareType().toString());
    fw.setVersion(drone.getFirmwareVersion() != null ? drone.getFirmwareVersion() : "Unknown");
    ir.setFirmware(fw);

    InfoResponse.Protocol protocol = new InfoResponse.Protocol();

    protocol.setGcsid(drone.getGCS().getId());
    protocol.setType(drone.getMavClient().getProtocolState().equals(MavLinkConnection.ProtocolExamine.LEARNING)
      ? MavLinkConnection.ProtocolExamine.LEARNING.toString()
      : drone.getMavClient().getMavlinkVersion().toString());

    protocol.setHeartbeatInterval(gcsHeartbeat.getFrequency());
//    protocol.put("gcsid", drone.getMavClient().getMavlinkVersion());
    protocol.setRefreshParametersOnConnect(drone.getParameters().isFetchOnConnect());
    ir.setProtocol(protocol);

    return ir;

//    JSONObject obj = getResponseTemplate();
//    obj.put("type", drone.getType().getDroneType().name());
//    JSONObject fw = new JSONObject();
//    fw.put("type", drone.getFirmwareType().toString());
//    fw.put("version", drone.getFirmwareVersion() != null ? drone.getFirmwareVersion() : "Unknown");
//    obj.put("firmware", fw);
//
//    JSONObject protocol = new JSONObject();
//    protocol.put("gcsid", drone.getGCS().getId());
//    protocol.put("type",
//      drone.getMavClient().getProtocolState().equals(MavLinkConnection.ProtocolExamine.LEARNING)
//      ? MavLinkConnection.ProtocolExamine.LEARNING
//      : drone.getMavClient().getMavlinkVersion());
//    protocol.put("heartbeatinterval", gcsHeartbeat.getFrequency());
//    protocol.put("gcsid", drone.getMavClient().getMavlinkVersion());
//    protocol.put("refreshparam", drone.getParameters().isFetchOnConnect());
//    obj.put("protocol", protocol);
//
//    return obj.toMap();
  }

  @GetMapping("/")
  public ExtendedStandardResponse<String> index() {
//    JSONObject obj = getResponseTemplate();
//    obj.put(Constants.MESSAGE, "welcome");
//    return obj.toMap();
    ExtendedStandardResponse<String> message = new ExtendedStandardResponse<String>(true);
    message.setExtendedField("welcome");
    return message;
  }

  @PostMapping("/connect")
  public ConnectResponse connect(@RequestBody PortConfig portConfig, HttpServletRequest request) {
//    JSONObject obj = getResponseTemplate();
    ConnectResponse response = new ConnectResponse(true);
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

//        System.out.println("Refresh Parameters");
//        drone.getParameters().refreshParameters();
      }
      else {
        System.out.println("Port Already connected");
      }
//      JSONObject info = new JSONObject();
//      info.put("name", serialConnection.getPortName());
//      info.put("baud", serialConnection.getBaud());
//      obj.put("connection", info);
      ConnectResponse.Info info = new ConnectResponse.Info();
      info.setName(serialConnection.getPortName());
      info.setBaud(serialConnection.getBaud());
      response.setConnection(info);
      response.setExtendedField("Successfully connected");
    }
    catch (Exception e) {
      e.printStackTrace();
//      obj.put(Constants.RESULT, false);
//      obj.put(Constants.MESSAGE, e.getMessage());
      response.setResult(false);
      response.setExtendedField(e.getMessage());
    }

//    return obj.toMap();
    return response;
  }


  @PostMapping("/disconnect")
  public DisconnectResponse disconnect(HttpServletRequest request) {
    DisconnectResponse response = new DisconnectResponse(true);
//    JSONObject obj = getResponseTemplate();
    connectedUsers.add(request.getRemoteAddr());

    try {
      drone.getMavClient().disconnect();
    }
    catch (Exception e) {
      e.printStackTrace();
      response.setResult(false);
      response.setExtendedField(e.getMessage());
//      obj.put(Constants.RESULT, false);
//      obj.put(Constants.MESSAGE, e.getMessage());
    }
//    return obj.toMap();
    return response;
  }

  @Override
  public void onConnectionStatistics(ConnectionStatistics connectionStatistics) {
    this.connectionStatistics = connectionStatistics;
  }

  @GetMapping("/mavlink-version")
  public ExtendedStandardResponse<String> getMavlinkVersion() {
//    JSONObject object = getResponseTemplate();
//    object.put(Constants.MESSAGE, drone.getMavClient().getMavlinkVersion());
//    return object.toMap();
    ExtendedStandardResponse<String> message = new ExtendedStandardResponse<String>(true);
    message.setExtendedField(drone.getMavClient().getMavlinkVersion().toString());
    return message;
  }

  @GetMapping("/ping")
  public PingResponse ping(@RequestParam(required = false, defaultValue = "untagged") String id) {
//    System.out.println("Ping " + id);
    PingResponse pingResponse = new PingResponse(true);
    pingResponse.setVersion("v1.0");
    Duration duration = Duration.between(startTime, Instant.now());
    String val = String.format("%d:%02d:%02d", duration.toHours(), duration.toMinutes() % 60 , duration.getSeconds() % 60);
    pingResponse.setUptime(val);
    PingResponse.Connection conn = new PingResponse.Connection();
    conn.setDrone(drone.getMavClient().isConnected());
    conn.setPort(serialConnection.getPortName());
    conn.setBaud(serialConnection.getBaud());
    pingResponse.setConnection(conn);
    pingResponse.setAddresses(ips);
    pingResponse.setConnectedUsers(connectedUsers);
    return pingResponse;

//    JSONObject object = getResponseTemplate();
//    object.put("version", "v1.0");
//    Duration duration = Duration.between(startTime, Instant.now());
//    String val = String.format("%d:%02d:%02d", duration.toHours(), duration.toMinutes() % 60 , duration.getSeconds() % 60);
//    object.put("uptime", val);
//    JSONObject conn = new JSONObject();
//    conn.put("drone", drone.getMavClient().isConnected());
//    conn.put("port", serialConnection.getPortName());
//    conn.put("baud-rate", serialConnection.getBaud());
//    object.put("connection",conn);
//    object.put("addresses", ips);
//    object.put("connected-users", connectedUsers);
//    return object.toMap();
  }

}
