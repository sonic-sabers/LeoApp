import { View, Modal, Text } from 'react-native';
import * as localStorage from '../services/localStorage';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn } from 'react-native-reanimated';
import LoginStack from './LoginStack';
import AppStackNavigator from './AppStackNavigator';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Stack = createStackNavigator();
export default function LaunchStack() {

  const [dataRestored, setDataRestored] = useState(false);
  const [FetchingData, setFetchingData] = useState(true);
  const dispatch = useDispatch();
  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      _getCurrentUserInfo();
      return 'AppStack'
    } else {
      return 'LoginStack'
    }
  };
  const _getInitialRoute = () => {
    if (dataRestored) {
      return 'AppStack'
    } else {
      return 'LoginStack'
    }
  }
  const _checkHasUserData = async () => {
    let userData = await localStorage.get('userData');
    // Initialising the data and double cheking it
    if (userData) {
      userData = JSON.parse(userData);
      setDataRestored(userData)
    }
    else if (!userData) {
      _isSignedIn()
    }
    else {
      setDataRestored(null)
    }
    setFetchingData(false)

  }

  useEffect(() => {
    let componentUnmounted = false;
    _checkHasUserData();
    return () => {
      componentUnmounted = true;
    };
  }, []);



  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      let userData = info.user ? info.user : {};
      await localStorage.set('userData', JSON.stringify(userData));
    } catch (error) {

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (
        error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };
  
  // TO login based to previous user login
  return !!dataRestored || !FetchingData ? (
    <>
      <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(750)}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={_getInitialRoute()}>
          <Stack.Screen
            name="LoginStack"
            component={LoginStack}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AppStack"
            component={AppStackNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </Animated.View>
    </>
  ) : (
    <>
      <Animated.View exiting={FadeIn.duration(500)}>
        <Modal visible={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '400',
                fontFamily: 'Roboto',
                color: '#000'
              }}>
              This is a Loading Modal
            </Text>
          </View>
        </Modal>
      </Animated.View>
    </>
  )
}

