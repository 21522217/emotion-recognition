package com.il;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class ERDModule extends ReactContextBaseJavaModule {

    public ERDModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ERDModule";
    }

    @ReactMethod
    public void SeizeMe(String message, Promise promise) {
        try {
            promise.resolve(message + " khiem ngu");
        } catch (Exception e) {
            promise.reject("fail: ", e);
        }
    }
}
