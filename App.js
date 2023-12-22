import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './src/screens/Homescreen';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import { SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import LoadingScreen from './src/screens/LoadingScreen';
import DetailView from './src/screens/DetailView';
const Stack = createNativeStackNavigator();



function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="LoadingScreen" >
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
            <Stack.Screen name="DetailView" component={DetailView} />
            <Stack.Screen name="Homescreen"
              initialParams={{ isAdmin: false }}
              component={Homescreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
}

export default App;
