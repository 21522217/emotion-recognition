import {StyleSheet, Text, View, Animated} from 'react-native';
import React from 'react';

import {COLORS} from '../theme/theme';
import {SPACING} from '../theme/theme';
import {FONTSIZE} from '../theme/theme';
import {FONTFAMILY} from '../theme/theme';

const FormHeader = ({
  leftHeading,
  rightHeading,
  subHeading,
  leftHeaderTranslateX = 40,
  rightHeaderTranslateY = -20,
  rightHeaderOpacity = 0,
}: any) => {
  return (
    <>
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.heading,
            {transform: [{translateX: leftHeaderTranslateX}]},
          ]}>
          {leftHeading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity: rightHeaderOpacity,
              transform: [{translateY: rightHeaderTranslateY}],
            },
          ]}>
          {' '}
          {rightHeading}
        </Animated.Text>
      </View>
      <Text style={styles.subHeading}>{subHeading}</Text>
    </>
  );
};

export default FormHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: FONTSIZE.size_30,
    fontWeight: 'bold',
    color: COLORS.primaryBlackHex,
  },
  subHeading: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryBlackHex,
  },
});
