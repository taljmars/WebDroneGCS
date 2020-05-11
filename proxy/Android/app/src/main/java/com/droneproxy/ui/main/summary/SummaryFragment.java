package com.droneproxy.ui.main.summary;

import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.os.Message;
import android.os.Messenger;
import android.os.RemoteException;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModel;

import com.droneproxy.R;
import com.droneproxy.service.ProxyDeamonService;

import java.util.ArrayList;
import java.util.List;

/**
 * A placeholder fragment containing a simple view.
 */
public class SummaryFragment extends Fragment implements ServiceConnection, View.OnClickListener {

  private static final String ARG_SECTION_NUMBER = "section_number";

  private ViewModel summaryViewModel;

//  private static SummaryFragment instance = null;

  public static Fragment newInstance(int index) {
//    if (instance == null) {
      SummaryFragment fragment = new SummaryFragment();
    Bundle bundle = new Bundle();
    bundle.putInt(ARG_SECTION_NUMBER, index);
    fragment.setArguments(bundle);
//      instance = fragment;
//    }
    return fragment;
  }

//  public static Fragment getInstance() {
//    newInstance();
//    return instance;
//  }

//  @Override
//  public void onCreate(Bundle savedInstanceState) {
//    super.onCreate(savedInstanceState);
//    summaryViewModel = ViewModelProviders.of(this).get(SummaryViewModel.class);
//    int index = 1;
//    if (getArguments() != null) {
//      index = getArguments().getInt(ARG_SECTION_NUMBER);
//    }
//    summaryViewModel.setIndex(index);
//  }

  @Override
  public View onCreateView(
    @NonNull LayoutInflater inflater, ViewGroup container,
    Bundle savedInstanceState) {
    View root = inflater.inflate(R.layout.fragment_main, container, false);
    final Button triggerServiceUpdate = root.findViewById(R.id.triggerServiceUpdate);
    triggerServiceUpdate.setOnClickListener(this);
    final Button updateList = root.findViewById(R.id.updateList);
    updateList.setOnClickListener(this);
//    summaryViewModel.getText().observe(this, new Observer<String>() {
//      @Override
//      public void onChanged(@Nullable String s) {
//        textView.setText(s);
//      }
//    });
    return root;
  }

  private ProxyDeamonService s;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
//    summaryViewModel = ViewModelProviders.of(this).get(SummaryViewModel.class);
//    int index = 1;
//    if (getArguments() != null) {
//      index = getArguments().getInt(ARG_SECTION_NUMBER);
//    }
//    summaryViewModel.setIndex(index);
//    super.onCreate(savedInstanceState);
    wordList = new ArrayList<String>();
//    adapter = new ArrayAdapter<String>(getContext(), android.R.layout.simple_list_item_1, android.R.id.text1, wordList);
//
//    setListAdapter(adapter);
  }

  Messenger messenger;


  @Override
  public void onResume() {
    super.onResume();
    Intent intent = new Intent(getContext(), ProxyDeamonService.class);
    getContext().bindService(intent, this, Context.BIND_AUTO_CREATE);
  }

  @Override
  public void onPause() {
    super.onPause();
    getContext().unbindService(this);
  }

  private List<String> wordList;
  int i = 0;

  public void onClick(View view) {
    switch (view.getId()) {
      case R.id.updateList:
        if (s != null) {
          wordList.clear();
          wordList.addAll(s.getWordList());
          Toast.makeText(getContext(), "from Service" + wordList.toString(),
            Toast.LENGTH_LONG).show();

          Bundle bundle = new Bundle();
          bundle.putString("key", "" + i++);
          Message message = Message.obtain();
          message.setData(bundle);
          try {
            messenger.send(message);
          }
          catch (RemoteException e) {
            e.printStackTrace();
          }
//          adapter.notifyDataSetChanged();
        }
        break;
      case R.id.triggerServiceUpdate:
        Toast.makeText(getContext(), "trigger service" + s.getWordList().size(),
          Toast.LENGTH_SHORT).show();
        Intent service = new Intent(getContext(), ProxyDeamonService.class);
        getContext().startService(service);
        break;
    }
  }

  @Override
  public void onServiceConnected(ComponentName name, IBinder binder) {
    ProxyDeamonService.MyBinder b = (ProxyDeamonService.MyBinder) binder;
    s = b.getService();
    messenger = b.getMessenger();

    Toast.makeText(getContext(), "Connected", Toast.LENGTH_SHORT).show();
  }

  @Override
  public void onServiceDisconnected(ComponentName name) {
    s = null;
  }

  @Override
  public void onNullBinding(ComponentName name) {

  }
}
