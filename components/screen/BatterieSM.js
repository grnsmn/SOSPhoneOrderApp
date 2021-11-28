import React from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Modal,
  TouchableHighlight
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { Appbar, Snackbar, Searchbar } from 'react-native-paper'
import BattList from './Batterie'
import Item from '../Item'
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
var database = firebase.database().ref('/BATTERIE/SAMSUNG/')

const list = [
  { id: 'G920F', nome: 'SAMSUNG S6', compat: '', nMax: 2 },
  { id: 'G925F', nome: 'SAMSUNG S6 EDGE', compat: '', nMax: 2 },
  { id: 'G928F', nome: 'SAMSUNG S6 EDGE PLUS', compat: '', nMax: 2 },
  { id: 'G930F', nome: 'SAMSUNG S7', compat: '', nMax: 2 },
  { id: 'G935F', nome: 'SAMSUNG S7 EDGE', compat: '', nMax: 2 },
  { id: 'G950F', nome: 'SAMSUNG S8', compat: '', nMax: 2 },
  { id: 'N950F', nome: 'SAMSUNG NOTE 8', compat: '', nMax: 2 },
  { id: 'G955F', nome: 'SAMSUNG S8 PLUS', compat: '', nMax: 2 },
  { id: 'G960F', nome: 'SAMSUNG S9', compat: '', nMax: 2 },
  { id: 'N960F', nome: 'SAMSUNG NOTE 9', compat: '', nMax: 2 },
  { id: 'G965F', nome: 'SAMSUNG S9 PLUS', compat: '', nMax: 2 },
  { id: 'G970F', nome: 'SAMSUNG S10E', compat: '', nMax: 2 },
  { id: 'G975F', nome: 'SAMSUNG S10 PLUS', compat: '', nMax: 2 },
  { id: 'G980F', nome: 'SAMSUNG S20', compat: '', nMax: 2 },
  { id: 'G985F', nome: 'SAMSUNG S20 PLUS', compat: '', nMax: 2 },
  { id: 'A310', nome: 'SAMSUNG A3 2016', compat: '', nMax: 2 },
  { id: 'A320', nome: 'SAMSUNG A3 2017', compat: '', nMax: 2 },
  { id: 'A105', nome: 'SAMSUNG A10', compat: ' A7 2018 A750', nMax: 2 },
  { id: 'A505', nome: 'SAMSUNG A30', compat: 'A20-A30-A30S-A50', nMax: 2 },
  { id: 'A405', nome: 'SAMSUNG A40', compat: '', nMax: 2 },
  { id: 'A202', nome: 'SAMSUNG A20E', compat: '', nMax: 2 },
  { id: 'A705', nome: 'SAMSUNG A70', compat: '', nMax: 2 },
  { id: 'A510', nome: 'SAMSUNG A5 2016', compat: '', nMax: 2 },
  { id: 'A520', nome: 'SAMSUNG A5 2017', compat: 'J5 2017 J530', nMax: 2 },
  { id: 'A605', nome: 'SAMSUNG A6 PLUS 2018', compat: '', nMax: 2 },
  { id: 'J320', nome: 'SAMSUNG J3 2016', compat: '', nMax: 2 },
  { id: 'J330', nome: 'SAMSUNG J3 2017', compat: '', nMax: 2 },
  { id: 'J415', nome: 'SAMSUNG J4 PLUS', compat: 'J6 PLUS', nMax: 2 },
  { id: 'J510', nome: 'SAMSUNG J5 2016', compat: '', nMax: 2 },
  { id: 'J710', nome: 'SAMSUNG J7 2016', compat: '', nMax: 2 },
  { id: 'J730', nome: 'SAMSUNG J7 2017', compat: '', nMax: 2 }
]
const sectionList = [
  {
    title: 'To Order',
    data: list
  }
]
export default class BattListSM extends BattList {
  state = {
    modalVisible: false,
    clearList: false,
    listFiltered: sectionList,
    search: '',
  }

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
          data: list.filter(elem => elem.compat.includes(model.toUpperCase()))
        },
        {
          title: 'To order',
          data: list.filter(elem => elem.id.includes(model.toUpperCase()))
        }
      ]
    })
  }
  renderRow = ({ item }) => (
    <Item
      NameItem={item.nome}
      nMax={item.nMax}
      id={item.id}
      compat={item.compat}
      codice={item.codice}
      pathDB={'BATTERIE/SAMSUNG/'}
    />
  )
  clearListBatt () {
    //Azzera lista ordine
    // global.store_Batt.clear()
    // global.listBatt = ''
    // //Azzera lista resi
    // global.resi_Batt_IP.clear()
    // global.listResiBatt = ''
    list.forEach(element => {
      database.update({
        [String(element.nome)]: {
          n: 0,
          resi: 0,
          codice: element.id
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
    //flexDirection: 'row',
    backgroundColor: 'black',
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
    borderTopWidth: 2,
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
