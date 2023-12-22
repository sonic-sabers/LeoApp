
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import α from 'color-alpha';
import Tabs from './Tabs';
import colors from '../utils/colors';

const Stack = createStackNavigator();

function AppStackNavigator() {
  return (
    <>
      <StatusBar animated={true} backgroundColor={α(colors.primary, 0.4)} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Tabs">
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </>

  );
}

export default AppStackNavigator;
