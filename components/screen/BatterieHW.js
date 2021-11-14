import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Modal,
  TouchableHighlight
} from 'react-native'
//import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appbar, Snackbar } from 'react-native-paper'
import BattList from './Batterie'
import Item from '../Item'
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
var database = firebase.database().ref('/BATTERIE/HUAWEI/')

const list = [
  { id: 'cvG', nome: 'HUAWEI P8', compat: '', nMax: 2, codice: 'HB3447A9EBW' },
  {
    id: 'po5',
    nome: 'HUAWEI P8 LITE',
    compat: '',
    nMax: 2,
    codice: 'HB3742A0EZC+'
  },
  {
    id: 'cfV',
    nome: 'HUAWEI P9',
    compat:
      'P9 LITE \n P8 LITE 2017 \n P10 LITE \n P20 LITE \n HONOR 8 \n P SMART \n HONOR 9 LITE \n Y6 2018 \n GT3 \n HONOR 7A ',
    nMax: 5,
    codice: 'HB366481EC​W'
  },
  {
    id: 'cfZ',
    nome: 'HUAWEI P9 PLUS',
    compat: '',
    nMax: 2,
    codice: 'HB376883ECW'
  },
  {
    id: 'dtZ',
    nome: 'HUAWEI PSMART 2019',
    compat: 'HONOR 10 LITE \n P SMART PLUS 2019',
    nMax: 2,
    codice: 'HB396286ECW'
  },
  {
    id: 'cf0',
    nome: 'HUAWEI P10',
    compat: 'HONOR 9',
    nMax: 2,
    codice: 'HB386280ECW'
  },
  {
    id: 'z9y',
    nome: 'HUAWEI P20',
    compat: 'HONOR 10',
    nMax: 2,
    codice: 'HB396285ECW'
  },
  {
    id: 'S9y',
    nome: 'HUAWEI P30',
    compat: 'MATE 20 PRO',
    nMax: 2,
    codice: 'HB436380ECW'
  },
  {
    id: 'T71',
    nome: 'HUAWEI MATE 9',
    compat: 'MATE 9 PRO \n Y7 2017 \n Y7 2019',
    nMax: 2,
    codice: 'HB406689ECW'
  },
  {
    id: 'T72',
    nome: 'HUAWEI MATE 10',
    compat: 'MATE 10 PRO \n P20 PRO \n P SMART Z \n P30 \n HONOR VIEW 20\n MATE 20',
    nMax: 2,
    codice: 'HB436486ECW '
  },
  {
    id: 'F79',
    nome: 'HUAWEI MATE 10 LITE',
    compat: 'P30 LITE \n HONOR 7X \n P SMART PLUS',
    nMax: 2,
    codice: 'HB356687ECW'
  },
  {
    id: 'x1L',
    nome: 'HUAWEI MATE 20 LITE',
    compat: 'P10 PLUS \n HONOR VIEW 10 \n NOVA 5T',
    nMax: 2,
    codice: 'HB386589ECW'
  },
  {
    id: 'x76',
    nome: 'HUAWEI MATE S',
    compat: '',
    nMax: 2,
    codice: 'HB436178EBW'
  },
  {
    id: 'x78',
    nome: 'HUAWEI NOVA YOUNG',
    compat: 'HUAWEI Y6 PRO 2017 \n Y5 2018 \n Y6 2019 \n Y6S',
    nMax: 2,
    codice: 'HB405979ECW'
  }
]
const sectionList = [
  {
    title: 'To Order',
    data: list
  }
]
export default class BattListHW extends BattList {
  state = {
    modalVisible: false,
    clearList: false,
    listFiltered: sectionList,
    search: ''
  }
  renderRow = ({ item }) => (
    <Item
      NameItem={item.nome}
      nMax={item.nMax}
      id={item.id}
      compat={item.compat}
      codice={item.codice}
      pathDB={"BATTERIE/HUAWEI/"}
    />
  )
  search (model) {
    this.setState({
      search: model,
      listFiltered: [
        {
          title: 'To order',
          data: list.filter(elem => elem.nome.includes(model.toUpperCase()))
        },
        {
          title: 'To order',
          data: list.filter(elem => elem.codice.includes(model.toUpperCase()))
        },
        {
          title: 'To order',
          data: list.filter(elem => elem.compat.includes(model.toUpperCase()))
        }
      ]
    })
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
          n: 0,
          resi: 0,
          codice: element.codice
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
      //AsyncStorage.mergeItem(element.id, JSON.stringify(item))
    })
    this.setState({ clearList: !this.state.clearList })
  }
  render () {
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
                {[...global.store_Batt.values()].sort().map(function (element) {
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
          // renderSectionHeader={({ section: { title } }) => (
          //   <Text style={styles.header}>{title}</Text>
          // )}
        ></SectionList>
        <SearchBar
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
          <Appbar.Action
            style={{ flex: 1 }}
            icon='send'
            onPress={() => this.stampList()}
          />
        </Appbar>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 5
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
    //borderColor: '#f4511D',
    //borderTopWidth: 2,
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
    borderRadius: 10
  }
})
