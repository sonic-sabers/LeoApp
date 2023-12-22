import * as React from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
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
    <View style={{ flex: 1, justifyContent: 'center', paddingTop: 40 }}>
      <Text
        style={styles.inputTitle}>
        Enter Email
      </Text>
      <TextInput
        label="Email"
        value={Email}
        placeholder='Email'
        placeholderTextColor={colors.lightblack}
        onChangeText={text => setEmail(text)}
        style={styles.inputContainer} />
      <Text
        style={styles.inputTitle}>
        Enter Password
      </Text>
      <TextInput
        label="Password"
        value={Password}
        placeholder='Password'
        secureTextEntry={isSecurePassword}
        placeholderTextColor={colors.lightblack}
        onChangeText={text => setPassword(text)}
        style={styles.inputContainer} />
      <Feather
        style={{ alignSelf: 'flex-end' }}
        name={!isSecurePassword ? 'eye-off' : 'eye'} size={20} color='#000' onPress={() => setisSecurePassword(!isSecurePassword)} />
      <TouchableOpacity
        onPress={() => navigation.navigate('RegistrationScreen')}
        style={{ marginBottom: 8 }}
      >
        <Text
          style={styles.registeredText}>
          Not registered Yet?,Register Now!!
        </Text>
      </TouchableOpacity>
      <Button title='Login Now'
        onPress={handleLogin}
      />
    </View >
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
        style={styles.validLogin}>

        email: admin@leocoders.com , pwd: leocodersA
      </Text>
    </ScrollView >
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
        style={styles.validLogin}>
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

const styles = StyleSheet.create({
  inputContainer: { marginVertical: 12, borderWidth: 1, borderRadius: 4, paddingLeft: 8, alignItems: "center", borderColor: colors.white4 },
  registeredText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: colors.secondary,
    alignSelf: "flex-end"
  },
  validLogin: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: '#000'
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: '#000'
  },
});
