package com.il;

import android.content.Context;
import android.content.res.AssetManager;
import android.util.Base64;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.objdetect.CascadeClassifier;
import org.opencv.imgproc.Imgproc;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class EDModule extends ReactContextBaseJavaModule {
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
            // Decode the base64 string to a Mat (image) object
            Mat image = decodeBase64ToMat(imageBase64);

            // Load the Haar Cascade Classifier for faces
            CascadeClassifier faceCascade = loadCascadeClassifierFromRawResource(
                    "haarcascade_frontalface_default", "cascade");

            if (faceCascade == null) {
                promise.reject("CASCADE_CLASSIFIER_ERROR", "Error loading Haar Cascade Classifier");
                return;
            }

            // Perform face detection using CascadeClassifier
            MatOfRect faces = new MatOfRect();
            faceCascade.detectMultiScale(image, faces);

            // Draw rectangles around detected faces
            for (Rect rect : faces.toArray()) {
                Imgproc.rectangle(image, rect.tl(), rect.br(), new Scalar(255, 0, 0, 255), 2);
            }

            // Encode the image with rectangles around faces back to base64
            String resultBase64 = encodeMatToBase64(image);

            // Resolve the Promise with the base64-encoded result image
            promise.resolve(resultBase64);

        } catch (Exception e) {
            promise.reject("FACE_DETECTION_ERROR", "Error detecting faces: " + e.getMessage());
        }
    }

    private CascadeClassifier loadCascadeClassifierFromRawResource(String resourceName, String cascadeDirName) {
        try {
            // Get the resource ID for the cascade classifier
            int resourceId = R.raw.haarcascade_frontalface_default;
    
            if (resourceId == 0) {
                Toast.makeText(getReactApplicationContext(),
                        "Resource not found: " + resourceName, Toast.LENGTH_LONG).show();
                return null;
            }
    
            // Create a cascade directory in the private mode
            File cascadeDir = getReactApplicationContext().getDir(cascadeDirName, Context.MODE_PRIVATE);
    
            // Create a file for the cascade classifier
            File cascadeFile = new File(cascadeDir, resourceName);
    
            // Open the input stream for the resource
            InputStream is = getReactApplicationContext().getResources().openRawResource(resourceId);
    
            // Write the contents of the InputStream to the cascade file
            try (FileOutputStream os = new FileOutputStream(cascadeFile)) {
                byte[] buffer = new byte[4096];
                int bytesRead;
                while ((bytesRead = is.read(buffer)) != -1) {
                    os.write(buffer, 0, bytesRead);
                }
            } finally {
                is.close();
            }
    
            // Load the cascade classifier from the file
            CascadeClassifier cascadeClassifier = new CascadeClassifier(cascadeFile.getAbsolutePath());
    
            // Display error messages if loading fails
            if (cascadeClassifier.empty()) {
                Toast.makeText(getReactApplicationContext(),
                        "Error loading cascade classifier: " + resourceName, Toast.LENGTH_LONG).show();
                return null;
            } else {
                return cascadeClassifier;
            }
    
        } catch (IOException e) {
            e.printStackTrace();
            Toast.makeText(getReactApplicationContext(),
                    "Error loading cascade classifier: " + e.getMessage(), Toast.LENGTH_LONG).show();
            return null;
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
