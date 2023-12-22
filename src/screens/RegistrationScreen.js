import { ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../constants/colors'
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import { RadioButton } from 'react-native-paper';

import * as localStorage from '../services/localStorage';
import FormImagePicker from '../components/FormImagePicker';
import { Formik } from 'formik';
import * as Yup from 'yup';


const CustomInput = (props) => {

  return (<>

    <TextInput
      autoCapitalize="none"
      {...props}
      style={styles.inputContainer}
    />
    {props.error ? (
      <Text style={styles.errortext}>{props.error}</Text>
    ) : (
      <Text style={styles.errortext} />
    )}
  </>)
}

export default function RegistrationScreen({ navigation }) {
  const [date, setDate] = useState(new Date())
  const [userDOB, setuserDOB] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [gender, setGender] = React.useState('');
  const [filePath, setFilePath] = useState({});
  const UserInfo = {
    username: '',
    email: '',
    number: '',
    habits: '',
    About: '',
  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validationSchema = Yup.object({
    username: Yup.string()
      .trim()
      .min(2, 'Username must be of 2 Digits')
      .required('Required!')
      .min(5, 'Minimum 2 characters is required'),
    email: Yup.string()
      .email()
      .required('Email is required!'),
    number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required!'),
    habits: Yup.string()
      .trim(),
    About: Yup.string()
      .trim()
      .min(5, 'About must be of 5 Characters')
      .required('Required!'),
  });
  const handleRegistration = async (values) => {
    setLoading(true);
    if (userDOB === '' || gender == '') {
      Alert.alert('Enter DOB and Gender correctly')
      return
    }
    let userData = {
      ...values,
      userDOB, gender, filePath,
    }
    await localStorage.set('userData', JSON.stringify(userData));
    setLoading(false);
    navigation.replace('Homescreen', { isAdmin: false })
  }

  return (
    <ScrollView style={styles.container}>
      <Text
        style={styles.registrationTitle}>
        Register your details accordingly
      </Text>
      <Formik
        initialValues={UserInfo}
        onSubmit={(values, formikActions) => {
          handleRegistration(values);
          // setTimeout(() => {
          //   formikActions.resetForm();
          //   formikActions.setSubmitting(false);
          // }, 2000);
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const {
            username,
            email,
            number,
            habits,
            About,
          } = values;
          return (
            <>
              <KeyboardAvoidingView>
                <CustomInput
                  label="Name"
                  value={username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  error={touched.username && errors.username}
                />
                <CustomInput
                  label="Email"
                  value={email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email && errors.email}
                />
                <CustomInput
                  label="phone number"
                  value={number}
                  onChangeText={handleChange('number')}
                  onBlur={handleBlur('number')}
                  keyboardType='numeric'
                  error={touched.number && errors.number}
                />
                <CustomInput
                  label="habits"
                  value={habits}
                  onChangeText={handleChange('habits')}
                  onBlur={handleBlur('habits')}
                  error={touched.habits && errors.habits}
                />
                <CustomInput
                  label="About Me"
                  value={About}
                  onChangeText={handleChange('About')}
                  onBlur={handleBlur('About')}
                  multiline
                  numberOfLines={3}
                  error={touched.About && errors.About}
                />
              </KeyboardAvoidingView>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={styles.dobButton}>
                <Text
                  style={styles.dobText}>
                  {userDOB ? '' : 'Enter '}Your DOB {userDOB}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                date={date}
                mode='date'
                minimumDate={new Date("1990-01-01")}
                maximumDate={new Date("2021-12-31")}
                locale
                onConfirm={(date) => {
                  setOpen(false)
                  setuserDOB(date?.toLocaleString().split(',')[0])
                  setDate(date)
                }}
                onCancel={() => {
                  setOpen(false)
                }}
              />
              <FormImagePicker filePath={filePath} setFilePath={setFilePath} />
              <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender}>
                <Text
                  style={styles.genderTitle}>
                  Whats your gender
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-evenly', marginVertical: 8 }}>
                  <View>
                    <Text>Male</Text>
                    <RadioButton value="Male" />
                  </View>
                  <View>
                    <Text>Female</Text>
                    <RadioButton value="Female" />
                  </View>
                  <View>
                    <Text>Others</Text>
                    <RadioButton value="Others" />
                  </View>
                </View>
              </RadioButton.Group>
              <TouchableOpacity
                submitting={isSubmitting}
                onPress={handleSubmit}
                style={{ backgroundColor: colors.secondary, justifyContent: 'center', alignItems: "center", borderRadius: 10, padding: 8 }} >
                <Text
                  style={styles.buttonTitle}>
                  Submit
                  {loading && <ActivityIndicator />}
                </Text>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
      <View style={{ marginBottom: 200 }} />
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  errortext: {
    color: 'red',
    fontSize: 13.5,
    marginTop: -4,
    marginLeft: 11,
  },
  inputContainer: {
    marginVertical: 4, borderRadius: 8, overflow: 'hidden',
    marginTop: 12
  },
  dobButton: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginTop: 8
  },
  dobText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Roboto',
    color: colors.primary
  },
  genderTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: '#000',
    marginTop: 12
  },
  registrationTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: '#000'
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: colors.white
  },
  contaier: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 12,
  }
})