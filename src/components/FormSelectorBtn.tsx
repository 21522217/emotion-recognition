import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import React from 'react';

import {COLORS, FONTSIZE} from '../theme/theme';

const FormSelectorBtn = ({title, style, backgroundColor, onPress}: any) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.container, style, {backgroundColor}]}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default FormSelectorBtn;

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
});
