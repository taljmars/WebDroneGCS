package com.droneconnector.controller;

import com.droneconnector.model.PortConfig;
import com.dronegcs.mavlink.core.gcs.GCSHeartbeat;
import com.dronegcs.mavlink.is.connection.ConnectionStatistics;
import com.dronegcs.mavlink.is.connection.MavLinkConnectionStatisticsListener;
import com.dronegcs.mavlink.is.drone.Drone;
import com.generic_tools.devices.SerialConnection;
import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
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
    private JSONObject getResponseTemplate() {
        JSONObject obj = new JSONObject();
        obj.put(RESULT, true);
        return obj;
    }

    @PostConstruct
    private void init() {
        drone.getMavClient().addMavLinkConnectionStatisticsListener(this.getClass().getName(), this);
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

    @PostMapping("/connect")
    public Map connect(@RequestBody PortConfig portConfig) {
        JSONObject obj = getResponseTemplate();
        try {
            serialConnection.setBaud(portConfig.getBaud());
            serialConnection.setPortName(portConfig.getName());
//            boolean res = serialConnection.connect();
//            if (res)
//                webSocketController.broadcast(WebSocketController.Q_PORT, "Port " + portConfig.getName() + " Connected");

//            JSONObject obj = new JSONObject();
//            obj.put("result", true);
//            webSocketController.broadcast(WebSocketController.Q_DRONE, "Connecting to drone");

            drone.getMavClient().connect();
            System.out.println("Start HB");
            gcsHeartbeat.setActive(true);
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

    @GetMapping("/getParameters")
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
      object.put("uptime", "0 min");
      return object.toMap();
    }

}
