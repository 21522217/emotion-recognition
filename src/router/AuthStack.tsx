import React from 'react';

import Login from '../screens/Login';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type AuthStackParamsList = {
  Login: undefined;
};

const stack = createNativeStackNavigator<AuthStackParamsList>();

const AuthStack = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="Login" component={Login} />
    </stack.Navigator>
  );
};

export default AuthStack;
