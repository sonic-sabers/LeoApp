import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function DetailView({ route, navigation }) {
  console.log('route', route.params)
  const { title, userId } = route.params?.item
  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9f9", justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '400',
          fontFamily: 'Roboto',
          color: '#000'
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '400',
          fontFamily: 'Roboto',
          color: '#000'
        }}>
        {userId}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({})