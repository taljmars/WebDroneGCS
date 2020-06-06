package com.droneconnector.model;

import com.dronegcs.mavlink.is.drone.Drone;
import com.dronegcs.mavlink.is.drone.Preferences;
import com.dronegcs.mavlink.is.drone.parameters.Parameter;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmCommands;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmModes;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmTuning;

import java.util.List;

import static com.dronegcs.mavlink.is.protocol.msg_metadata.ApmModes.getMode;


public class Modes {

  class Mode {
    ApmModes mode;
    boolean simple;
    boolean superSimple;

    public Mode(ApmModes mode, boolean simple, boolean superSimple) {
      this.mode = mode;
      this.simple = simple;
      this.superSimple = superSimple;
    }
  }

  class Tune {
    ApmTuning tune;
    double min;
    double max;

    public Tune(ApmTuning tune, double min, double max) {
      this.tune = tune;
      this.min = min;
      this.max = max;
    }
  }

  private static final String FLTMODE_FORMAT = "FLTMODE%d"; // Example: FLTMODE1
  private static final String CH_FORMAT = "CH%d_OPT"; // Example: CHA7_OPT
  private static final String SIMPLE_MODE = "SIMPLE";
  private static final String SUPER_SIMPLE_MODE = "SUPER_SIMPLE";
  private static final String TUNE = "TUNE";
  private static final String TUNE_HIGH = "TUNE_HIGH";
  private static final String TUNE_LOW = "TUNE_LOW";

  private Mode fltMode1;
  private Mode fltMode2;
  private Mode fltMode3;
  private Mode fltMode4;
  private Mode fltMode5;
  private Mode fltMode6;

  private Tune ch6;

  private ApmCommands ch7;
  private ApmCommands ch8;

  public Modes() {
  }

  public Modes(Drone drone) {
    Parameter tuneLow = drone.getParameters().getParameter(TUNE_LOW);
    Parameter tuneHigh = drone.getParameters().getParameter(TUNE_HIGH);
    Parameter s = drone.getParameters().getParameter(SIMPLE_MODE);
    Parameter ss = drone.getParameters().getParameter(SUPER_SIMPLE_MODE);
    Parameter p = null;
    int i = 0;

    i++;
    p = drone.getParameters().getParameter(String.format(FLTMODE_FORMAT, i));
    this.fltMode1 = new Mode(getMode(p.getValue().intValue(), drone.getType().getDroneType()), isSimplesModes(s.getValue().byteValue(), i), isSimplesModes(ss.getValue().byteValue(), i));

    i++;
    p = drone.getParameters().getParameter(String.format(FLTMODE_FORMAT, i));
    this.fltMode2 = new Mode(getMode(p.getValue().intValue(), drone.getType().getDroneType()), isSimplesModes(s.getValue().byteValue(), i), isSimplesModes(ss.getValue().byteValue(), i));

    i++;
    p = drone.getParameters().getParameter(String.format(FLTMODE_FORMAT, i));
    this.fltMode3 = new Mode(getMode(p.getValue().intValue(), drone.getType().getDroneType()), isSimplesModes(s.getValue().byteValue(), i), isSimplesModes(ss.getValue().byteValue(), i));

    i++;
    p = drone.getParameters().getParameter(String.format(FLTMODE_FORMAT, i));
    this.fltMode4 = new Mode(getMode(p.getValue().intValue(), drone.getType().getDroneType()), isSimplesModes(s.getValue().byteValue(), i), isSimplesModes(ss.getValue().byteValue(), i));

    i++;
    p = drone.getParameters().getParameter(String.format(FLTMODE_FORMAT, i));
    this.fltMode5 = new Mode(getMode(p.getValue().intValue(), drone.getType().getDroneType()), isSimplesModes(s.getValue().byteValue(), i), isSimplesModes(ss.getValue().byteValue(), i));

    i++;
    p = drone.getParameters().getParameter(String.format(FLTMODE_FORMAT, i));
    this.fltMode6 = new Mode(getMode(p.getValue().intValue(), drone.getType().getDroneType()), isSimplesModes(s.getValue().byteValue(), i), isSimplesModes(ss.getValue().byteValue(), i));

    p = drone.getParameters().getParameter(TUNE);
    this.ch6 = new Tune(ApmTuning.getTune(p.getValue().intValue()), tuneLow.getValue().doubleValue(), tuneHigh.getValue().doubleValue());

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

  private boolean isSimplesModes(Byte modeBitMap, int flightModeId) {
//    flightModeId should be : 1 - 6
    int placer = 0x1 << (flightModeId - 1);
    return (flightModeId & placer) != 0;
  }

  public Tune getCh6() {
    return ch6;
  }

  public void setCh6(Tune ch6) {
    this.ch6 = ch6;
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
      ", ch6=" + ch6 +
      ", ch7=" + ch7 +
      ", ch8=" + ch8 +
      '}';
  }
}
