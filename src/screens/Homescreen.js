import { ActivityIndicator, Button, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import AdminView from '../components/AdminView';
import * as localStorage from '../services/localStorage';
import LocationView from '../components/LocationView';


export default function Homescreen({ navigation, route }) {
  const { isAdmin } = route?.params
  const [hasAdminRights, sethasAdminRights] = useState(isAdmin || false)

  const checkIsAdmin = async () => {
    let userData = await localStorage.get('userData');
    userData = JSON.parse(userData);
    sethasAdminRights(userData?.isAdmin)
  }
  useEffect(() => {
    let componentUnmounted = false;
    checkIsAdmin();
    return () => {
      componentUnmounted = true;
    };
  }, []);

  const [FetchingData, setFetchingData] = React.useState({});

  const handlelogout = async () => {
    await localStorage.remove('userData');
    navigation.replace('LoginScreen')
  }

  useEffect(() => {
    let componentUnmounted = false;
    const restoringSession = async () => {
      console.log('response', 1)

      let userData = await localStorage.get('userData');

      if (userData) {
        userData = JSON.parse(userData);
        setFetchingData(userData)
      } else {
        navigation.replace('LoginScreen')
      }
    };
    restoringSession();
    return () => {
      componentUnmounted = true;
    };
  }, []);

  const UserView = () => {
    return (
      <View style={{ padding: 12 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'Roboto',
            color: '#000'
          }}>
          username:  {FetchingData?.username}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'Roboto',
            color: '#000'
          }}>
          About:  {FetchingData?.About}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'Roboto',
            color: '#000'
          }}>
          email:  {FetchingData?.email}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'Roboto',
            color: '#000'
          }}>
          filePath:
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'Roboto',
            color: '#000'
          }}>
          Gender:  {FetchingData?.gender}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'Roboto',
            color: '#000'
          }}>
          habits: {FetchingData?.habits}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'Roboto',
            color: '#000'
          }}>
          number: {FetchingData?.number}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'Roboto',
            color: '#000'
          }}>
          userDOB: {FetchingData?.userDOB}
        </Text>
      </View>
    )
  }

  const imageAddress = 'https://i.pinimg.com/1200x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg'

  return (
    <ScrollView style={{ flex: 1 }}>
      <LocationView />
      <Image
        style={{ height: 50, width: 50, borderRadius: 40, alignSelf: "center", }}
        source={{
          uri: imageAddress
        }}
      />
      {hasAdminRights ?
        <AdminView />
        :
        <></>}
      <UserView />
      <Button title='Logout' onPress={handlelogout} />
    </ScrollView>
  )
}
