import {StyleSheet, Text, ScrollView, View} from 'react-native';
import React from 'react';

import {COLORS} from '../theme/theme';
import {FONTSIZE} from '../theme/theme';
import {FONTFAMILY} from '../theme/theme';
import {SPACING} from '../theme/theme';

const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentCard}>
        <Text style={styles.title}>Institution</Text>
        <Text style={styles.content}>UIT</Text>
      </View>
      <View style={styles.contentCard}>
        <Text style={styles.title}>Group</Text>
        <Text style={styles.content}>Project one</Text>
      </View>
      <View style={styles.contentCard}>
        <Text style={styles.title}>Contributors</Text>
        <Text style={styles.content}>Nguyen D. Vo</Text>
        <Text style={styles.content}>Khanh Duy</Text>
        <Text style={styles.content}>Khiem Tran </Text>
        <Text style={styles.content}>Khoi Tran</Text>
      </View>
      <View style={styles.contentCard}>
        <Text style={styles.title}>Licenses</Text>
        <Text style={styles.content}>None</Text>
      </View>
      <View style={styles.contentCard}>
        <Text style={styles.title}>Contact</Text>
        <Text style={styles.content}>None</Text>
      </View>
    </ScrollView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    padding: SPACING.space_20,
  },
  contentCard: {
    marginTop: SPACING.space_20,
},
  title: {
    fontSize: FONTSIZE.size_30,
    fontFamily: FONTFAMILY.poppins_extrabold,
    color: COLORS.primaryWhiteHex,
  },
  content: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryLightGreyHex,
  },
});
