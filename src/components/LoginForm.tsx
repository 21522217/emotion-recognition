import React, {useState} from 'react';
import {Text} from 'react-native';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import {isValidEmail, isValidObjField, updateError} from '../utils/methods';
import FormSubmitBtn from './FormSubmitBtn';

import client from '../api/client';

type UserInfo = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const {email, password} = userInfo;

  const handleOnChangeText = (value: string, fieldName: string) => {
    setUserInfo({...userInfo, [fieldName]: value});
  };
  const isValidForm = () => {
    if (!isValidObjField(userInfo)) {
      return updateError('Required all fields!', setError);
    }
    if (!isValidEmail(email)) {
      return updateError('Invalid Email!', setError);
    }
    if (!password.trim() || password.length < 8) {
      return updateError('Invalid Password!', setError);
    }
    return true;
  };
  const submitFormHandler = async () => {
    if (isValidForm()) {
      try {
        const result = await client.post('/sign-in', {...userInfo});

        if (result.data.success) {
          setUserInfo({email: '', password: ''});
        }
      } catch (error) {
        console.log('It axios: ', error);
      }
    }
  };

  return (
    <FormContainer>
      {error ? (
        <Text
          style={{
            color: COLORS.primaryRedHex,
            textAlign: 'center',
            fontSize: FONTSIZE.size_18,
            marginTop: SPACING.space_10,
          }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={email}
        onChangeText={(value: string) => handleOnChangeText(value, 'email')}
        label="Email"
        placeholder="example@gmail.com"
        autoCapitalize="none"
      />
      <FormInput
        value={password}
        onChangeText={(value: string) => handleOnChangeText(value, 'password')}
        label="Password"
        placeholder="********"
        secureTextEntry={true}
      />
      <FormSubmitBtn onPress={submitFormHandler} title="Login" />
    </FormContainer>
  );
};

export default LoginForm;
