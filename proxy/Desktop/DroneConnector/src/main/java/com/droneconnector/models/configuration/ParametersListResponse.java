package com.droneconnector.models.configuration;

import com.droneconnector.models.StandardResponse;
import com.dronegcs.mavlink.is.drone.parameters.Parameter;

import java.util.List;

public class ParametersListResponse extends StandardResponse {

  private boolean online;
  private List<Parameter> parameters;

  public ParametersListResponse(boolean result) {
    super(result);
  }

  public void setOnline(boolean online) {
    this.online = online;
  }

  public boolean getOnline() {
    return online;
  }

  public void setParameters(List<Parameter> parameters) {
    this.parameters = parameters;
  }

  public List<Parameter> getParameters() {
    return parameters;
  }
}
