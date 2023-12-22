import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import * as localStorage from '../services/localStorage';
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const SettingsScreen = ({ navigation }) => {
  const [switchAccountsPressed, setSwitchAccountsPressed] = useState(false);
  const [logOutPressed, setLogOutPressed] = useState(false);
  const Logout = async () => {
    await localStorage.remove('userData');
    let userData = {};
    userData.token = '';
    userData.sessionExpired = true;
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
    navigation.replace('LoginStack')
  };
  return (
    <View style={styles.root}>
      {/* Section 1 */}
      <Text style={styles.sectionHeading}>Account</Text>
      {renderButton("user", "Profile", "orange")}
      {renderButton("shield", "Security", "grey")}
      {renderButton("lock", "Blocked Users", "gold")}

      {/* Section 2 */}
      <Text style={styles.sectionHeading}>General</Text>
      {renderButton("mobile", "Appearance", "white")}
      {renderButton("globe", "Language", "lightblue")}

      {/* Section 3 */}
      <Text style={styles.sectionHeading}>Notifications</Text>
      {renderButton("bell", "Email Notifications", "lightyellow")}
      {renderButton("comment", "Showing Previews", "lightgreen")}
      {renderTextButton(
        "Switch Accounts",
        switchAccountsPressed ? "darkgrey" : "grey",
        () => setSwitchAccountsPressed(!switchAccountsPressed)
      )}
      {renderTextButton("Log Out", logOutPressed ? "red" : "blue", () =>
        Logout()
      )}
    </View>
  );

  function renderButton(iconName, text, color) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "grey" : "darkgrey" },
        ]}
      >
        <View style={styles.buttonContent}>
          <View style={styles.buttonIcons}>
            <FontAwesomeIcon name={iconName} size={20} color={color} />
          </View>
          <Text style={styles.subheading}>{text}</Text>
          <View style={styles.arrowIcons}>
            <FontAwesomeIcon name="play" size={20} color={"lightgrey"} />
          </View>
        </View>
      </Pressable>
    );
  }

  function renderTextButton(text, color, onPress) {
    return (
      <Pressable onPress={onPress}>
        <Text style={[styles.textButton, { color: color }]}>{text}</Text>
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    color: "black",
  },
  subheading: {
    fontSize: 18,

  },
  button: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    width: 360,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 3,
    paddingVertical: 12,
    marginVertical: 4
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  buttonIcons: {
    flexDirection: "row",
    marginRight: 10,
  },
  arrowIcons: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  textButton: {
    fontSize: 18,
    marginTop: 0,
    padding: 12,
  },
});

export default SettingsScreen;
