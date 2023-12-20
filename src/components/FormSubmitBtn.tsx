import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';

const FormSubmitBtn = ({title, onPress, submitting}: any) => {
  const backgroundColor = submitting
    ? COLORS.secondaryLightGreyHex
    : COLORS.primaryDarkBlueHex;

  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : null}
      style={[styles.container, {backgroundColor}]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FormSubmitBtn;

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.space_20,
  },
  buttonText: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});
