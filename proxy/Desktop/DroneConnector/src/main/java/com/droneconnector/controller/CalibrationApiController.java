package com.droneconnector.controller;

import com.droneconnector.models.ConnectorException;
import com.droneconnector.models.ExtendedStandardResponse;
import com.droneconnector.models.calibration.SingleData;
import com.droneconnector.models.StandardResponse;
import com.droneconnector.models.calibration.MagnometerCalibrateMethodResponse;
import com.dronegcs.mavlink.is.drone.Drone;
import com.dronegcs.mavlink.is.drone.calibration.CalibrateCompass;
import com.dronegcs.mavlink.is.drone.calibration.CalibrateGyroLevel;
import com.dronegcs.mavlink.is.drone.calibration.CalibrateGyroOrientation;
import com.dronegcs.mavlink.is.drone.calibration.CalibrateRC;
import com.dronegcs.mavlink.is.drone.parameters.Parameter;
import com.dronegcs.mavlink.is.protocol.msg_metadata.enums.MAV_EXT_COMPASS_ORIENTATION;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = "/calibrations/")
@RestController
public class CalibrationApiController {

  @ExceptionHandler({ ConnectorException.class })
  public void handleException() {}

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

//  private JSONObject getResponseTemplate() {
//    JSONObject obj = new JSONObject();
//    obj.put(Constants.RESULT, true);
//    return obj;
//  }

  @PostConstruct
  private void init() {

  }

  @PostMapping("start-esc-calibration")
  public StandardResponse startEscCalibrate() {
    System.out.println("startEscCalibrate");
    Parameter parameter = drone.getParameters().getParameter("ESC_CALIBRATION");
    parameter.setValue(3);
    drone.getParameters().sendParameter(parameter);
//    JSONObject object = getResponseTemplate();
//    return object.toMap();
    return new StandardResponse(true);
  }

  @PostMapping("start-level-calibration")
  public StandardResponse startLevelCalibrate() {
    System.out.println("startLevelCalibrate");
    calibrateGyroLevel.start();
//    JSONObject object = getResponseTemplate();
//    return object.toMap();
    return new StandardResponse(true);
  }

  @PostMapping("start-gyro-calibration")
  public ExtendedStandardResponse<String> startGyroCalibrate() {
    System.out.println("startGyroCalibrate");
//    JSONObject object = getResponseTemplate();
    ExtendedStandardResponse<String> messageResponse = new ExtendedStandardResponse<String>(true);
    if (calibrateGyroOrientation.isCalibrating()) {
//      object.put(Constants.RESULT, false);
//      object.put(Constants.MESSAGE, "Calibration Already Started");
      messageResponse.setResult(false);
      messageResponse.setExtendedField("Calibration Already Started");
    }
    else {
      calibrateGyroOrientation.start();
      gyroCalibrateStep = 0;
    }
//    return object.toMap();
    return messageResponse;
  }

  private int gyroCalibrateStep = 0;

  @PostMapping("ack-gyro-calibration")
  public ExtendedStandardResponse<String> ackGyroCalibrate() {
    System.out.println("ackGyroCalibrate");
//    JSONObject object = getResponseTemplate();
    ExtendedStandardResponse<String> message = new ExtendedStandardResponse<String>(true);
    if (!calibrateGyroOrientation.isCalibrating()) {
      message.setResult(false);
      message.setExtendedField("Calibration Haven't Started");
//      object.put(Constants.RESULT, false);
//      object.put(Constants.MESSAGE, );
    }
    else {
      calibrateGyroOrientation.ack(gyroCalibrateStep);
    }
//    return object.toMap();
    return message;
  }

  public int increaseGyroCalibrateStep() {
    this.gyroCalibrateStep++;
    return this.gyroCalibrateStep;
  }

  @GetMapping("supported-compass-methods")
//  public Map startMagCalibrate(@RequestBody(required = false) int measurements) {
  public ExtendedStandardResponse<List<String>> getSupportedCompassMethods() {
    System.out.println("getSupportCompassMethods");
    Set<CalibrateCompass.CompassType> methods = calibrateCompass.getCompassFeatures();
//    for (CalibrateCompass.CompassType ct : calibrateCompass.getCompassFeatures()) {
//      ct.name();
//    }
//    JSONObject object = getResponseTemplate();
    ExtendedStandardResponse<List<String>> supportCompassMethods = new ExtendedStandardResponse<List<String>>(true);
    List x = Arrays.asList(calibrateCompass.getCompassFeatures());
    supportCompassMethods.setExtendedField(methods == null ? new ArrayList<String>() : x);
//    object.put("methods", methods == null ? new ArrayList<>() : calibrateCompass.getCompassFeatures());
//    return object.toMap();
    return supportCompassMethods;
  }

  @PostMapping("magnometer-calibration-method")
  public MagnometerCalibrateMethodResponse setMagnometerCalibrationMethod(@RequestBody SingleData payload) {
    System.out.println("setMagnometerCalibrateMethod");
    CalibrateCompass.CompassType type = CalibrateCompass.CompassType.valueOf(payload.getData());
    calibrateCompass.setType(type);
    MagnometerCalibrateMethodResponse magnometerCalibrateMethodResponse = new MagnometerCalibrateMethodResponse(true);
    magnometerCalibrateMethodResponse.setRotation(calibrateCompass.getOrientation());
//    JSONObject object = getResponseTemplate();
//    object.put("rotation", calibrateCompass.getOrientation());
//    return object.toMap();
    return magnometerCalibrateMethodResponse;
  }

  @PostMapping("magnometer-calibration-rotation")
  public StandardResponse setMagnometerCalibrationRotation(@RequestBody SingleData payload) {
    System.out.println("setMagnometerCalibrateRotation");
    MAV_EXT_COMPASS_ORIENTATION rt = MAV_EXT_COMPASS_ORIENTATION.valueOf(payload.getData());
    calibrateCompass.setOrientation(rt);
//    JSONObject object = getResponseTemplate();
//    return object.toMap();
    return new StandardResponse(true);
  }

  @PostMapping("start-magnometer-calibration")
//  public Map startMagCalibrate(@RequestBody(required = false) int measurements) {
  public StandardResponse startMagCalibrate() {
    System.out.println("startMagCalibrate");
//    System.out.println("startMagCalibrate " + measurements);
//    if (measurements != 0)
//      calibrateCompass.startCompassCalibration(measurements);
//    else
    calibrateCompass.start();
//    JSONObject object = getResponseTemplate();
//    return object.toMap();
    return new StandardResponse(true);
  }

  @PostMapping("stop-magnometer-calibration")
  public StandardResponse stopMagCalibrate() {
    System.out.println("stopMagCalibrate");
    calibrateCompass.stop();
//    JSONObject object = getResponseTemplate();
//    return object.toMap();
    return new StandardResponse(true);

  }

  @PostMapping("start-rc-calibration")
  public StandardResponse startRCCalibrate() {
    System.out.println("startRCCalibrate");
    calibrateRC.start();
//    JSONObject object = getResponseTemplate();
//    return object.toMap();
    return new StandardResponse(true);
  }

  @PostMapping("stop-rc-calibration")
  public StandardResponse stopRCCalibrate() {
    System.out.println("stopRCCalibrate");
    calibrateRC.stop();
//    JSONObject object = getResponseTemplate();
//    return object.toMap();
    return new StandardResponse(true);

  }

}
