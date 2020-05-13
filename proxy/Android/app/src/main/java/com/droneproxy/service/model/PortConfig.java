package com.droneproxy.service.model;

public class PortConfig {

    public static final Integer DEFAULT_BAUD = 115200;
//    public static final Integer DEFAULT_BAUD = 57600;

    private String name;
    private Integer baud = DEFAULT_BAUD;

    public PortConfig() {
    }

    public PortConfig(String name) {
        this(name, DEFAULT_BAUD);
    }

    public PortConfig(String name, Integer baud) {
        this.name = name;
        this.baud = baud;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBaud() {
        return baud;
    }

    public void setBaud(Integer baud) {
        this.baud = baud;
    }
}
