import React from 'react';

import Login from '../screens/Login';
import UploadImage from '../screens/UploadImage';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type AuthStackParamsList = {
  Login: undefined;
  UploadImage: undefined;
};

const stack = createNativeStackNavigator<AuthStackParamsList>();

const AuthStack = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="Login" component={Login} />
      <stack.Screen name="UploadImage" component={UploadImage}/>
    </stack.Navigator>
  );
};

export default AuthStack;
