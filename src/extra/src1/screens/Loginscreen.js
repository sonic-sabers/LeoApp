/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  Keyboard,
  StatusBar,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import α from 'color-alpha';

import { colors } from '../constants';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Hstack from '../component/Hstack';
import fetchService from '../services/fetchService';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Hstack from '../component/Hstack';
import * as localStorage from '../services/localStorage';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
// const bgratio = 19 * 9
const Styledtextinput = props => {
  const [text, onChangeText] = React.useState('');
  const [hidePass, setHidePass] = React.useState(true);

  return (
    <View
      style={[
        {
          marginVertical: 10,
        },
        props.boxstyle,
      ]}>
      <Text style={styles.customstyle}>{props.title}</Text>
      <View style={styles.inputstyle}>
        {!props.MaterialCommunityIcons ? (
          <FontAwesome
            name={props.icon}
            size={20}
            color={colors.white}
            style={{
              marginBottom: -10,
            }}
          />
        ) : (
          <MaterialCommunityIcons
            name={props.icon}
            size={20}
            color={colors.white}
            style={{
              marginBottom: -10,
            }}
          />
        )}
        <TextInput
          style={[
            {
              marginLeft: 5,
              fontWeight: '400',
              fontSize: 15,
              color: colors.white,
              // color: '#caf0f8',
              marginBottom: -10,
              flex: 1,
            },
            props?.inputstyle,
          ]}
          // ref={props.refInner}
          value={text}
          secureTextEntry={hidePass ? true : false}
          placeholder={props.lable}
          // placeholderTextColor='green'
          // placeholderTextColor="#000"
          autoCapitalize="none"
          {...props}
        />
        {props.password && (
          <FontAwesome5
            name={hidePass ? 'eye-slash' : 'eye'}
            size={17}
            color={colors.white}
            onPress={() => setHidePass(!hidePass)}
          />
        )}
      </View>
      <Hstack between>
        {props.error ? (
          <Text style={styles.errortext}>{props.error}</Text>
        ) : (
          <Text style={styles.errortext} />
        )}
        {props.password && (
          <TouchableOpacity
            onPress={() =>
              Alert.alert('Contact Support team to reset password')
            }>
            <Text style={styles.forgettext}>Forget Password</Text>
          </TouchableOpacity>
        )}
      </Hstack>
    </View>
  );
};

const logoRatio = 500 / 142;
const logoHeight = 60;
export default function Loginscreen() {
  const [Error, setError] = useState('');
  const navigation = useNavigation();
  const [Loading, setLoading] = React.useState('');
  const [hidePass, setHidePass] = React.useState(true);
  const FCMToken = 'Its an user token';
  const UserInfo = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .trim()
      // .matches(regex, 'MI ID must be of 8 Digits')
      .min(5, 'MI ID must be of 5 Digits')
      .required('Required!')
      .min(5, 'Minimum 5 characters is required'),

    password: Yup.string()
      .trim()
      .min(5, 'Password is too short!')
      .required('Password is required!'),
  });
  const handlesLogin = async values => {
    const { username, password } = values;
    setLoading(true);
    setTimeout(() => {
      const response = fetchService.login2(username, password);
      let userData = response.data ? response.data : {};

      localStorage.set('userData', JSON.stringify(userData));

      setLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Appnavigator' }],
        }),
      );
    }, 2100);


    // const response = await fetchService.login2(username, password);
    // setLoading(false);
    // if (response?.status) {
    //   console.log('response', response);
    //   let userData = response.data ? response.data : {};
    //   console.log('userData', userData);
    //   await localStorage.set('userData', JSON.stringify(userData));
    //   // dispatch(authActions.updateUserData(userData));
    //   let token = userData.access;
    //   const response2 = await fetchService.getProfile(token);
    //   console.log('response2', response2);
    //   if (response2.status) {
    //     navigation.dispatch(
    //       CommonActions.reset({
    //         index: 1,
    //         routes: [{name: 'Appnavigator'}],
    //       }),
    //     );
    //   }
    // } else {
    //   console.log('response', response);
    //   alert(response.data, [{text: 'Okay'}]);
    // }
  };
  const ref_input1 = useRef();
  const ref_input2 = useRef();

  return (
    // <KeyboardAvoidingView style={{ flex: 1 }}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <StatusBar animated={true} backgroundColor={α(colors.primary, 0.4)} />
        <ImageBackground
          // source={image}
          source={require('../assets/Images/BG-main.png')}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: 'center',
            width: deviceWidth,
            height: deviceHeight,
          }}>
          <View
            style={{
              backgroundColor: α(colors.white, 0.7),
              margin: 25,
              flex: 1,
              paddingHorizontal: 20,
              // paddingTop: 10,
              borderRadius: 40,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingBottom: 20,
                // backgroundColor:''
              }}>
              <View>
                <FastImage
                  source={require('../assets/Images/MUJ-Logo.png')}
                  style={{
                    // flex: 1,
                    // justifyContent: 'center',
                    height: logoHeight,
                    width: logoHeight * logoRatio,
                    marginTop: 15,
                    marginBottom: 10,
                  }}
                />
                {/* <Text style={styles.hitext}>Hi</Text> */}
                <Text style={styles.logintext}>Welcome To MUJ NMS App</Text>
              </View>

              <View
                style={{
                  paddingBottom: 20,
                  backgroundColor: α(colors.primary, 0.85),

                  padding: 10,
                  borderRadius: 25,
                  zIndex: 500,
                }}>
                <Formik
                  initialValues={UserInfo}
                  onSubmit={(values, formikActions) => {
                    handlesLogin(values);
                    setTimeout(() => {
                      formikActions.resetForm();
                      formikActions.setSubmitting(false);
                    }, 2000);
                  }}
                  validationSchema={validationSchema}>
                  {({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => {
                    const { username, password } = values;
                    return (
                      <>
                        <KeyboardAvoidingView
                          style={
                            {
                              // marginBottom: 40,
                            }
                          }>
                          <>
                            <Styledtextinput
                              // onChangeText={setusername}
                              placeholderTextColor={colors.white}
                              title="Enter NMS ID"
                              placeholder="NMS ID"
                              value={username}
                              autoCapitalize="none"
                              icon="email"
                              // keyboardType='email-address'
                              maxLength={15}
                              // keyboardType="numeric"
                              MaterialCommunityIcons
                              error={touched.username && errors.username}
                              onChangeText={handleChange('username')}
                              onBlur={handleBlur('username')}
                              selectionColor={colors.white}
                              password={false}
                              secureTextEntry={false}
                              boxstyle={{ marginTop: 20 }}
                              autoFocus={true}
                            />
                            <Styledtextinput
                              // onChangeText={setpassword}
                              value={password}
                              placeholder="Password"
                              placeholderTextColor={colors.white}
                              autoCapitalize="none"
                              title="Enter your Password"
                              icon="lock"
                              // ref={(input) => { secondTextInput = input; }}
                              // keyboardType='password'
                              error={touched.password && errors.password}
                              onChangeText={handleChange('password')}
                              onBlur={handleBlur('password')}
                              password
                              selectionColor={colors.white}
                              inputstyle={{ marginLeft: 10 }}
                              returnKeyType="done"
                              onSubmitEditing={handleSubmit}
                              ref={ref_input2}
                            />
                          </>
                        </KeyboardAvoidingView>

                        <TouchableOpacity
                          submitting={isSubmitting}
                          onPress={handleSubmit}
                          style={{
                            backgroundColor: '#FFFFFF',
                            padding: 15,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // marginVertical: 20,
                            marginTop: 20,
                            height: 60,
                          }}>
                          {Loading ? (
                            <ActivityIndicator />
                          ) : (
                            <Text
                              style={{
                                fontSize: 20,
                                fontWeight: '700',
                                // fontFamily: 'Roboto',
                                color: colors.primary,
                              }}>
                              Log In
                            </Text>
                          )}
                        </TouchableOpacity>
                      </>
                    );
                  }}
                </Formik>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  backbutton: {
    backgroundColor: colors.white,
    height: 36,
    width: 36,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hitext: {
    fontSize: 40,
    fontWeight: '500',
    color: colors.mytext,
    marginTop: 5,
  },
  logintext: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.mytext,
    marginTop: 5,
    marginBottom: 15,
    textAlign: 'center',
  },
  hline: {
    height: 2,
    flex: 1,
    backgroundColor: colors.white3,
    borderRadius: 40,
  },
  registerbutton: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: 20,
    height: 60,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  registertext: {
    fontSize: 20,
    fontWeight: '700',
    // fontFamily: 'Roboto',
    color: colors.white,
  },
  ortext: {
    fontSize: 17,
    fontWeight: '700',
    // fontFamily: 'Roboto',
    color: colors.white3,
    marginHorizontal: 10,
    marginTop: -5,
  },
  forgettext: {
    fontSize: 11,
    fontWeight: '700',
    // fontFamily: 'Roboto',
    color: colors.white,
    marginTop: 5,
  },
  inputstyle: {
    flexDirection: 'row',
    // width: '100%',
    // height: 40,
    marginHorizontal: 5,
    borderBottomWidth: 1.5,
    borderColor: colors.white,
    alignItems: 'center',
    marginTop: -10,
  },
  customstyle: {
    fontSize: 12,
    fontWeight: '500',
    // fontFamily: 'Roboto',
    color: colors.white,
    // marginTop: 20,
  },
  errortext: {
    color: 'red',
    fontSize: 13.5,
    marginBottom: -10,
    marginLeft: 11,
  },
});
