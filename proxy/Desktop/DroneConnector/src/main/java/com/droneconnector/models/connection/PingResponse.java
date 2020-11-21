package com.droneconnector.models.connection;

import com.droneconnector.models.StandardResponse;

import java.util.List;
import java.util.Set;

public class PingResponse extends StandardResponse {

  private String version;
  private String uptime;
  private Connection connection;
  private List<String> addresses;
  private Set<String> connectedUsers;

  public PingResponse(boolean result) {
    super(result);
  }

  public void setVersion(String version) {
    this.version = version;
  }

  public String getVersion() {
    return version;
  }

  public void setUptime(String uptime) {
    this.uptime = uptime;
  }

  public String getUptime() {
    return uptime;
  }

  public void setConnection(Connection connection) {
    this.connection = connection;
  }

  public Connection getConnection() {
    return connection;
  }

  public void setAddresses(List<String> addresses) {
    this.addresses = addresses;
  }

  public List<String> getAddresses() {
    return addresses;
  }

  public void setConnectedUsers(Set<String> connectedUsers) {
    this.connectedUsers = connectedUsers;
  }

  public Set<String> getConnectedUsers() {
    return connectedUsers;
  }

  public static class Connection {
    private boolean drone;
    private String port;
    private Integer baud;

    public void setDrone(boolean drone) {
      this.drone = drone;
    }

    public boolean getDrone() {
      return drone;
    }

    public void setPort(String port) {
      this.port = port;
    }

    public String getPort() {
      return port;
    }

    public void setBaud(Integer baud) {
      this.baud = baud;
    }

    public Integer getBaud() {
      return baud;
    }
  }
}
