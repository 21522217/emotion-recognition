import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';

import {RNCamera} from 'react-native-camera';

import ED from './ED';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamsList} from '../router/HomeStack';

import {COLORS} from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type HomeProps = NativeStackScreenProps<HomeStackParamsList, 'CameraED'>;

const CameraED = ({route, navigation}: HomeProps) => {
  const {modalVisibility, imagePath, modelVersion} = route.params;

  const [isModalVisible, setModalVisible] = useState<boolean>(modalVisibility);
  const [photoUri, setPhotoUri] = useState<string | undefined>(imagePath);
  const cameraRef = useRef<RNCamera | null>(null);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const [isFlashMode, setIsFlashMode] = useState<'on' | 'off'>('off');
  const [isDisableFlash, setIsDisableFlash] = useState(false);
  const [isTakePicture, setIsTakePicture] = useState(false);
  const [detectedFaces, setDetectedFaces] = useState([]);

  const goBackHandler = () => {
    setModalVisible(false);
  };
  const switchCameraType = () => {
    setCameraType((prev: any) => {
      if (prev == RNCamera.Constants.Type.back) {
        return RNCamera.Constants.Type.front;
      } else {
        return RNCamera.Constants.Type.back;
      }
    });
  };
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      setPhotoUri(data.base64);
      setModalVisible(false);
    }
  };
  const switchFlashMode = () => {
    setIsFlashMode(prev => {
      if (prev == 'off') {
        return 'on';
      } else {
        return 'off';
      }
    });
  };
  const detectFaceHandler = ({faces}: any) => {
    if (faces.length > 0) {
      setDetectedFaces(faces);
      setIsTakePicture(true);
    } else {
      setDetectedFaces([]);
      setIsTakePicture(false);
    }
  };

  useEffect(() => {
    if (cameraType == RNCamera.Constants.Type.front) {
      setIsFlashMode('off');
      setIsDisableFlash(true);
    } else {
      setIsDisableFlash(false);
    }
  }, [cameraType]);
  useEffect(() => {
    if (isModalVisible == false && photoUri == undefined) {
      navigation.goBack();
    } else if (isModalVisible == false && photoUri != undefined) {
      navigation.navigate('ED', {
        imagePath: photoUri,
        camType: cameraType == RNCamera.Constants.Type.front ? true : false,
        modelVersion: modelVersion,
      });
    }
  }, [isModalVisible]);

  return (
    <Modal animationType="slide" transparent={false} visible={isModalVisible}>
      <View style={styles.container}>
        {photoUri == null && (
          <RNCamera
            style={styles.camera}
            ref={cameraRef}
            type={cameraType}
            flashMode={isFlashMode}
            faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
            faceDetectionLandmarks={
              RNCamera.Constants.FaceDetection.Landmarks.all
            }
            onFacesDetected={detectFaceHandler}>
            <View style={styles.topBar}>
              <TouchableOpacity style={styles.goBack} onPress={goBackHandler}>
                <Icon
                  name="chevron-left"
                  size={45}
                  color={COLORS.primaryWhiteHex}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.bottomBar}>
              <TouchableOpacity
                style={styles.switchCamType}
                onPress={switchCameraType}>
                <Icon name="sync" size={30} color={COLORS.primaryWhiteHex} />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={detectedFaces.length == 0 ? true : false}
                style={
                  detectedFaces.length != 0
                    ? styles.takePicture
                    : styles.cantTakePicture
                }
                onPress={takePicture}
              />
              <TouchableOpacity
                disabled={isDisableFlash}
                style={styles.toggleFlash}
                onPress={switchFlashMode}>
                {isFlashMode == 'on' ? (
                  <Icon name="flash" size={30} color={COLORS.primaryWhiteHex} />
                ) : (
                  <Icon
                    name="flash-off"
                    size={30}
                    color={
                      isDisableFlash
                        ? COLORS.primaryLightGreyHex
                        : COLORS.primaryWhiteHex
                    }
                  />
                )}
              </TouchableOpacity>
            </View>
          </RNCamera>
        )}
      </View>
    </Modal>
  );
};

export default CameraED;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
  },
  takePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primaryWhiteHex,
    alignSelf: 'center',
  },
  cantTakePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignSelf: 'center',
  },
  switchCamType: {},
  toggleFlash: {},
  goBack: {
    backgroundColor: 'transparent',
  },
});
