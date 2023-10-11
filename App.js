import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';




export default function App() {

  const [contact, setContact] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );
      if (data.length > 0) {
        setContact(data);
      }
    }
  }
 
  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of Contacts</Text>
      
      <FlatList
        style={styles.flatlist}
        data={contact}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <View style={styles.columns}>
          <Text style={styles.list}>{item.name}</Text>
          {item.phoneNumbers && item.phoneNumbers.length > 0 && (
            <Text style={styles.list2}>
              Phone: {item.phoneNumbers[0].number}
            </Text>
          )}
          </View>
        )}
      /> 
      <TouchableOpacity style={styles.button} title="Contacts" onPress={getContacts} >
        <Text style={styles.buttonText}>Get Contacts</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 170,
    height: 55,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor:'gold',
    textAlign:'center',
    color: 'black',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 50,
    marginBottom: 30,
    marginTop: 20
  },
  buttonText: {
    fontSize: 20,
    fontWeight:'900',
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    paddingVertical: 10
  },
  flatlist: {
    marginTop: 40,
    flexDirection: 'column',
    color: 'white'
    
  },
  list: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  list2: {
    fontSize: 10,
    fontWeight: '500',
    color: 'white',
  },
  header: {
    fontSize: 50,
    marginTop: 15,
    color: 'white'

  }
});
