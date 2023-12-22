import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import AdminView from '../components/AdminView';
import * as localStorage from '../services/localStorage';
import LocationView from '../components/LocationView';


export default function Homescreen({ navigation, route }) {
  const { isAdmin } = route?.params
  const [hasAdminRights, sethasAdminRights] = useState(isAdmin || false)
  const [FetchingData, setFetchingData] = React.useState({});

  const handlelogout = async () => {
    await localStorage.remove('userData');
    navigation.replace('LoginScreen')
  }

  useEffect(() => {
    let componentUnmounted = false;
    const restoringSession = async () => {
      let userData = await localStorage.get('userData');
      if (userData) {
        userData = JSON.parse(userData);
        setFetchingData(userData)
        sethasAdminRights(userData?.isAdmin)

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
          style={styles.detailsTitle}>
          username:  {FetchingData?.username}
        </Text>
        <Text
          style={styles.detailsTitle}>
          About:  {FetchingData?.About}
        </Text>
        <Text
          style={styles.detailsTitle}>
          email:  {FetchingData?.email}
        </Text>
        <Text
          style={styles.detailsTitle}>
          filePath:
        </Text>
        <Text
          style={styles.detailsTitle}>
          Gender:  {FetchingData?.gender}
        </Text>
        <Text
          style={styles.detailsTitle}>
          habits: {FetchingData?.habits}
        </Text>
        <Text
          style={styles.detailsTitle}>
          number: {FetchingData?.number}
        </Text>
        <Text
          style={styles.detailsTitle}>
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


const styles = StyleSheet.create({
  detailsTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: '#000'
  }
});