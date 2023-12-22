// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import colors from '../constants/colors'
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import Homescreen from './Homescreen';
// import RegistrationScreen from './RegistrationScreen';


// const Tab = createMaterialTopTabNavigator();
// export default function LoginScreen() {
//   return (
//     <View style={{ flex: 1, backgroundColor: colors.primary }}>

//       <Tab.Navigator
//         initialRouteName="Feed"
//         screenOptions={{
//           tabBarActiveTintColor: '#e91e63',
//           tabBarLabelStyle: { fontSize: 12 },
//           tabBarStyle: { backgroundColor: 'powderblue' },
//         }}
//       >
//         <Tab.Screen
//           name="Feed"
//           component={Homescreen}
//           options={{ tabBarLabel: 'Home' }}
//         />
//         <Tab.Screen
//           name="Notifications"
//           component={RegistrationScreen}
//           options={{ tabBarLabel: 'Updates' }}
//         />

//       </Tab.Navigator>
//       <Text
//         style={{
//           fontSize: 20,
//           fontWeight: '400',
//           fontFamily: 'Roboto',
//           color: '#000'
//         }}>
//         Login here
//       </Text>
//       <Text>LoginScreen</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({})
import * as React from 'react';
import { Alert, Button, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import * as localStorage from '../services/localStorage';


const Loginform = ({ emailid, password, isAdmin }) => {
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [isSecurePassword, setisSecurePassword] = React.useState(false);
  const UserInfo = {
    username: 'Amasn',
    email: 'asccs@123',
    number: '523423424',
    habits: 'Crazzy',
    About: 'AMazing',
    userDOB: '29-11', gender: 'Male', filePath: 'sdcsdcsdc',
    isAdmin
  };

  const navigation = useNavigation();
  const handleLogin = async () => {
    if (emailid === Email && password === Password) {
      setTimeout(() => {
        setEmail('')
        setPassword('')
      }, 2000);
      await localStorage.set('userData', JSON.stringify(UserInfo));
      navigation.replace('Homescreen', { isAdmin })
      return
    }
    else {
      Alert.alert('Please enter correct credentils')
    }
  }

  return (<>
    <View style={{ flex: 1, justifyContent: 'center', }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '400',
          fontFamily: 'Roboto',
          color: '#000'
        }}>
        Enter Email
      </Text>
      <TextInput
        label="Email"
        value={Email}
        placeholder='Email'
        placeholderTextColor={colors.lightblack}
        onChangeText={text => setEmail(text)}
        style={{ marginVertical: 12, borderWidth: 1, borderRadius: 4, paddingLeft: 8, alignItems: "center", borderColor: colors.white4 }} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '400',
          fontFamily: 'Roboto',
          color: '#000'
        }}>
        Enter Password
      </Text>
      <TextInput
        label="Password"
        value={Password}
        placeholder='Password'
        secureTextEntry={isSecurePassword}
        placeholderTextColor={colors.lightblack}
        onChangeText={text => setPassword(text)}
        style={{ marginVertical: 12, borderWidth: 1, borderRadius: 4, paddingLeft: 8, alignItems: "center", borderColor: colors.white4 }} />
      <Feather
        style={{ alignSelf: 'flex-end' }}
        name={!isSecurePassword ? 'eye-off' : 'eye'} size={20} color='#000' onPress={() => setisSecurePassword(!isSecurePassword)} />
      <TouchableOpacity
        onPress={() => navigation.navigate('RegistrationScreen')}
        style={{ marginBottom: 8 }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            fontFamily: 'Roboto',
            color: colors.secondary,
            alignSelf: "flex-end"
          }}>
          Not registered Yet?,Register Now!!
        </Text>
      </TouchableOpacity>
      <Button title='Login Now'
        onPress={handleLogin}
      />
    </View>
  </>)
}

function AdminLogin({ navigation }) {
  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: colors.primary
    }}>
      <Loginform emailid='admin@leocoders.com' password='leocodersA' isAdmin />
      <Text
        style={{
          fontSize: 14,
          fontWeight: '400',
          fontFamily: 'Roboto',
          color: '#000'
        }}>
        email:admin@leocoders.com, pwd: leocodersA
      </Text>
    </ScrollView>
  );
}

function UserLogin() {
  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: colors.primary
    }}>
      <Loginform emailid='user@leocoders.com' password='leocodersU' isAdmin={false} />
      <Text
        style={{
          fontSize: 12,
          fontWeight: '400',
          fontFamily: 'Roboto',
          color: '#000'
        }}>
        email:user@leocoders.com , pwd: leocodersU
      </Text>
    </ScrollView>
  );
}


const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary, padding: 12 }}>
      <Tab.Navigator
        initialRouteName="AdminLogin"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarInactiveTintColor: colors.color2,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: 'powderblue' },
        }}
      >
        <Tab.Screen
          name="AdminLogin"
          component={AdminLogin}
          options={{ tabBarLabel: 'Admin' }}
        />
        <Tab.Screen
          name="UserLogin"
          component={UserLogin}
          options={{ tabBarLabel: 'User' }}
        />
      </Tab.Navigator>
    </View>

  );
}
export default function App() {
  return (
    <MyTabs />
  );
}
