package com.droneconnector.models;

public class ExtendedStandardResponse<T> extends StandardResponse{

  private T extField;

  public ExtendedStandardResponse(boolean result) {
    super(result);
  }

  public T getExtendedField() {
    return extField;
  }

  public void setExtendedField(T value) {
    this.extField = value;
  }
}
