import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CameraCard from '../components/CameraCard';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamsList} from '../router/HomeStack';

import {COLORS} from '../theme/theme';

type HomeProps = NativeStackScreenProps<HomeStackParamsList, 'Home'>;

const Home = ({navigation}: HomeProps) => {

  const invokeCamera = (label: string) => {
    navigation.navigate('CameraED', {
      modalVisibility: true,
      imagePath: undefined,
      modelVersion: label,
    });
  };

  // Define your camera card labels in an array
  const cameraCardLabels = [
    'V01',
    'V02',
    'V03',
    'V04',
    'V05',
    'V06',
    'V07',
    'V08',
    'V09',
    'V10',
  ];

  // Calculate the number of columns (2 columns in this case)
  const numColumns = 4;

  // Calculate the number of rows based on the number of columns
  const numRows = Math.ceil(cameraCardLabels.length / numColumns);

  // Create an array of rows, where each row contains CameraCard components
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    const rowStart = i * numColumns;
    const rowEnd = Math.min(rowStart + numColumns, cameraCardLabels.length);
    const rowItems = cameraCardLabels.slice(rowStart, rowEnd);

    const row = (
      <View key={i} style={styles.row}>
        {rowItems.map(label => (
          <CameraCard key={label} label={label} onPressHandler={() => invokeCamera(label)} />
        ))}
      </View>
    );

    rows.push(row);
  }
  if (rows.length == 0) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/homepage.jpg')} />
      <ScrollView style={styles.buttonView} horizontal={false}>
        {rows}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000000',
  },
  buttonView: {
    // backgroundColor: '#2B2B52',
    margin: 20,
  },
});
