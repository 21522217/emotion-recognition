package com.il;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import org.opencv.android.OpenCVLoader;
import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.objdetect.CascadeClassifier;
import org.opencv.android.Utils;


import android.graphics.Bitmap;

public class ERDModule extends ReactContextBaseJavaModule {

    public ERDModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ERDModule";
    }

    @ReactMethod
    public void RecognizeEmotion(String imagePath, Promise promise) {

        try {
            if (OpenCVLoader.initDebug()) {

                promise.resolve(imagePath);
            } else {
                promise.reject("OPEN_CV_INIT_ERROR", "OpenCV initialization failed");
            }
        } catch (Exception e) {
            promise.reject("INITIALIZATION_ERROR", e.getMessage());
        }
    }

}
