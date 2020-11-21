package com.droneconnector.models.connection;

import com.droneconnector.models.StandardResponse;

public class InfoResponse extends StandardResponse {

  private String type;
  private Firmware firmware;
  private Protocol protocol;

  public InfoResponse(boolean result) {
    super(result);
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getType() {
    return type;
  }

  public void setFirmware(Firmware firmware) {
    this.firmware = firmware;
  }

  public Firmware getFirmware() {
    return firmware;
  }

  public void setProtocol(Protocol protocol) {
    this.protocol = protocol;
  }

  public Protocol getProtocol() {
    return protocol;
  }

  public static class Firmware {

    private String type;
    private String version;

    public void setType(String type) {
      this.type = type;
    }

    public String getType() {
      return type;
    }

    public void setVersion(String version) {
      this.version = version;
    }

    public String getVersion() {
      return version;
    }
  }

  public static class Protocol {

    private int gcsid;
    private String type;
    private int heartbeatInterval;
    private boolean refreshParametersOnConnect;

    public void setGcsid(int gcsid) {
      this.gcsid = gcsid;
    }

    public int getGcsid() {
      return gcsid;
    }

    public void setType(String type) {
      this.type = type;
    }

    public String getType() {
      return type;
    }

    public void setHeartbeatInterval(int heartbeatInterval) {
      this.heartbeatInterval = heartbeatInterval;
    }

    public int getHeartbeatInterval() {
      return heartbeatInterval;
    }

    public void setRefreshParametersOnConnect(boolean refreshParametersOnConnect) {
      this.refreshParametersOnConnect = refreshParametersOnConnect;
    }

    public boolean getRefreshParametersOnConnect() {
      return refreshParametersOnConnect;
    }
  }

}
