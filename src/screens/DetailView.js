import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function DetailView({ route, navigation }) {
  const { title, userId } = route.params?.item
  return (
    <View style={styles.container}>
      <Text
        style={styles.detailTitle}>
        {title}
      </Text>
      <Text
        style={styles.detailId}>
        {userId}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  detailTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: '#000'
  },
  detailId:
  {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: '#000'
  },
  container: { flex: 1, backgroundColor: "#f9f9f9f9", justifyContent: "center", alignItems: "center" }
})