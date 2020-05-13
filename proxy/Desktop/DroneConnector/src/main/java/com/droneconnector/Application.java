package com.droneconnector;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.InetAddress;
import java.net.UnknownHostException;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
      SpringApplication.run(Application.class);
      InetAddress ip;
      String hostname;
      try {
        ip = InetAddress.getLocalHost();
        hostname = ip.getHostName();
        System.out.println("Your current IP address : " + ip);
        System.out.println("Your current Hostname : " + hostname);

      } catch (UnknownHostException e) {

        e.printStackTrace();
      }
    }
}
