
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import α from 'color-alpha';
import colors from '../utils/colors';
import Login from '../views/login/Login';

const Stack = createStackNavigator();

function LoginStack() {
  return (
    <>
      <StatusBar animated={true} backgroundColor={α(colors.primary, 0.4)} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </>

  );
}

export default LoginStack;
