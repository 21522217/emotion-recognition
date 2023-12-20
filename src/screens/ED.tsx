import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../theme/theme';
import {HomeStackParamsList} from '../router/HomeStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {} from 'react-native-fs';

import {NativeModules} from 'react-native';
const {EDModule} = NativeModules;

type EDProps = NativeStackScreenProps<HomeStackParamsList, 'ED'>;

const ED = ({route, navigation}: EDProps) => {
  const {imagePath, camType, modelVersion} = route.params;

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [imageUri, setImageUri] = useState<string>(imagePath);
  const [isImageProceeded, setIsImageProceeded] = useState<boolean>(false);

  // IMAGE PROCESSING FROM NATIVE MODULE
  const processImage = async () => {
    try {
      const result = await EDModule.RecognizeEmotions(
        modelVersion,
        imagePath,
        camType,
      );
      setImageUri(result);
    } catch (e) {
      console.log('MODULE ERROR: ', e);
    }
  };

  const returnHandler = () => {
    setIsModalVisible(false);
  };
  const ProcessImage = async () => {
    await processImage();
    setIsImageProceeded(true);
  };
  const SaveImageHandler = async (imageUri: string) => {
    try {
    } catch (error) {
      console.error('Error saving image to camera roll:', error);
    }
  };

  useEffect(() => {
    if (isModalVisible == false) {
      navigation.navigate('Home');
    }
  }, [isModalVisible]);
  return (
    <Modal animationType="slide" transparent={false} visible={isModalVisible}>
      <View style={styles.container}>
        {isImageProceeded == false ? (
          <Text style={styles.headText}>
            Do you want to recognize emotions?
          </Text>
        ) : (
          <Text style={styles.headText}>😄🤑🙂🤔😮‍💨😠🫨🤯</Text>
        )}
        <View style={styles.bodyImage}>
          <Image
            source={{uri: `data:image/jpeg;base64,${imageUri}`}}
            style={styles.image}
          />
        </View>
        <View style={styles.botBar}>
          {isImageProceeded == false ? (
            <>
              <TouchableOpacity style={styles.button} onPress={returnHandler}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => ProcessImage()}>
                <Text style={styles.buttonText}>Proceed</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={returnHandler}>
                <Text style={styles.buttonText}>Return</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ED;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    // alignItems: 'center',
    padding: 20,
  },
  headText: {
    color: COLORS.primaryWhiteHex,
    fontSize: 20,
    textAlign: 'center',
  },
  bodyImage: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
  },
  botBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  image: {
    flex: 1,
    width: '90%',
  },
  button: {
    width: 140,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryOrangeHex,
  },
  buttonText: {
    color: COLORS.primaryWhiteHex,
    fontSize: 18,
  },
});
