import React from 'react';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitBtn from './FormSubmitBtn';
import {Formik, useFormik} from 'formik';
import * as Yup from 'yup';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamsList} from '../router/AuthStack';
import {StackActions} from '@react-navigation/native';

import client from '../api/client';

interface SignUpFormProps {
  navigation: NativeStackNavigationProp<AuthStackParamsList, 'Login'>;
}

const validationSchema = Yup.object({
  fullname: Yup.string()
    .trim()
    .min(3, 'Invalid Name!')
    .required('Name is required!'),
  email: Yup.string().email('Invalid Email!').required('Email is required!'),
  password: Yup.string()
    .trim()
    .min(8, 'Password is too short')
    .required('Password is required!'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords must match',
  ),
});

const SignupForm: React.FC<SignUpFormProps> = ({navigation}) => {
  const userInfo = {
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const signUp = async (values: any, formikActions: any) => {
    const res = await client.post('/create-user', {
      ...values,
    });

    if (res.data.success == true) {
      const signInRes = await client.post('/sign-in', {
        email: values.email,
        password: values.password,
      });
      if (signInRes.data.success == true) {
        navigation.dispatch(StackActions.replace('UploadImage', {
          token: signInRes.data.token,
        }));
      }
    }

    console.log(res.data);
    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => signUp(values, formikActions)}>
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const {fullname, email, password, confirmPassword} = values;

          return (
            <>
              <FormInput
                value={fullname}
                error={touched.fullname && errors.fullname}
                onChangeText={handleChange('fullname')}
                label="Full Name"
                onBLur={handleBlur('fullname')}
                placeholder="Khiem Tran"
              />
              <FormInput
                value={email}
                error={touched.email && errors.email}
                onChangeText={handleChange('email')}
                autoCapitalize="none"
                label="Email"
                onBLur={handleBlur('email')}
                placeholder="example@gmail.com"
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange('password')}
                autoCapitalize="none"
                secureTextEntry
                label="Password"
                onBLur={handleBlur('password')}
                placeholder="********"
              />
              <FormInput
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                autoCapitalize="none"
                secureTextEntry
                label="Confirm Password"
                onBLur={handleBlur('confirmPassword')}
                placeholder="********"
              />
              <FormSubmitBtn
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="Sign up"
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default SignupForm;
