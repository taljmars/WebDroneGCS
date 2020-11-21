package com.droneconnector.models.configuration;

import com.dronegcs.mavlink.is.drone.Drone;
import com.dronegcs.mavlink.is.drone.parameters.Parameter;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmCommands;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmModes;
import com.dronegcs.mavlink.is.protocol.msg_metadata.ApmTuning;

import java.util.Arrays;
import java.util.List;

import static com.dronegcs.mavlink.is.protocol.msg_metadata.ApmModes.getMode;


public class Modes {

  class Mode {
    ApmModes mode;
    boolean simple;
    boolean superSimple;

    public Mode() {
    }

    public Mode(ApmModes mode, boolean simple, boolean superSimple) {
      this.mode = mode;
      this.simple = simple;
      this.superSimple = superSimple;
    }

    public ApmModes getMode() {
      return mode;
    }

    public void setMode(ApmModes mode) {
      this.mode = mode;
    }

    public boolean isSimple() {
      return simple;
    }

    public void setSimple(boolean simple) {
      this.simple = simple;
    }

    public boolean isSuperSimple() {
      return superSimple;
    }

    public void setSuperSimple(boolean superSimple) {
      this.superSimple = superSimple;
    }

    @Override
    public String toString() {
      return "Mode{" +
        "mode=" + mode +
        ", simple=" + simple +
        ", superSimple=" + superSimple +
        '}';
    }
  }

  class Tune {
    ApmTuning tune;
    double min;
    double max;

    public Tune() {
    }

    public Tune(ApmTuning tune, double min, double max) {
      this.tune = tune;
      this.min = min;
      this.max = max;
    }

    public ApmTuning getTune() {
      return tune;
    }

    public void setTune(ApmTuning tune) {
      this.tune = tune;
    }

    public double getMin() {
      return min;
    }

    public void setMin(double min) {
      this.min = min;
    }

    public double getMax() {
      return max;
    }

    public void setMax(double max) {
      this.max = max;
    }

    @Override
    public String toString() {
      return "Tune{" +
        "tune=" + tune +
        ", min=" + min +
        ", max=" + max +
        '}';
    }
  }

  class Command {
    ApmCommands cmd;

    public Command() {
    }

    public Command(ApmCommands cmd) {
      this.cmd = cmd;
    }

    public ApmCommands getCmd() {
      return cmd;
    }

    public void setCmd(ApmCommands cmd) {
      this.cmd = cmd;
    }

    @Override
    public String toString() {
      return "Command{" +
        "cmd=" + cmd +
        '}';
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

  private Command ch7;
  private Command ch8;

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
    this.ch7 = new Command(ApmCommands.getCommand(p.getValue().intValue()));

    p = drone.getParameters().getParameter(String.format(CH_FORMAT, 8));
    this.ch8 = new Command(ApmCommands.getCommand(p.getValue().intValue()));
  }

  public void toDrone(Drone drone) {
    Parameter p = null;
    int simple = 0;
    int superSimple = 0;

    List<Mode> modes = Arrays.asList(fltMode1, fltMode2, fltMode3, fltMode4, fltMode5, fltMode6);

    for (int i = 1 ; i <= modes.size() ; i++) {
      p = drone.getParameters().getParameter(String.format(FLTMODE_FORMAT, i));
      p.setValue(modes.get(i-1).mode.getNumber());
      drone.getParameters().sendParameter(p);
      simple = simple & ((modes.get(i-1).simple ? 0x1 : 0x0) << (i - 1));
      superSimple = superSimple & ((modes.get(i-1).superSimple ? 0x1 : 0x0) << (i - 1));
    }

    Parameter s = drone.getParameters().getParameter(SIMPLE_MODE);
    s.setValue(simple);
    drone.getParameters().sendParameter(s);

    Parameter ss = drone.getParameters().getParameter(SUPER_SIMPLE_MODE);
    ss.setValue(superSimple);
    drone.getParameters().sendParameter(ss);

    Parameter tuneLow = drone.getParameters().getParameter(TUNE_LOW);
    tuneLow.setValue(this.ch6.min);
    drone.getParameters().sendParameter(tuneLow);

    Parameter tuneHigh = drone.getParameters().getParameter(TUNE_HIGH);
    tuneHigh.setValue(this.ch6.max);
    drone.getParameters().sendParameter(tuneHigh);

    p = drone.getParameters().getParameter(TUNE);
    p.setValue(this.ch6.tune.getNumber());
    drone.getParameters().sendParameter(p);

    p = drone.getParameters().getParameter(String.format(CH_FORMAT, 7));
    p.setValue(this.ch7.cmd.getNumber());
    drone.getParameters().sendParameter(p);

    p = drone.getParameters().getParameter(String.format(CH_FORMAT, 8));
    p.setValue(this.ch8.cmd.getNumber());
    drone.getParameters().sendParameter(p);
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

  public Command getCh7() {
    return ch7;
  }

  public void setCh7(Command ch7) {
    this.ch7 = ch7;
  }

  public Command getCh8() {
    return ch8;
  }

  public void setCh8(Command ch8) {
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
