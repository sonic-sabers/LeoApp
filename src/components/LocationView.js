
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import colors from '../constants/colors';
// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
const LocationView = () => {
  // state to hold location
  const [location, setLocation] = useState(false);
  // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
    console.log(location);
  };
  // Function to Send Location to twitter
  const sendLocation = () => {
    try {
      if (location) {
        const tweet = `latitude is ${location.coords.latitude} and longitude is ${location.coords.longitude}`;
        const url = `https://twitter.com/intent/tweet?text=${tweet}`;
        Linking.openURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>

      <Text
        style={{
          fontSize: 20,
          fontWeight: '400',
          fontFamily: 'Roboto',
          color: colors.black,
          marginVertical: 20
        }}>
        Welcome to Homescreen
      </Text>
      {!!location.coords && <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'Roboto',
            color: colors.black
          }}>
          Latitude: {location ? location.coords.latitude : null}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'Roboto',
            color: colors.black,
            marginBottom: 8
          }}>
          Longitude: {location ? location.coords.longitude : null}
        </Text>
      </View>}
      <TouchableOpacity
        onPress={getLocation}
        style={{ backgroundColor: colors.secondary, padding: 12, justifyContent: "center", alignItems: 'center', borderRadius: 12 }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'Roboto',
            color: colors.white
          }}>
          Mark Attendence
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    padding: 12
  },
});
export default LocationView;