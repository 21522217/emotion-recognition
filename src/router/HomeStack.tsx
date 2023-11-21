import React from 'react';

import Home from '../screens/Home';
import CameraED from '../screens/CameraED';
import ED from '../screens/ED';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type HomeStackParamsList = {
  Home: undefined;
  CameraED: {modalVisibility: boolean; imagePath: string | undefined};
  ED: {imagePath: string | undefined};
};

const stack = createNativeStackNavigator<HomeStackParamsList>();

const HomeStack = () => {
  return (
    <stack.Navigator
      screenOptions={{headerShown: false}} initialRouteName='Home'>
      <stack.Screen name="Home" component={Home} />
      <stack.Screen name="CameraED" component={CameraED} />
      <stack.Screen name="ED" component={ED} />
    </stack.Navigator>
  );
};

export default HomeStack;
