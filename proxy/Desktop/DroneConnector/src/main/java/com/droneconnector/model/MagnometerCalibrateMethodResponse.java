package com.droneconnector.model;

import com.dronegcs.mavlink.is.protocol.msg_metadata.enums.MAV_EXT_COMPASS_ORIENTATION;

public class MagnometerCalibrateMethodResponse extends StandardResponse {

  private MAV_EXT_COMPASS_ORIENTATION rotation;

  public MagnometerCalibrateMethodResponse(boolean result) {
    super(result);
  }


  public void setRotation(MAV_EXT_COMPASS_ORIENTATION rotation) {
    this.rotation = rotation;
  }

  public MAV_EXT_COMPASS_ORIENTATION getRotation() {
    return rotation;
  }
}
