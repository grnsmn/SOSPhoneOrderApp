import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Modal,
  TouchableHighlight,
  Share,
  TextInput
} from 'react-native'
import Item from '../Item'
//import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appbar, Snackbar } from 'react-native-paper'
import { SearchBar } from 'react-native-elements'
import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: 'AIzaSyCiHpV7RMsd2okgSwqqBra2e8Gc3dlrKCY',
  authDomain: 'sosorderapp.firebaseapp.com',
  databaseURL:
    'https://sosorderapp-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'sosorderapp',
  storageBucket: 'sosorderapp.appspot.com',
  messagingSenderId: '767773027474',
  appId: '1:767773027474:web:7065eaed04359967d2ca4b',
  measurementId: 'G-30X46P77RX'
}
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app() // if already initialized, use that one
}
var database = firebase.database().ref('/BATTERIE/APPLE/IPHONE/')

global.listBatt = '' //Variabile globale per la scrittura dell'ordine finale
global.listResiBatt = '' //Variabile globale per la scrittura della lista dei resi finale

let list = [
  { id: 'S0Z', nome: 'IPHONE 5', nMax: 2 },
  { id: 'v8E', nome: 'IPHONE 5S', nMax: 2 },
  { id: 'v8L', nome: 'IPHONE SE', nMax: 2 },
  { id: '3EV', nome: 'IPHONE 6', nMax: 4 },
  { id: '34K', nome: 'IPHONE 6S', nMax: 4 },
  { id: '5Q6', nome: 'IPHONE 7', nMax: 4 },
  { id: 'NQH', nome: 'IPHONE 8', nMax: 2 },
  { id: 'H9K', nome: 'IPHONE 6 PLUS', nMax: 2 },
  { id: 'PNB', nome: 'IPHONE 7 PLUS', nMax: 2 },
  { id: 'IK8', nome: 'IPHONE 8 PLUS', nMax: 2 },
  { id: 'XVW', nome: 'IPHONE X', nMax: 2 },
  { id: 'XVR', nome: 'IPHONE XR', nMax: 2 },
  { id: 'XSV', nome: 'IPHONE XS', nMax: 2 },
  { id: 'XQ4', nome: 'IPHONE XS MAX', nMax: 2 },
  { id: 'PHI', nome: 'IPHONE 11', nMax: 2 }
]
const sectionList = [
  {
    title: 'To Order',
    data: list
  }
]
export default class BattList extends PureComponent {
  state = {
    modalVisible: false,
    modalVisibleAdd: false,
    clearList: false,
    list: [],
    secList: [],
    listFiltered: sectionList,
    search: '',
    newItemName: '',
    newItemNMax: ''
  }
  getRandomString (length) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var result = ''
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      )
    }
    return result
  }
  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }
  setModalVisibleAdd = visible => {
    this.setState({ modalVisibleAdd: visible })
  }
  // constructor() { //IMPLEMENTAZIONE DOWNLOAD LISTA DA FIREBASE
  //   super()
  //   var items = [] 
  //   database.orderByKey().on('value', snap => {
  //     const tmp = snap.val()
  //     if (tmp != null) {
  //       for (const [key, childData] of Object.entries(tmp)) {
  //         //console.log(`${key}: ${childData.id}`)
  //         items.push({ id: childData.id, nome: key, nMax: childData.nMax })
  //       }
  //     }
  //   })
  //     this.state.list = items
  //     this.state.listFiltered = [
  //       {
  //         title: 'To Order',
  //         data: items
  //       }
  //     ]
  //   // console.log(this.state.list)
  // }

  renderRow = ({ item }) => (
    <Item
      NameItem={item.nome}
      nMax={item.nMax}
      id={item.id}
      compat={item.compat}
      codice={item.codice}
      pathDB={'BATTERIE/APPLE/IPHONE/'}
    />
  )
  search (model) {
    this.setState({
      search: model,
      listFiltered: [
        {
          title: 'To order',
          data: list.filter(elem => elem.nome.includes(model.toUpperCase()))
        }
      ]
    })
  }
  // addItem (newItem, newNMax) {
  //   console.log(newItem)
  //   console.log(newNMax)
  //   database.update({
  //     [newItem]:{
  //       id:this.getRandomString(3),
  //       n: 0,
  //       resi: 0,
  //       nMax: newNMax
  //     }
  //   })
  //   this.setModalVisibleAdd(!this.state.modalVisibleAdd)
  // }
  onShareBatt = async () => {
    try {
      // const data = new Date()
      // const tomorrow = new Date(data)
      // tomorrow.setDate(tomorrow.getDate() + 1)
      // if (tomorrow.getDay() == 0) {
      //   tomorrow.setDate(tomorrow.getDate() + 1)
      // }
      const result = await Share.share({
        message:
          // 'Ordine del ' +
          // tomorrow.getDate() +
          // '/' +
          // parseInt(tomorrow.getMonth() + 1) +  //BISOGNA EFFETTUARE LA SOMMA PERCHE getMonth restituisce numeri da 0 a 11 in stringa così che corrisponda alla data italiana
          // '/' +
          // tomorrow.getFullYear() +
          // '\n\n' +
          global.listBatt +
          (global.resi_Batt_IP.size == 0
            ? ''
            : '\nResi:\n' + global.listResiBatt)
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message)
    }
  }
  stampList () {
    global.listBatt = '' //SVUOTA LA LISTA BATTERIA PRIMA DI UN NUOVO CONCATENAMENTO DI AGGIORNAMENTO DELLA LISTA
    global.store_Batt.forEach((element,key) => {
      global.listBatt += element.n + 'x ' + ' BATT ' + element.name + (element.name.includes('SAMSUNG')==true?' ['+key+']':'')+ '\n'
    })
    global.listResiBatt = ''
    global.resi_Batt_IP.size == 0
      ? (global.listResiBatt = '')
      : global.resi_Batt_IP.forEach(element => {
          global.listResiBatt +=
            element.n + 'x ' + ' BATT ' + element.name + '\n'
        })
    this.onShareBatt()
  }
  clearListBatt () {
    //Azzera lista ordine
    global.store_Batt.clear()
    global.listBatt = ''
    //Azzera lista resi
    global.resi_Batt_IP.clear()
    global.listResiBatt = ''
    list.forEach(element => {
      database.update({
        [String(element.nome)]: {
          id: element.id,
          n: 0,
          resi: 0,
          nMax: element.nMax
        }
      })

      firebase
        .database()
        .ref('/BATTERIE/ORDER/' + element.nome)
        .remove()

      //AZZERA TUTTI GLI ELEMENTI NELLO STORE CON PERSISTENZA LOCALE
      const item = {
        id: element.id,
        nomeItem: element.nome,
        contatore: 0,
        NumResi: 0
      }
      // AsyncStorage.mergeItem(element.id, JSON.stringify(item))
    })
    this.setState({ clearList: !this.state.clearList })
  }
  render () {
    const storeBatt = [...global.store_Batt.values()].sort()
    return (
      <View style={styles.container}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                IN ORDINE {'\n\n'}
                {storeBatt.map(function (element) {
                  return String(element.n + 'x ' + element.name + '\n')
                })}
              </Text>
              <Text style={styles.modalTextResi}>
                RESI {'\n'}
                {[...global.resi_Batt_IP.values()]
                  .sort()
                  .map(function (element) {
                    return String(element.n + 'x ' + element.name + '\n')
                  })}
              </Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}
              >
                <Text style={styles.textStyle}>Chiudi</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisibleAdd}
          onRequestClose={() => {
            this.setModalVisibleAdd(!this.state.modalVisibleAdd)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Elemento da aggiungere {''}</Text>
              <TextInput
                style={styles.inputItem}
                placeholderTextColor={'white'}
                placeholder='NOME ITEM'
                onChangeText={text =>
                  this.setState({ newItemName: text.toUpperCase() })
                }
              />
              <TextInput
                style={styles.inputItem}
                placeholderTextColor={'white'}
                placeholder='N.MAX'
                onChangeText={text =>
                  this.setState({ newItemNMax: text.toUpperCase() })
                }
              />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  this.addItem(this.state.newItemName, this.state.newItemNMax)
                }}
              >
                <Text style={styles.textStyle}>Chiudi</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Snackbar
          visible={this.state.clearList}
          onDismiss={() => this.setState({ clearList: false })}
          duration={700}
          style={{ backgroundColor: '#252849', textAlign: 'center' }}
        >
          {' '}
          LISTA AZZERATA{' '}
        </Snackbar>
        <SectionList
          sections={this.state.listFiltered}
          renderItem={this.renderRow}
          refreshing={this.state.refresh}
        ></SectionList>
        <SearchBar
          autoComplete='tel-device'
          placeholder='Cerca...'
          onChangeText={text => this.search(text)}
          value={this.state.search}
          containerStyle={styles.container_input}
          inputContainerStyle={styles.input}
        />
        <Appbar style={styles.bottom}>
          <Appbar.Action
            style={{ flex: 1 }}
            icon='format-list-bulleted'
            color={'gold'}
            onPress={() => this.setModalVisible(true)}
          />
          <Appbar.Action
            style={{ flex: 1 }}
            icon='delete'
            color={'red'}
            onPress={() => {
              this.clearListBatt()
            }}
          />
          {/* <Appbar.Action
            style={{ flex: 1 }}
            icon='plus'
            color={'white'}
            onPress={() => {
              this.setModalVisibleAdd(true)
            }}
          /> */}
          <Appbar.Action
            style={{ flex: 1 }}
            icon='send'
            onPress={() => {
              this.stampList()
            }}
          />
        </Appbar>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'row',
    backgroundColor: '#181818',
    padding: 5
    //paddingTop: StatusBar.length
  },
  buttonContainer: {
    flex: 1,
    borderWidth: 2
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff'
  },
  bottom: {
    // borderTopWidth: 2,
    borderRadius: 15,
    backgroundColor: '#252850',
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: '#252850',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
    color: 'gold'
  },
  modalTextResi: {
    marginBottom: 15,
    textAlign: 'left',
    color: 'lightgreen'
  },
  container_input: {
    backgroundColor: '#2196F3',
    // borderColor: '#252850',
    // borderWidth: 0.5,
    //margin: 3,
    padding: 3,
    // height: 40,
    borderRadius: 10
  },
  input: {
    // borderColor: '#252850',
    // borderWidth: 0.5,
    // marginTop: 3,
    // height: 40,
    borderRadius: 10
  },
  inputItem: {
    backgroundColor: '#313131',
    borderRadius: 10,
    borderColor: '#2196F3',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'white'
  }
})
