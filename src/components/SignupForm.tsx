import React, {useState} from 'react';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitBtn from './FormSubmitBtn';
import {Text} from 'react-native';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import {isValidObjField, isValidEmail, updateError} from '../utils/methods';

import {Formik, useFormik} from 'formik';
import * as Yup from 'yup';

import client from '../api/client';

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

const SignupForm = () => {
  const userInfo = {
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // const [userInfo, setUserInfo] = useState<UserInfor>();
  const [error, setError] = useState<string>('');

  const signUp = async (values: any, formikActions: any) => {
       const res = await client.post("/create-user", {
        ...values
      })
      console.log(res.data)
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
