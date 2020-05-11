package com.droneproxy.ui.main.settings;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProviders;

import com.droneproxy.R;
import com.droneproxy.ui.main.summary.SummaryViewModel;

/**
 * A placeholder fragment containing a simple view.
 */
public class SettingsFragment extends Fragment {

  private static final String ARG_SECTION_NUMBER = "section_number";

  private ViewModel pageViewModel;

  private static SettingsFragment instance = null;

  public static Fragment newInstance(int index) {
//    if (instance == null) {
      SettingsFragment fragment = new SettingsFragment();
      Bundle bundle = new Bundle();
      bundle.putInt(ARG_SECTION_NUMBER, index);
      fragment.setArguments(bundle);
      return fragment;
  }

//  public static Fragment getInstance() {
//    newInstance();
//    return instance;
//  }

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
//    pageViewModel = ViewModelProviders.of(this).get(SettingsViewModel.class);
//    int index = 1;
//    if (getArguments() != null) {
//      index = getArguments().getInt(ARG_SECTION_NUMBER);
//    }
//    pageViewModel.setIndex(index);
  }

  @Override
  public View onCreateView(
    @NonNull LayoutInflater inflater, ViewGroup container,
    Bundle savedInstanceState) {
    View root = inflater.inflate(R.layout.fragment_main, container, false);
//    final TextView textView = root.findViewById(R.id.section_label);
//    pageViewModel.getText().observe(this, new Observer<String>() {
//      @Override
//      public void onChanged(@Nullable String s) {
//        textView.setText(s);
//      }
//    });
    return root;
  }
}
