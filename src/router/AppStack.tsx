import React from 'react';

import HomeStack from './HomeStack';
import Lectures from '../screens/Lectures';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BlurView} from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../theme/theme';
import {StyleSheet} from 'react-native';

export type AppStackParamsList = {
  HomePage: undefined;
  Lectures: undefined;
};

const stack = createBottomTabNavigator<AppStackParamsList>();

export default function AppStack() {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={15}
            style={styles.BlurViewStyle}
          />
        ),
      }}>
      <stack.Screen
        name="HomePage"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              size={30}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
      <stack.Screen
        name="Lectures"
        component={Lectures}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="book"
              size={30}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
    </stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    height: 60,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
