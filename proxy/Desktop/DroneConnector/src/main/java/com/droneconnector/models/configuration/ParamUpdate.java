package com.droneconnector.models.configuration;

public class ParamUpdate {

  private String name;
  private Number value;

  public ParamUpdate() {
  }

  public ParamUpdate(String name, Number value) {
    this.name = name;
    this.value = value;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Object getValue() {
    return value;
  }

  public void setValue(Number value) {
    this.value = value;
  }

  @Override
  public String toString() {
    return "ParamUpdate{" +
      "name='" + name + '\'' +
      ", value=" + value +
      '}';
  }
}
