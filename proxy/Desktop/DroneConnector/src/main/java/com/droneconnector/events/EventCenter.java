package com.droneconnector.events;

import com.droneconnector.controller.RestApiController;
import com.droneconnector.controller.WebSocketController;
import com.dronegcs.mavlink.is.drone.Drone;
import com.dronegcs.mavlink.is.drone.DroneInterfaces;
import com.dronegcs.mavlink.is.drone.calibration.CalibrateGyroLevel;
import com.dronegcs.mavlink.is.drone.calibration.CalibrateGyroOrientation;
import com.dronegcs.mavlink.is.drone.parameters.Parameter;
import com.dronegcs.mavlink.is.drone.variables.HeartBeat;
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
        payload.put("speed-air", drone.getSpeed().getAirSpeed().valueInMetersPerSecond());
        payload.put("speed-ground", drone.getSpeed().getGroundSpeed().valueInMetersPerSecond());
        payload.put("speed-max-air", drone.getSpeed().getMaxAirSpeed().valueInMetersPerSecond());
        payload.put("speed-target", drone.getSpeed().getTargetSpeed().valueInMetersPerSecond());
        payload.put("speed-vertical", drone.getSpeed().getVerticalSpeed().valueInMetersPerSecond());
        if (drone.getSpeed().getSpeedParameter() != null)
          payload.put("speed-wp-nav", drone.getSpeed().getSpeedParameter().valueInMetersPerSecond());
        break;
      case BATTERY:
        payload.put("bat-remain", drone.getBattery().getBattRemain());
        payload.put("bat-current", drone.getBattery().getBattCurrent());
        payload.put("bat-discharge", drone.getBattery().getBattDischarge());
        payload.put("bat-volt", drone.getBattery().getBattVolt());
        break;
      case GUIDEDPOINT:
        break;
      case NAVIGATION:
        payload.put("nav-bearing", drone.getNavigation().getNavBearing());
        payload.put("nav-pitch", drone.getNavigation().getNavPitch());
        payload.put("nav-roll", drone.getNavigation().getNavRoll());
        break;
      case ATTITUDE:
        payload.put("altitude-curr", drone.getAltitude().getAltitude());
        payload.put("altitude-max", drone.getAltitude().getMaxAltitude());
        payload.put("altitude-target", drone.getAltitude().getTargetAltitude());
        payload.put("altitude-is-collision-imminent", drone.getAltitude().isCollisionImminent());
        break;
      case RADIO:
        payload.put("radio-signal", drone.getRadio().getSignalStrength());
        payload.put("radio-fade-margin", drone.getRadio().getFadeMargin());
        payload.put("radio-fixed", drone.getRadio().getFixed());
        payload.put("radio-nois", drone.getRadio().getNoise());
        payload.put("radio-rem-fade-margin", drone.getRadio().getRemFadeMargin());
        payload.put("radio-rem-noise", drone.getRadio().getRemNoise());
        payload.put("radio-rem-rssi", drone.getRadio().getRemRssi());
        payload.put("radio-rssi", drone.getRadio().getRssi());
        payload.put("radio-rx-errors", drone.getRadio().getRxErrors());
        payload.put("radio-tx-buff", drone.getRadio().getTxBuf());
        break;
      case RC_IN:
        for (int i = 0 ; i < drone.getRC().in.length ; i++)
          payload.put("rc-in-" + i, drone.getRC().in[i]);
        break;
      case RC_OUT:
        for (int i = 0 ; i < drone.getRC().out.length ; i++)
          payload.put("rc-out-" + i, drone.getRC().out[i]);
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
        payload.put("flight-time", drone.getState().getFlightTime());
        payload.put("warning", drone.getState().getWarning());
        payload.put("mode", drone.getState().getMode());
        break;
      case MISSION_UPDATE:
        break;
      case MISSION_RECEIVED:
        break;
      case TYPE:
        payload.put("type-drone", drone.getType().getDroneType());
        payload.put("type-iscopter", drone.getType().isCopter());
        payload.put("type-firmware", drone.getType().getFirmwareType());
        payload.put("type-version", drone.getType().getFirmwareVersion());
        break;
      case HOME:
        payload.put("home-dist", drone.getHome().getDroneDistanceToHome());
        break;
      case GPS:
        payload.put("gps-alt", drone.getGps().getPosition().getAltitude());
        payload.put("gps-x", drone.getGps().getPosition().getX());
        payload.put("gps-y", drone.getGps().getPosition().getY());
        payload.put("gps-lat", drone.getGps().getPosition().getLat());
        payload.put("gps-lon", drone.getGps().getPosition().getLon());
        payload.put("gps-fixtype", drone.getGps().getFixType());
        payload.put("gps-sat", drone.getGps().getSatCount());
        break;
      case GPS_FIX:
        payload.put("gps-fix", drone.getGps().getFixType());
        break;
      case GPS_COUNT:
        payload.put("gps-sat", drone.getGps().getSatCount());
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
        payload.put("message", "Heartbeat timed out");
        payload.put("retries", HeartBeat.currTimeoutRetries);
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
        payload.put("firmware-type", drone.getFirmwareType());
        payload.put("firmware-version", drone.getFirmwareVersion());
        break;
      case WARNING_NO_GPS:
        break;
      case MAGNETOMETER:
        payload.put("mag-x", drone.getMagnetometer().getXmag());
        payload.put("mag-y", drone.getMagnetometer().getYmag());
        payload.put("mag-z", drone.getMagnetometer().getZmag());
        payload.put("acc-x", drone.getMagnetometer().getXacc());
        payload.put("acc-y", drone.getMagnetometer().getYacc());
        payload.put("acc-z", drone.getMagnetometer().getZacc());
        payload.put("gyro-x", drone.getMagnetometer().getXgyro());
        payload.put("gyro-y", drone.getMagnetometer().getYgyro());
        payload.put("gyro-z", drone.getMagnetometer().getZgyro());
        break;
      case EXT_CALIB_MAGNETOMETER_START:
        if (drone.getMagnetometer().getOffsets().length == 0)
          return;
        payload.put("mag-x", drone.getMagnetometer().getOffsets()[0]);
        payload.put("mag-y", drone.getMagnetometer().getOffsets()[1]);
        payload.put("mag-z", drone.getMagnetometer().getOffsets()[2]);
        break;
      case EXT_CALIB_MAGNETOMETER_PROGRESS:
        if (drone.getMagnetometer().getOffsets().length == 0)
          return;
        payload.put("mag-x", drone.getCalibrateCompass().getCurrentCenter()[0]);
        payload.put("mag-y", drone.getCalibrateCompass().getCurrentCenter()[1]);
        payload.put("mag-z", drone.getCalibrateCompass().getCurrentCenter()[2]);
        break;
      case EXT_CALIB_MAGNETOMETER_FINISH:
        if (drone.getMagnetometer().getOffsets().length == 0)
          return;
        payload.put("mag-x", drone.getMagnetometer().getOffsets()[0]);
        payload.put("mag-y", drone.getMagnetometer().getOffsets()[1]);
        payload.put("mag-z", drone.getMagnetometer().getOffsets()[2]);
        break;
      case EXT_CALIB_RC_START:
        payload.put("rc-in-min", drone.getRC().getInMin());
        payload.put("rc-in-max", drone.getRC().getInMax());
        break;
      case EXT_CALIB_RC_PROGRESS:
        if (drone.getMagnetometer().getOffsets().length == 0)
          return;
        payload.put("rc-in-min", drone.getCalibrateRC().getCurrentMin());
        payload.put("rc-in-max", drone.getCalibrateRC().getCurrentMax());
        break;
      case EXT_CALIB_RC_FINISH:
        payload.put("rc-in-min", drone.getRC().getInMin());
        payload.put("rc-in-max", drone.getRC().getInMax());
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
        drone.getParameters().refreshParameters();
        payload.put("protocol-version", drone.getMavClient().getMavlinkVersion());
        break;
    }
    object.put("id", droneEventsType.ordinal());
    object.put("name", droneEventsType.name());
    object.put("data", payload);
    object.put("timestamp", ((int) System.currentTimeMillis()/1000));
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
