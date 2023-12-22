import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, Keyboard } from "react-native";
import { HeaderCarousel } from "../views/component/HeaderCarousel";
import colors from "../utils/colors";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{details}</Text>
  </View>
);

// the filter
const List = ({ searchPhrase, isInputActive, data, search, setSearchPhrase, onRefresh, refreshing }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Item name={item.name} details={item.details} />;
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} details={item.details} />;
    }
    // filter of the description
    if (
      item.details
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} details={item.details} />;
    }
  };
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const HeaderPart = React.memo(props => {
    console.log("Greeting Comp render");
    return <View style={{}}>
      {/* To hide the carousel when keyboard is active */}
      {!isKeyboardVisible || !isInputActive ?
        <HeaderCarousel /> : <></>
      }
    </View>;
  });

  return (
    <View style={styles.list__container}>

      <View
      // onStartShouldSetResponder={() => {
      //   setClicked(false);
      // }}
      >
        <FlatList
          ListHeaderComponent={<HeaderPart />}
          data={data}
          style={{ paddingBottom: 100 }}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    // height: "85%",
    // width: "100%",

  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
    color: colors.mytext
  },
  details: {
    fontSize: 14,
    fontStyle: "italic",
    color: colors.lightblack
  },
});
