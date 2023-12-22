package com.per.ilook;

import android.content.Context;
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
import org.opencv.android.Utils;

import org.tensorflow.lite.Interpreter;
import java.nio.ByteBuffer;
import android.content.res.AssetFileDescriptor;
import android.graphics.Bitmap;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.FileInputStream;
import java.nio.channels.FileChannel;
import java.nio.MappedByteBuffer;
import java.nio.ByteOrder;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Comparator;

public class EDModule extends ReactContextBaseJavaModule {
    private Interpreter tflite;

    public EDModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "EDModule";
    }

    @ReactMethod
    public void RecognizeEmotions(String modelVersion, String imageBase64, Boolean isFrontCamera, Promise promise) {
        try {
            // Load model for usage
            getTfliteInterpreter("emotion_model_" + modelVersion + ".tflite");

            // Decode the base64 string to a Mat (image) object
            Mat image = decodeBase64ToMat(imageBase64);

            // Rotate the image based on the camera type for stable reasons
            if (isFrontCamera) {
                // For front camera, rotate 90 degrees counterclockwise
                Core.transpose(image, image);
                Core.flip(image, image, Core.ROTATE_90_CLOCKWISE);
            } else {
                // For back camera, rotate 90 degrees clockwise
                Core.transpose(image, image);
                Core.flip(image, image, Core.ROTATE_90_COUNTERCLOCKWISE);
            }

            // Load the Haar Cascade Classifier for faces
            CascadeClassifier faceCascade = loadCascadeClassifierFromRawResource(
                    "haarcascade_frontalface_default", "cascade");

            if (faceCascade == null) {
                promise.reject("CASCADE_CLASSIFIER_ERROR", "Error loading Haar Cascade Classifier");
                return;
            }

            // Perform face detection using CascadeClassifier
            MatOfRect faces = new MatOfRect();
            faceCascade.detectMultiScale(image, faces, 1.1, 9, 0, new Size(50, 50), new Size());

            // Draw rectangles around detected faces
            for (Rect rect : faces.toArray()) {
                // Custom bounding box
                int padding = 0;
                rect.x = Math.max(0, rect.x - padding);
                rect.y = Math.max(0, rect.y - padding);
                rect.width += 2 * padding;
                rect.height += 2 * padding;

                // Crop the face from the image
                Mat face = image.submat(rect);

                 // Preprocess the face image
                Bitmap bitmap = convertMatToBitmap(face);
                ByteBuffer inputBuffer = preprocessImage(bitmap);

                // Run inference
                float[][] emotionPredictions = new float[1][7]; // Adjust NUM_CLASSES base on your model
                tflite.run(inputBuffer, emotionPredictions);

                // Post process the results (get the predicted emotion)
                String predictedEmotion = postprocessResults(emotionPredictions);

                // Draw the rectangle around the face with the predicted emotion
                Imgproc.rectangle(image, rect.tl(), rect.br(), new Scalar(255, 0, 255, 255), 10);
                putText(image, predictedEmotion, rect.tl());
            }

            // Encode the image with rectangles around faces back to base64
            String resultBase64 = encodeMatToBase64(image);

            // Resolve the Promise with the base64-encoded result image
            promise.resolve(resultBase64);

        } catch (Exception e) {
            promise.reject("FACE_DETECTION_ERROR", "Error detecting faces: " + e.getMessage());
        }
    }

    private Interpreter getTfliteInterpreter(String modelFileName) throws IOException {
        if (tflite == null) {
            tflite = new Interpreter(loadModelFile(getReactApplicationContext(), modelFileName));
        }
        return tflite;
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

    private void putText(Mat image, String text, Point location) {
        Imgproc.putText(image, text, location, Imgproc.FONT_HERSHEY_SIMPLEX, 3.0,
                new Scalar(255, 255, 255), 2);
    }

    private MappedByteBuffer loadModelFile(Context context, String modelFileName) throws IOException {
        AssetFileDescriptor fileDescriptor = context.getAssets().openFd(modelFileName);
        FileInputStream inputStream = new FileInputStream(fileDescriptor.getFileDescriptor());
        FileChannel fileChannel = inputStream.getChannel();
        long startOffset = fileDescriptor.getStartOffset();
        long declaredLength = fileDescriptor.getDeclaredLength();
        return fileChannel.map(FileChannel.MapMode.READ_ONLY, startOffset, declaredLength);
    }

    private ByteBuffer preprocessImage(Bitmap bitmap) {
        // Convert the Bitmap to a grayscale image with a fixed size of 48x48
        Bitmap resizedBitmap = Bitmap.createScaledBitmap(bitmap, 48, 48, true);
        Mat grayMat = new Mat(resizedBitmap.getHeight(), resizedBitmap.getWidth(), CvType.CV_8UC1);
        Imgproc.cvtColor(bitmapToMat(resizedBitmap), grayMat, Imgproc.COLOR_RGB2GRAY);

        // Normalize pixel values to be between 0 and 1
        grayMat.convertTo(grayMat, CvType.CV_32F, 1.0 / 255.0);

        // Flatten the image into a 1D array
        float[] flatArray = new float[48 * 48];
        grayMat.get(0, 0, flatArray);

        // Convert the 1D array to a ByteBuffer
        ByteBuffer inputBuffer = ByteBuffer.allocateDirect(4 * 48 * 48); // 4 bytes per float
        inputBuffer.order(ByteOrder.nativeOrder());
        for (float value : flatArray) {
            inputBuffer.putFloat(value);
        }
        inputBuffer.rewind();

        return inputBuffer;
    }

    private String postprocessResults(float[][] predictions) {
        // Find the index of the maximum value in the predictions array
        int maxIndex = 0;
        float maxValue = predictions[0][0];
        for (int i = 1; i < predictions[0].length; i++) {
            if (predictions[0][i] > maxValue) {
                maxIndex = i;
                maxValue = predictions[0][i];
            }
        }

        // Map the index to the corresponding emotion label
        String[] emotions = { "angry", "disgust", "fear", "happy", "sad", "surprise", "neutral" };
        String predictedEmotion = emotions[maxIndex];

        return predictedEmotion;
    }

    private Mat bitmapToMat(Bitmap bitmap) {
        Mat mat = new Mat();
        Bitmap bmp32 = bitmap.copy(Bitmap.Config.ARGB_8888, true);
        Utils.bitmapToMat(bmp32, mat);
        return mat;
    }

    private Bitmap convertMatToBitmap(Mat mat) {
        Bitmap bitmap = Bitmap.createBitmap(mat.cols(), mat.rows(), Bitmap.Config.ARGB_8888);
        Utils.matToBitmap(mat, bitmap);
        return bitmap;
    }

}
