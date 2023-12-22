import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  Keyboard,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const ComposeScreen = () => {
  const [iconState, setIconState] = useState({
    times: false,
    link: false,
    send: false,
    ellipsis: false,
  });

  const toggleIcon = (iconName) => {
    setIconState((prevState) => ({
      ...prevState,
      [iconName]: !prevState[iconName],
    }));
  };



  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        {renderButton("times", "left")}
        <View style={styles.rightButtonsContainer}>
          {renderButton("link")}
          {renderButton("send")}
          {renderButton("ellipsis-h")}
        </View>
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.textUI}>To </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Recipient Email"
          placeholderTextColor="grey"
          keyboardType="email-address"
        />
        <View style={styles.separator} />
        <Text style={styles.textUI}>From </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Your Email"
          placeholderTextColor="grey"
          keyboardType="email-address"
        />
        <View style={styles.separator} />
        <Text style={styles.textUI}>Subject </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Email Subject"
          placeholderTextColor="grey"
        />
        <View style={styles.separator} />
        <Text style={styles.textUI}>Componse </Text>

        <TextInput
          style={styles.composeInput}
          placeholder="Compose Email here"
          placeholderTextColor="grey"
          multiline={true}
          numberOfLines={10}
        />
      </View>
    </View>
  );

  function renderButton(iconName, position) {
    return (
      <Pressable
        onPress={() => toggleIcon(iconName)}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: "transparent" },
        ]}
      >
        <View style={styles.buttonIcons}>
          <FontAwesomeIcon
            name={iconName}
            size={25}
            color={iconState[iconName] ? "lightgrey" : "darkgrey"}
          />
        </View>
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  button: {
    borderRadius: 0,
    marginHorizontal: 8
  },
  rightButtonsContainer: {
    flexDirection: "row",
  },
  buttonIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  textUI: {
    color: "grey",
    fontSize: 16,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  textInput: {
    borderBottomColor: "grey",
    fontSize: 16,
    color: "black",
    marginBottom: 10,
  },
  separator: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 5,
    marginTop: 8
  },
  composeInput: {
    fontSize: 16,
    color: "black",
    marginBottom: 10,
    textAlignVertical: "top",
  },
});

export default ComposeScreen;
