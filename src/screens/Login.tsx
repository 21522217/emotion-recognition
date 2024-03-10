import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Animated,
} from 'react-native';
import React, {useEffect, useRef} from 'react';

import FormHeader from '../components/FormHeader';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import FormSelectorBtn from '../components/FormSelectorBtn';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { AuthStackParamsList } from '../router/AuthStack';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

import axios from 'axios';

const {width} = Dimensions.get('window');
type LoginProps = NativeStackScreenProps<AuthStackParamsList, "Login">

const Login = ({navigation}: LoginProps) => {
  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef<ScrollView>(null);

  const fetchApi = async () => {
    try {
      const res = await axios.get('http://localhost:3001/');
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  });
  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 40],
  });
  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20],
  });
  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: [COLORS.primaryDarkBlueHex, COLORS.secondaryLightGreyHex],
  });
  const signupColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: [COLORS.secondaryLightGreyHex, COLORS.primaryDarkBlueHex],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FormHeader
          leftHeading="Welcome"
          rightHeading="Back"
          subHeading="Emotions"
          rightHeaderOpacity={rightHeaderOpacity}
          leftHeaderTranslateX={leftHeaderTranslateX}
          rightHeaderTranslateY={rightHeaderTranslateY}
        />
      </View>
      <View style={styles.buttonSelectContainer}>
        <FormSelectorBtn
          style={styles.leftFSB}
          backgroundColor={loginColorInterpolate}
          title="Login"
          onPress={() => scrollView.current?.scrollTo({x: 0})}
        />
        <FormSelectorBtn
          style={styles.rightFSB}
          backgroundColor={signupColorInterpolate}
          title="Sign up"
          onPress={() => scrollView.current?.scrollTo({x: width})}
        />
      </View>
      <ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: animation}},
            },
          ],
          {useNativeDriver: false},
        )}>
        <LoginForm navigation={navigation}/> 
        <ScrollView showsVerticalScrollIndicator={false}>
          <SignupForm navigation={navigation}/>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftFSB: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightFSB: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonSelectContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.space_20,
  },
});
