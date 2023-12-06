import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../theme/theme';

const CameraCard = (props: any) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPressHandler}>
      <Icon
        name="camera"
        color={COLORS.primaryBlackHex}
        size={30}
      />
      <Text style={styles.text}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export default CameraCard;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 14,
    color: '#000000',
  },
});
