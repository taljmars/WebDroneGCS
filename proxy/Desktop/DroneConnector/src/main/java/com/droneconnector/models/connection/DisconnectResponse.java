package com.droneconnector.models.connection;

import com.droneconnector.models.ExtendedStandardResponse;

public class DisconnectResponse extends ExtendedStandardResponse<String> {

  public DisconnectResponse(boolean result) {
    super(result);
  }
}
