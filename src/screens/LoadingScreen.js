import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import { useNavigation } from '@react-navigation/native';
import * as localStorage from '../services/localStorage';

export default function LoadingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    let componentUnmounted = false;
    const restoringSession = async () => {

      let userData = await localStorage.get('userData');
      console.log('userData?.isAdmin', userData)
      if (userData) {
        userData = JSON.parse(userData);

        navigation.replace('Homescreen', { isAdmin: userData?.isAdmin })
      } else {
        navigation.replace('LoginScreen')
      }
      setDataRestored(true);
    };
    restoringSession();
    return () => {
      componentUnmounted = true;
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text
        style={styles.loadinText}>
        Loading
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadinText: {
    fontSize: 30,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: '#000'
  }

})