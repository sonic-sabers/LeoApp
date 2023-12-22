import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const HeaderTab = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Banter Mail</Text>
      <FontAwesomeIcon name="registered" size={14} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 0,
    marginTop: 35,
    marginBottom: 0,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "red",
  },
  icon: {
    marginLeft: 5,
  },
});

export default HeaderTab;
