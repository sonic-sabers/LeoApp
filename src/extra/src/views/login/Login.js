import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import {
  GoogleSignin,
  GoogleSigninButton,
  NativeModuleError,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import * as localStorage from '../../services/localStorage';
import config from '../../../config';

export default function Login({ navigation }) {

// Setting up google sign in config
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: config.webClientId,
      offlineAccess: false
    });
  }, []);
  
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      let userData = userInfo ? userInfo : {};
      // Setting up user data and navigating
      await localStorage.set('userData', JSON.stringify(userData));
      if (userData?.user?.id) {
        navigation.replace('AppStack')
      }
    } catch (error) {
      console.log('Message', JSON.stringify(error));
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
  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={{ width: 312, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={_signIn}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
})