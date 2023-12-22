/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Image, Dimensions } from 'react-native';
import * as localStorage from '../services/localStorage';
// import * as authActions from '../store/actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import useFetchService from '../services/fetchService';
import { colors } from '../constants';
import fetchService from '../services/fetchService';
import FastImage from 'react-native-fast-image';
import α from 'color-alpha';


const logoRatio = 500 / 142;
const logoHeight = 60;
export default function Loadingscreen({}) {
  const navigation = useNavigation();

  const [dataRestored, setDataRestored] = React.useState(false);
  const [FetchingData, setFetchingData] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let componentUnmounted = false;
    const restoringSession = async () => {
      let userData = await localStorage.get('userData');
      if (userData) {
        userData = JSON.parse(userData);
        let token = userData.access;
        const response = await fetchService.getProfile(token);
        if (response.status) {
          navigation.replace('Appnavigator');
        }
      } else {
        navigation.replace('Authnavigator');
      }
      setDataRestored(true);
    };
    restoringSession();
    return () => {
      componentUnmounted = true;
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: α(colors.primary, 0.4),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FastImage
        source={require('../assets/Images/MUJ-Logo.png')}
        style={{
          // flex: 1,
          // justifyContent: 'center',
          height: logoHeight,
          width: logoHeight * logoRatio,
          // marginTop: 15,
          // marginBottom: 10,
        }}
      />
    </View>
  );
}
