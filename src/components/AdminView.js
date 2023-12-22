// const styles = StyleSheet.create({})
import { ActivityIndicator, Button, FlatList, Modal, Pressable, StyleSheet, Switch, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


export default function AdminView() {
  const navigation = useNavigation();
  const [fetchedState, setUsersData] = useState(null);
  const [loading, setLoading] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTask, setActiveTask] = useState(false);
  useEffect(() => {
    setTimeout(() => getData(), 2500);
  }, [])

  const getData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      const slicedArray = data?.slice(0, 5);
      console.log('data', slicedArray)
      setUsersData(slicedArray)
      setLoading(false)
    }
    catch (error) {
      console.log(error)
      setLoading(false)

    }
    finally {
      setLoading(false)

    }
  }
  const updateTask = (item) => fetchedState?.map(obj => {

    if (obj.id == item.id) {
      obj.completed = !obj.completed;
    }
    return obj;
  })
  const UpdateTaskTitle = () => fetchedState?.map(obj => {
    console.log('activeTask', activeTask, inputValue)
    if (obj.id == activeTask) {
      obj.title = inputValue;
    }
    return obj;
  })

  const handleUpdateTask = () => {
    setUsersData(UpdateTaskTitle)
    setModalVisible(false)
  }
  const deleteTask = (todos) => fetchedState?.map(obj => {
    const updatedHero = fetchedState.filter(item => item.id !== todos.id);
    setUsersData(updatedHero)

  });

  const handleAddTask = () => {

  }

  const toggleSwitch = (item) => {
    console.log('updateTask', item)
    setUsersData(updateTask(item))
    // setIsEnabled(previousState => !previousState)
  }

  const emptyPlaceholder = () => {
    return (
      loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
        <ActivityIndicator />
      </View > : <></>

    )
  }

  return (
    <View>
      <FlatList
        ItemSeparatorComponent={
          Platform.OS !== 'android' &&
          (({ highlighted }) => (
            <View
              style={[styles.separator, highlighted && { marginLeft: 0 }]}
            />
          ))
        }
        data={fetchedState}
        ListEmptyComponent={emptyPlaceholder}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => navigation.navigate('DetailView', { item })}
            onShowUnderlay={separators.highlight}
            style={styles.itemContainer}
            onHideUnderlay={separators.unhighlight}>
            <View style={[{
              backgroundColor: 'white', shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,

              elevation: 10, padding: 12, borderRadius: 8, justifyContent: 'space-between',
            }, item.completed ? { backgroundColor: colors.secondary } : {}]}>
              <Text
                style={[{
                  fontSize: 20,
                  fontWeight: '400',
                  fontFamily: 'Roboto',
                  color: '#000',
                  marginVertical: 4
                }, item.completed ? { color: colors.primary } : {}]}>
                {item.title}
              </Text>
              <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                <AntDesign name='edit' size={30} color='#888' onPress={() => (setActiveTask(item.id), setModalVisible(true), setInputValue(item.title))} />
                <AntDesign name='delete' size={30} color='#900' onPress={() => deleteTask(item)} />
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={item.completed ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => toggleSwitch(item)}
                  value={item.completed}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
   
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>EDIT TASK</Text>

              <TextInput
                value={inputValue}
                onChangeText={setInputValue}
                style={{ borderWidth: 1, borderRadius: 8, borderColor: "red", padding: 4, marginVertical: 10 }}
              />

              <Button title='Update Task' onPress={handleUpdateTask} />
            </View>
          </View>
        </Modal>

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#f1f1f1f1',
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
    // padding: 10

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#00000050'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    marginHorizontal: 10
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})