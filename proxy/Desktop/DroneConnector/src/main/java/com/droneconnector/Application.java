package com.droneconnector;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.InetAddress;
import java.net.UnknownHostException;

@SpringBootApplication
public class Application {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
    InetAddress ip;
    String hostname;
    try {
      int n = 80;

      ip = InetAddress.getLocalHost();
      String myIP = "Your current IP address : " + ip;
      String bufferMyIP = new String(new char[(n - myIP.length()) / 2]).replace("\0", " ");

      hostname = ip.getHostName();
      String myHostname = "Your current Hostname : " + hostname;
      String bufferMyHostname = new String(new char[(n - myHostname.length()) / 2]).replace("\0", " ");

      int len = Math.max((bufferMyIP + myIP + bufferMyIP).length(), (bufferMyHostname + myHostname + bufferMyHostname).length());
      System.out.println("\n\n");
      System.out.println(new String(new char[len + 2]).replace("\0", "*"));
      System.out.println("*" + new String(new char[len]).replace("\0", " ") + "*");

      System.out.print("*");
      System.out.print(bufferMyIP + myIP + bufferMyIP);
      System.out.println("*");

      System.out.print("*");
      System.out.print(bufferMyHostname + myHostname + bufferMyHostname);
      System.out.println("*");

      System.out.println("*" + new String(new char[len]).replace("\0", " ") + "*");
      System.out.println(new String(new char[len + 2]).replace("\0", "*"));
      System.out.println();
    }
    catch (UnknownHostException e) {
      e.printStackTrace();
    }
  }
}
