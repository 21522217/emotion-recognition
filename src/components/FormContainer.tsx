import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {Children} from 'react';

const FormContainer = ({children}: any) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      enabled
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default FormContainer;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
  },
});
