package com.droneconnector.events;

import com.droneconnector.controller.RestApiController;
import com.droneconnector.controller.WebSocketController;
import com.dronegcs.mavlink.is.drone.Drone;
import com.dronegcs.mavlink.is.drone.DroneInterfaces;
import com.dronegcs.mavlink.is.drone.calibration.CalibrateGyroLevel;
import com.dronegcs.mavlink.is.drone.calibration.CalibrateGyroOrientation;
import com.dronegcs.mavlink.is.drone.parameters.Parameter;
import com.dronegcs.mavlink.is.protocol.msgbuilder.WaypointManager;
import com.generic_tools.devices.SerialConnection;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.annotation.PostConstruct;
import java.util.List;

@Controller
public class EventCenter implements DroneInterfaces.OnDroneListener, DroneInterfaces.OnWaypointManagerListener, DroneInterfaces.OnParameterManagerListener {

  @Autowired
  private Drone drone;

  @Autowired
  private CalibrateGyroLevel calibrateGyroLevel;

  @Autowired
  private CalibrateGyroOrientation calibrateGyroOrientation;

  @Autowired
  private SerialConnection serialConnection;

  @Autowired
  private WebSocketController webSocketController;

  @Autowired
  private RestApiController restApiController;

  @PostConstruct
  public void init() {
    drone.addDroneListener(this);
    drone.getParameters().addParameterListener(this);
    drone.getWaypointManager().addWaypointManagerListener(this);
  }

  @Override
  public void onDroneEvent(DroneInterfaces.DroneEventsType droneEventsType, Drone drone) {
    JSONObject object = new JSONObject();
    JSONObject payload = new JSONObject();
    switch (droneEventsType) {
      case GCS_LOCATION:
        break;
      case ORIENTATION:
        payload.put("pitch", drone.getOrientation().getPitch());
        payload.put("roll", drone.getOrientation().getRoll());
        payload.put("yaw", drone.getOrientation().getYaw());
        break;
      case SPEED:
        payload.put("airspeed", drone.getSpeed().getAirSpeed().valueInMetersPerSecond());
        break;
      case BATTERY:
        payload.put("remain", drone.getBattery().getBattRemain());
        break;
      case GUIDEDPOINT:
        break;
      case NAVIGATION:
        payload.put("bearing", drone.getNavigation().getNavBearing());
        payload.put("pitch", drone.getNavigation().getNavPitch());
        payload.put("roll", drone.getNavigation().getNavRoll());
        break;
      case ATTITUDE:
        break;
      case RADIO:
        payload.put("signal", drone.getRadio().getSignalStrength());
        break;
      case RC_IN:
        for (int i = 0 ; i < drone.getRC().in.length ; i++)
          payload.put(i + "", drone.getRC().in[i]);
        break;
      case RC_OUT:
        for (int i = 0 ; i < drone.getRC().out.length ; i++)
          payload.put(i + "", drone.getRC().out[i]);
        break;
      case ARMING:
        break;
      case AUTOPILOT_WARNING:
        payload.put("warning", drone.getState().getWarning());
        break;
      case MODE:
        payload.put("name", drone.getState().getMode().getName());
        break;
      case STATE:
        payload.put("armed", drone.getState().isArmed());
        payload.put("flying", drone.getState().isFlying());
        payload.put("ftime", drone.getState().getFlightTime());
        payload.put("warning", drone.getState().getWarning());
        payload.put("mode", drone.getState().getMode());
        break;
      case MISSION_UPDATE:
        break;
      case MISSION_RECEIVED:
        break;
      case TYPE:
        payload.put("drone", drone.getType().getDroneType());
        payload.put("iscopter", drone.getType().isCopter());
        break;
      case HOME:
        payload.put("dist", drone.getHome().getDroneDistanceToHome());
        break;
      case GPS:
        payload.put("alt", drone.getGps().getPosition().getAltitude());
        payload.put("x", drone.getGps().getPosition().getX());
        payload.put("y", drone.getGps().getPosition().getY());
        payload.put("lat", drone.getGps().getPosition().getLat());
        payload.put("lon", drone.getGps().getPosition().getLon());
        payload.put("fixtype", drone.getGps().getFixType());
        payload.put("sat", drone.getGps().getSatCount());
        break;
      case GPS_FIX:
        payload.put("fix", drone.getGps().getFixType());
        break;
      case GPS_COUNT:
        payload.put("sat", drone.getGps().getSatCount());
        break;
      case PARAMETER:
        break;
      case CALIBRATION_IMU:
//            String message = calibration.getMessage();
//            if (!calibration.isCalibrating())
//              this.drone.removeDroneListener(this);
//
//            Platform.runLater(() -> lblGyroStatus.setText(message));
//            step++;
//            break;
        payload.put("iscalibrate", calibrateGyroOrientation.isCalibrating());
        payload.put("message", "calibrateGyroOrientation.getMessage()");
        payload.put("stage", restApiController.increaseGyroCalibrateStep());
        break;
      case CALIBRATION_TIMEOUT:
        break;
      case HEARTBEAT_TIMEOUT:
        break;
      case HEARTBEAT_FIRST:
        break;
      case HEARTBEAT_RESTORED:
        break;
      case DISCONNECTED:
        break;
      case CONNECTED:
        break;
      case MISSION_SENT:
        break;
      case ARMING_STARTED:
        break;
      case INVALID_POLYGON:
        break;
      case MISSION_WP_UPDATE:
        break;
      case FOLLOW_START:
        break;
      case FOLLOW_STOP:
        break;
      case FOLLOW_UPDATE:
        break;
      case FOLLOW_CHANGE_TYPE:
        break;
      case WARNING_400FT_EXCEEDED:
        break;
      case WARNING_SIGNAL_WEAK:
        break;
      case FIRMWARE:
        payload.put("type", drone.getFirmwareType());
        payload.put("version", drone.getFirmwareVersion());
        break;
      case WARNING_NO_GPS:
        break;
      case MAGNETOMETER:
        payload.put("x", drone.getMagnetometer().getX());
        payload.put("y", drone.getMagnetometer().getY());
        payload.put("z", drone.getMagnetometer().getZ());
        break;
      case EXT_CALIB_MAGNETOMETER_START:
        if (drone.getMagnetometer().getOffsets().length == 0)
          return;
        payload.put("x", drone.getMagnetometer().getOffsets()[0]);
        payload.put("y", drone.getMagnetometer().getOffsets()[1]);
        payload.put("z", drone.getMagnetometer().getOffsets()[2]);
        break;
      case EXT_CALIB_MAGNETOMETER_PROGRESS:
        if (drone.getMagnetometer().getOffsets().length == 0)
          return;
        payload.put("x", drone.getCalibrateCompass().getCurrentCenter()[0]);
        payload.put("y", drone.getCalibrateCompass().getCurrentCenter()[1]);
        payload.put("z", drone.getCalibrateCompass().getCurrentCenter()[2]);
        break;
      case EXT_CALIB_MAGNETOMETER_FINISH:
        if (drone.getMagnetometer().getOffsets().length == 0)
          return;
        payload.put("x", drone.getMagnetometer().getOffsets()[0]);
        payload.put("y", drone.getMagnetometer().getOffsets()[1]);
        payload.put("z", drone.getMagnetometer().getOffsets()[2]);
        break;
      case EXT_CALIB_RC_START:
        payload.put("min", drone.getRC().getInMin());
        payload.put("max", drone.getRC().getInMax());
        break;
      case EXT_CALIB_RC_PROGRESS:
        if (drone.getMagnetometer().getOffsets().length == 0)
          return;
        payload.put("min", drone.getCalibrateRC().getCurrentMin());
        payload.put("max", drone.getCalibrateRC().getCurrentMax());
        break;
      case EXT_CALIB_RC_FINISH:
        payload.put("min", drone.getRC().getInMin());
        payload.put("max", drone.getRC().getInMax());
        break;
      case FOOTPRINT:
        break;
      case PERIMETER_RECEIVED:
        break;
      case LEFT_PERIMETER:
        break;
      case ENFORCING_PERIMETER:
        break;
      case TEXT_MESSEGE:
        payload.put("text", drone.getMessegeQueue().pop(this));
        break;
      case BEACON_BEEP:
        break;
      case BEACON_LOCK_START:
        break;
      case BEACON_LOCK_FINISH:
        break;
      case PROTOCOL_LEARNING:
        break;
      case PROTOCOL_IDENTIFIED:
        payload.put("version", drone.getMavClient().getMavlinkVersion());
        break;
    }
    object.put("id", droneEventsType.ordinal());
    object.put("name", droneEventsType.name());
    object.put("data", payload);
    webSocketController.broadcast(WebSocketController.Q_DRONE, object);
  }

  @Override
  public void onBeginWaypointEvent(WaypointManager.WaypointEvent_Type waypointEvent_type) {
//        webSocketController.broadcast(WebSocketController.Q_DRONE, waypointEvent_type.name());
  }

  @Override
  public void onWaypointEvent(WaypointManager.WaypointEvent_Type waypointEvent_type, int i, int i1) {
//        webSocketController.broadcast(WebSocketController.Q_DRONE, waypointEvent_type.name());
  }

  @Override
  public void onEndWaypointEvent(WaypointManager.WaypointEvent_Type waypointEvent_type) {
//        webSocketController.broadcast(WebSocketController.Q_DRONE, waypointEvent_type.name());
  }

  @Override
  public void onBeginReceivingParameters() {
    JSONObject object = new JSONObject();
    JSONObject payload = new JSONObject();
    object.put("id", 1000);
    object.put("name", "PARAMS_START");
    object.put("data", payload);
    webSocketController.broadcast(WebSocketController.Q_DRONE, object);
  }

  @Override
  public void onParameterReceived(Parameter parameter, int i, int i1) {
    JSONObject object = new JSONObject();
    JSONObject payload = new JSONObject();
    JSONObject param = new JSONObject();
    param.put("name", parameter.getName());
    param.put("value", parameter.getValue());
    payload.put("index", i);
    payload.put("amount", i1);
    payload.put("param", param);
    object.put("id", 1001);
    object.put("name", "PARAM_RECEIVE");
    object.put("data", payload);
    webSocketController.broadcast(WebSocketController.Q_DRONE, object);
  }

  @Override
  public void onEndReceivingParameters(List<Parameter> list) {
    JSONObject object = new JSONObject();
    JSONObject payload = new JSONObject();
    payload.put("list", list);
    object.put("id", 1002);
    object.put("name", "PARAMS_END");
    object.put("data", payload);
    webSocketController.broadcast(WebSocketController.Q_DRONE, object);
  }

}
