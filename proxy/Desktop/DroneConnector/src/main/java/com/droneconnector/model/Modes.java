package com.droneconnector.model;

import com.dronegcs.mavlink.is.drone.Drone;
import com.dronegcs.mavlink.is.drone.Preferences;
import com.dronegcs.mavlink.is.drone.parameters.Parameter;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmCommands;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmModes;

import static com.dronegcs.mavlink.is.protocol.msg_metadata.ApmModes.getMode;


public class Modes {

  class Mode {
    ApmModes mode;
    boolean simple;

    public Mode(ApmModes mode, boolean simple) {
      this.mode = mode;
      this.simple = simple;
    }
  }

  private static final String FLTMODE_FORMAT = "FLTMODE%d"; // Example: FLTMODE1
  private static final String CH_FORMAT = "CH%d_OPT"; // Example: CHA7_OPT

  private Mode fltMode1;
  private Mode fltMode2;
  private Mode fltMode3;
  private Mode fltMode4;
  private Mode fltMode5;
  private Mode fltMode6;

  private ApmCommands ch7;
  private ApmCommands ch8;

  public Modes() {
  }

  public Modes(Drone drone) {
    Parameter p = null;
    p = drone.getParameters().getParameter(String.format(FLTMODE_FORMAT, 1));
    this.fltMode1 = new Mode(getMode(p.getValue().intValue(), drone.getType().getDroneType()), false);

    p = drone.getParameters().getParameter(String.format(FLTMODE_FORMAT, 2));
    this.fltMode2 = new Mode(getMode(p.getValue().intValue(), drone.getType().getDroneType()), false);

    p = drone.getParameters().getParameter(String.format(FLTMODE_FORMAT, 3));
    this.fltMode3 = new Mode(getMode(p.getValue().intValue(), drone.getType().getDroneType()), false);

    p = drone.getParameters().getParameter(String.format(FLTMODE_FORMAT, 4));
    this.fltMode4 = new Mode(getMode(p.getValue().intValue(), drone.getType().getDroneType()), false);

    p = drone.getParameters().getParameter(String.format(FLTMODE_FORMAT, 5));
    this.fltMode5 = new Mode(getMode(p.getValue().intValue(), drone.getType().getDroneType()), false);

    p = drone.getParameters().getParameter(String.format(FLTMODE_FORMAT, 6));
    this.fltMode6 = new Mode(getMode(p.getValue().intValue(), drone.getType().getDroneType()), false);

    p = drone.getParameters().getParameter(String.format(CH_FORMAT, 7));
    this.ch7 = ApmCommands.getCommand(p.getValue().intValue());

    p = drone.getParameters().getParameter(String.format(CH_FORMAT, 8));
    this.ch8 = ApmCommands.getCommand(p.getValue().intValue());
  }

  public Mode getFltMode1() {
    return fltMode1;
  }

  public void setFltMode1(Mode fltMode1) {
    this.fltMode1 = fltMode1;
  }

  public Mode getFltMode2() {
    return fltMode2;
  }

  public void setFltMode2(Mode fltMode2) {
    this.fltMode2 = fltMode2;
  }

  public Mode getFltMode3() {
    return fltMode3;
  }

  public void setFltMode3(Mode fltMode3) {
    this.fltMode3 = fltMode3;
  }

  public Mode getFltMode4() {
    return fltMode4;
  }

  public void setFltMode4(Mode fltMode4) {
    this.fltMode4 = fltMode4;
  }

  public Mode getFltMode5() {
    return fltMode5;
  }

  public void setFltMode5(Mode fltMode5) {
    this.fltMode5 = fltMode5;
  }

  public Mode getFltMode6() {
    return fltMode6;
  }

  public void setFltMode6(Mode fltMode6) {
    this.fltMode6 = fltMode6;
  }

  public ApmCommands getCh7() {
    return ch7;
  }

  public void setCh7(ApmCommands ch7) {
    this.ch7 = ch7;
  }

  public ApmCommands getCh8() {
    return ch8;
  }

  public void setCh8(ApmCommands ch8) {
    this.ch8 = ch8;
  }

  @Override
  public String toString() {
    return "Modes{" +
      "fltMode1=" + fltMode1 +
      ", fltMode2=" + fltMode2 +
      ", fltMode3=" + fltMode3 +
      ", fltMode4=" + fltMode4 +
      ", fltMode5=" + fltMode5 +
      ", fltMode6=" + fltMode6 +
      ", ch7=" + ch7 +
      ", ch8=" + ch8 +
      '}';
  }
}
