import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, Pressable } from "react-native";
// import { Feather, Entypo } from "@expo/vector-icons";
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { screen } from "../utils/helper";
import colors from "../utils/colors";
const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  onRefresh,
  onSearch,
}) => {
  const handleSearch = () => {
    // Call the onSearch callback function with the current searchPhrase
    onSearch(searchPhrase);
    // Dismiss the keyboard
    Keyboard.dismiss();
  };
  const inputRef = useRef(null);
  const [isInputActive, setisInputActive] = useState(false);
  const ref = useRef(null);
  const handleButtonPress = () => {
    // Focus the input
    inputRef?.current?.focus();
  };
  return (
    <View style={styles.container}>
      <Pressable

        onPress={() => handleButtonPress()}
        style={
          isInputActive ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Feather
            name="search"
            size={20}
            color="black"
            style={{ marginLeft: 1 }}
          />
          {/* Input field */}
          <TextInput
            useRef={inputRef}
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={colors.lightblack}
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            onFocus={() => {
              setisInputActive(true);
            }}
            onBlur={() => {
              setisInputActive(false);
            }}
            onSubmitEditing={handleSearch} // This handles the search on "Return" key press
          />
        </View>
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {!!searchPhrase && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1, marginLeft: -20 }}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )}
      </Pressable>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {!!isInputActive && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              onRefresh()
              setSearchPhrase("");
              Keyboard.dismiss();
              setisInputActive(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: screen.width - 40,

    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    // width: "80%",
    width: screen.width - 100,
    marginRight: 4,
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
  },
});
