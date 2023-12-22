import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewList from './src/screens/ViewList';
import CreateTodo from './src/screens/CreateTodo';
import DetailView from './src/screens/DetailView';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { hi: 'hello' })}
      />
    </View>
  );
}

function DetailsScreen({ navigation, route }) {
  console.log('route', route.params)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.navigate('root', {
        screen: 'settings', params: {
          hi: 'hello'
        }
      })} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />

    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"  >
        <Stack.Screen name="ViewList" component={ViewList} />
        <Stack.Screen name="CreateTodo" component={CreateTodo} />
        <Stack.Screen name="DetailView" component={DetailView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
