import { ActivityIndicator, Button, FlatList, Modal, Pressable, StyleSheet, Switch, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import AdminView from '../components/AdminView';
import * as localStorage from '../services/localStorage';
import LocationView from '../components/LocationView';

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: '400',
          fontFamily: 'Roboto',
          color: '#000'
        }}>
        Loading
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({})