import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';

const FormInput = (props: any) => {
  const {placeholder, label, error} = props;

  return (
    <>
      <View style={styles.labelContainer}>
        <Text style={styles.text}>{label}</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <TextInput  
        {...props}
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={COLORS.secondaryLightGreyHex}
      />
    </>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold',
    color: COLORS.primaryBlackHex,
    paddingVertical: SPACING.space_10,
  },
  error: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryRedHex,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.primaryGreyHex,
    height: 45,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    color: COLORS.primaryBlackHex,
  },
});
