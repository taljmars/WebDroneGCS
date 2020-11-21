package com.droneconnector.model;

public class ConnectResponse extends ExtendedStandardResponse<String> {

  private Info connection;

  public ConnectResponse(boolean result) {
    super(result);
  }

  public void setConnection(Info connection) {
    this.connection = connection;
  }

  public Info getConnection() {
    return connection;
  }

  public static class Info {
    private String name;
    private Integer baud;

    public void setName(String name) {
      this.name = name;
    }

    public String getName() {
      return name;
    }

    public void setBaud(Integer baud) {
      this.baud = baud;
    }

    public Integer getBaud() {
      return baud;
    }
  }
}
