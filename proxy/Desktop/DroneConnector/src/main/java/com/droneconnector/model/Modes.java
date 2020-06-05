package com.droneconnector.model;

import com.dronegcs.mavlink.is.drone.Preferences;

public class Modes {

  private int alt;
  private int pos;
  private int modeStatus;
  private int rc;
  private int sensors;
  private int controller;

  public Modes() {
  }

  public Modes(Preferences.Rates rates) {
    this.modeStatus = rates.extendedStatus;
    this.alt = rates.extra1;
    this.alt = rates.extra2;
    this.sensors = rates.extra3;
    this.pos = rates.position;
    this.rc = rates.rcChannels;
    this.sensors = rates.rawSensors;
    this.controller = rates.rawController;
  }

  public int getAlt() {
    return alt;
  }

  public void setAlt(int alt) {
    this.alt = alt;
  }

  public int getPos() {
    return pos;
  }

  public void setPos(int pos) {
    this.pos = pos;
  }

  public int getModeStatus() {
    return modeStatus;
  }

  public void setModeStatus(int modeStatus) {
    this.modeStatus = modeStatus;
  }

  public int getRc() {
    return rc;
  }

  public void setRc(int rc) {
    this.rc = rc;
  }

  public int getSensors() {
    return sensors;
  }

  public void setSensors(int sensors) {
    this.sensors = sensors;
  }

  public int getController() {
    return controller;
  }

  public void setController(int controller) {
    this.controller = controller;
  }

  public Preferences.Rates toRates() {
    return new Preferences.Rates(modeStatus, alt, alt, sensors, pos, rc, sensors, controller);
  }

  @Override
  public String toString() {
    return "StreamRates{" +
      "alt='" + alt + '\'' +
      ", pos='" + pos + '\'' +
      ", modeStatus='" + modeStatus + '\'' +
      ", rc='" + rc + '\'' +
      ", sensors='" + sensors + '\'' +
      ", controller='" + controller + '\'' +
      '}';
  }
}
