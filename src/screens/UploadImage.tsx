import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import {
  launchImageLibrary,
  Asset,
  ImagePickerResponse,
} from 'react-native-image-picker';
import client from '../api/client';

const UploadImage = () => {
  const [profileImageUri, setprofileImageUri] = useState<string>('');
  const [uploadImageProgress, setUploadImageProgress] = useState(0)

  const openImageLibrary = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission for image capture.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    await launchImageLibrary(
      {mediaType: 'photo'},
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error(
            `ImagePicker Error: ${response.errorCode}`,
            response.errorMessage,
          );
        } else if (response.assets) {
          // Handle the selected assets
          setprofileImageUri(response.assets[0].uri || '');
        }
      },
    );
  };
  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append('profile', {
      name: new Date() + '_profile',
      uri: profileImageUri,
      type: 'image/jpg',
    });

    try {
      const res = await client.post('/upload-avatar', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization:
            'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NThkYjY3ZjRmNmRkNzU1MTgxNTcyYmQiLCJpYXQiOjE3MDM4NTc1NDEsImV4cCI6MTcwMzk0Mzk0MX0.Y_fFYiu6Twlb-4qsfv-3LqyCtlHnoiOXccdZaBKPbcg',
        },
        onUploadProgress: ({loaded, total}) => {setUploadImageProgress(loaded / total!)}
      });

      console.log(res.data)
    } catch (error) {
      console.log('Internal Upload Image error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openImageLibrary} style={styles.uploadButton}>
        {profileImageUri ? (
          <Image style={styles.uploadedImage} source={{uri: profileImageUri}} />
        ) : (
          <Text style={styles.uploadButtonText}>Upload Profile Image</Text>
        )}
      </TouchableOpacity>
      {uploadImageProgress ? <Text style={{color: COLORS.primaryBlackHex}}>{uploadImageProgress}</Text> : null}
      <Text style={styles.skipText}>Skip</Text>
      {profileImageUri ? (
        <Text
          style={[styles.skipText, styles.upload]}
          onPress={uploadProfileImage}>
          Upload
        </Text>
      ) : null}
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    overflow: 'hidden',
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderColor: COLORS.primaryBlackHex,
    borderWidth: 1,
  },
  uploadButtonText: {
    color: COLORS.primaryBlackHex,
    textAlign: 'center',
    opacity: 0.3,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  skipText: {
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
    letterSpacing: SPACING.space_2,
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_24,
    opacity: 0.6,
  },
  upload: {
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: SPACING.space_8,
  },
});
