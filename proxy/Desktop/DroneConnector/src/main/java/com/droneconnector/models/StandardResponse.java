package com.droneconnector.models;

public class StandardResponse {

  public boolean result = true;

  public StandardResponse(boolean result) {
    this.result = result;
  }

  public boolean isResult() {
    return result;
  }

  public void setResult(boolean result) {
    this.result = result;
  }
}
