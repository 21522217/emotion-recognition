package com.il;

import android.util.Base64;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.opencv.android.OpenCVLoader;
import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.objdetect.CascadeClassifier;

import java.io.File;

public class EDModule extends  ReactContextBaseJavaModule {
    public EDModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "EDModule";
    }

    @ReactMethod
    public void RecognizeEmotions(String imageBase64, Promise promise) {
        try {
            if (OpenCVLoader.initDebug()) {
                // Decode the base64 string to a Mat (image) object
                Mat image = decodeBase64ToMat(imageBase64);

                // Rotate the image 90 degrees counterclockwise
                Mat rotatedImage = new Mat();
                Core.transpose(image, rotatedImage);
                Core.flip(rotatedImage, rotatedImage, Core.ROTATE_90_COUNTERCLOCKWISE);

                // Convert the rotated image to grayscale
                Mat grayImage = new Mat();
                Imgproc.cvtColor(rotatedImage, grayImage, Imgproc.COLOR_BGR2GRAY);

                // Encode the grayscale image back to base64
                String grayImageBase64 = encodeMatToBase64(grayImage);

                // Resolve the Promise with the base64-encoded grayscale image
                promise.resolve(grayImageBase64);
            } else {
                promise.reject("Internal Module Error.");
            }
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    private Mat decodeBase64ToMat(String base64) {
        byte[] decodedBytes = Base64.decode(base64, Base64.DEFAULT);
        return Imgcodecs.imdecode(new MatOfByte(decodedBytes), Imgcodecs.IMREAD_UNCHANGED);
    }

    private String encodeMatToBase64(Mat mat) {
        MatOfByte matOfByte = new MatOfByte();
        Imgcodecs.imencode(".jpg", mat, matOfByte);
        byte[] byteArray = matOfByte.toArray();
        return Base64.encodeToString(byteArray, Base64.DEFAULT);
    }

}
