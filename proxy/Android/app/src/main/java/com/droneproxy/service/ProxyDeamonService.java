package com.droneproxy.service;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.os.Messenger;
import android.util.Log;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class ProxyDeamonService extends Service {

  private final IBinder mBinder = new MyBinder(new Messenger(new ServiceHandler()));
  private List<String> resultList = new ArrayList<String>();
  private int counter = 1;

//  final Messenger messenger = new Messenger(new ServiceHandler());

  class ServiceHandler extends Handler {
    @Override
    public void handleMessage(Message msg) {
      switch (msg.what) {
        default:
          super.handleMessage(msg);
          addResultValues(msg.getData().get("key").toString());
      }
    }
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    addResultValues("start");
    Log.e("talma " + ProxyDeamonService.class.getName(), "onStartCommand");
    return Service.START_NOT_STICKY;
  }

  @Override
  public IBinder onBind(Intent intent) {
    addResultValues("bind");
    return mBinder;
//    return messenger.getBinder();

  }

public class MyBinder extends Binder {

  private final Messenger messenger;
  public MyBinder(Messenger messenger) {
    super();
    this.messenger = messenger;
  }

  public ProxyDeamonService getService() {
    return ProxyDeamonService.this;
  }

  public Messenger getMessenger() {
    return messenger;
  }
}

  public List<String> getWordList() {
    return resultList;
  }

  private void addResultValues(String a) {
    resultList.add(a);
  }
}
