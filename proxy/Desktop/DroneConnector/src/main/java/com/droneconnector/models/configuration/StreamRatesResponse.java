package com.droneconnector.models.configuration;

import com.dronegcs.mavlink.is.drone.Preferences;

public class StreamRatesResponse extends StreamRates {

  public StreamRatesResponse(Preferences.Rates rates) {
    super(rates);
  }

}
