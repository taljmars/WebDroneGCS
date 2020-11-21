package com.droneconnector.controller;

import com.droneconnector.model.*;
import com.dronegcs.mavlink.is.drone.Drone;
import com.dronegcs.mavlink.is.drone.parameters.Parameter;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmCommands;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmModes;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmTuning;
import com.google.gson.Gson;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = "/configuration/")
@RestController
public class ConfigurationApiController {

  @ExceptionHandler({ ConnectorException.class })
  public void handleException() {}

  @Autowired
  private Drone drone;

//  private JSONObject getResponseTemplate() {
//    JSONObject obj = new JSONObject();
//    obj.put(Constants.RESULT, true);
//    return obj;
//  }

  @PostConstruct
  private void init() {
  }


  @GetMapping("/refreshParameters")
  public StandardResponse refreshParameters() {
    System.out.println("Sync Parameters");
    drone.getParameters().refreshParameters();
//    return getResponseTemplate().toMap();
    return new StandardResponse(true);
  }

  @PostMapping("/sendParameter")
  public StandardResponse sendParameter(@RequestBody ParamUpdate paramUpdate) {
    System.out.println("Send Parameter " + paramUpdate);
    Parameter parameter = drone.getParameters().getParameter(paramUpdate.getName());
    parameter.setValue((Number) paramUpdate.getValue());
    drone.getParameters().sendParameter(parameter);
//    return getResponseTemplate().toMap();
    return new StandardResponse(true);
  }

  @GetMapping("/getParametersList")
  public ParametersListResponse getOfflineParameters() {
    System.out.println("Get Offline Parameters");
//    JSONObject object = getResponseTemplate();
    ParametersListResponse parametersListResponse = new ParametersListResponse(true);
    if (drone.getMavClient().isConnected()) {
//      object.put("parameters", drone.getParameters().getParametersList());
//      object.put("online", true);
      parametersListResponse.setParameters(drone.getParameters().getParametersList());
      parametersListResponse.setOnline(true);
    }
    else {
//      object.put("parameters", drone.getParameters().getParametersMetadata());
//      object.put("online", false);
      parametersListResponse.setParameters(drone.getParameters().getParametersMetadata());
      parametersListResponse.setOnline(false);
    }
//    return object.toMap();
    return parametersListResponse;
  }

  @GetMapping("/fetchWaypoints")
  public StandardResponse fetchWaypoints() {
    System.out.println("Fetch Waypoints");
    drone.getWaypointManager().getWaypoints();
    return new StandardResponse(true);
//    return getResponseTemplate().toMap();
  }

  @PostMapping("/setStreamRates")
  public StandardResponse setStreamRates(@RequestBody StreamRates streamRates) {
    System.out.println("setStreamRates");
    System.out.println(streamRates.toString());
    drone.getPreferences().setRates(streamRates.toRates());
//    JSONObject object = getResponseTemplate();
//    return object.toMap();
    return new StandardResponse(true);
  }

  @GetMapping("/getStreamRates")
  public StreamRates getStreamRates() {
    System.out.println("getStreamRates");
//    String str = new Gson().toJson(new StreamRates(drone.getPreferences().getRates()), StreamRates.class);
//    JSONObject object = new JSONObject(str);
//    return object.toMap();
    return new StreamRates(drone.getPreferences().getRates());
  }

  @GetMapping("/getModesOptions")
  public ExtendedStandardResponse<List<ApmModes>> getModesOptions() {
    System.out.println("getModesOptions");
//    JSONObject object = getResponseTemplate();
    // Generate flight mode combo-boxs and keys
//    object.put("modes",ApmModes.getModeList(drone.getType().getDroneType()));
//    return object.toMap();
    ExtendedStandardResponse<List<ApmModes>> x = new ExtendedStandardResponse<List<ApmModes>>(true);
    x.setExtendedField(ApmModes.getModeList(drone.getType().getDroneType()));
    return x;
  }

  @GetMapping("/getCommandsOptions")
  public ExtendedStandardResponse<List<ApmCommands>> getCommandsOptions() {
    System.out.println("getCommandsOptions");
//    JSONObject object = getResponseTemplate();
//    // Generate command combo-boxs and keys
//    object.put("commands",ApmCommands.getCommandsList());
//    return object.toMap();
    ExtendedStandardResponse<List<ApmCommands>> x = new ExtendedStandardResponse<List<ApmCommands>>(true);
    x.setExtendedField(ApmCommands.getCommandsList());
    return x;
  }

  @GetMapping("/getTuneOptions")
  public ExtendedStandardResponse<List<ApmTuning>> getTuneOptions() {
    System.out.println("getTuneOptions");
//    JSONObject object = getResponseTemplate();
//    // Generate tunning combo-boxs and keys
//    object.put("tunes",ApmTuning.getTuningList());
//    return object.toMap();
    ExtendedStandardResponse<List<ApmTuning>> x = new ExtendedStandardResponse<List<ApmTuning>>(true);
    x.setExtendedField(ApmTuning.getTuningList());
    return x;
  }

  @GetMapping("/getModes")
  public Modes getModes() {
    System.out.println("getModes");
//    String str = new Gson().toJson(new Modes(drone), Modes.class);
//    JSONObject object = new JSONObject(str);
//    return object.toMap();
    return new Modes(drone);
  }

  @PostMapping("setModes")
  public StandardResponse setMode(@RequestBody Modes modes) {
    System.out.println("setModes");
    System.out.println(modes);
    modes.toDrone(drone);
//    JSONObject object = getResponseTemplate();
//    return object.toMap();
    return new StandardResponse(true);
  }

}
