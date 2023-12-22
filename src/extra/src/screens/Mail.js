import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, TextInput, SafeAreaView, Pressable, Alert, View, Button, Keyboard } from "react-native";
import List from "../components/list";
import SearchBar from "../components/SearchBar";
import TempMails from "../components/data";
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import HeaderCarousel from "../views/component/HeaderCarousel";
import { screen } from "../utils/helper";



const MailScreen = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [Loading, setLoading] = useState(false);



  const fetchdata = async () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        setFilteredDataSource(TempMails);
        setMasterDataSource(TempMails);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('An issue occured while fetching Mails');
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchdata();
  }, []);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const onRefresh = () => {
    setLoading(true);
    fetchdata();
  };


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
    <SafeAreaView style={styles.root}>
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
              value={search}
              onChangeText={searchFilterFunction}
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
          {!!search && (
            <Entypo
              name="cross"
              size={20}
              color="black"
              style={{ padding: 1, marginLeft: -20 }}
              onPress={() => {
                searchFilterFunction("");
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
                searchFilterFunction("");
                Keyboard.dismiss();
                setisInputActive(false);
              }}
            />
          </View>
        )}
      </View>
      <List
        searchPhrase={search}
        data={filteredDataSource}
        onRefresh={onRefresh}
        refreshing={Loading}
        isInputActive={isInputActive}
        setSearchPhrase={searchFilterFunction}
      />
    </SafeAreaView>
  );
};

export default MailScreen;

const styles = StyleSheet.create({
  root: {
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
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
