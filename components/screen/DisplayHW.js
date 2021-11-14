import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import {
  View,
  StyleSheet,
  SectionList,
  Modal,
  Text,
  TouchableHighlight
} from 'react-native'
import ItemLCD from '../ItemLCD'
import { Appbar, Snackbar, Searchbar } from 'react-native-paper'
import DisplayList from './Display'
import {SearchBar} from 'react-native-elements'


const list = [
  { id: 'g6p', nome: 'HUAWEI P8', nMax: 3 },
  { id: 'hm4', nome: 'HUAWEI P8 LITE', nMax: 3 },
  { id: 'hZ4', nome: 'HUAWEI P8 LITE 2017', nMax: 3 },
  { id: 'wqq', nome: 'HUAWEI P9', nMax: 3 },
  { id: 'iz8', nome: 'HUAWEI P9 LITE', nMax: 3 },
  { id: '2o4', nome: 'HUAWEI P10', nMax: 3 },
  { id: 'wYà', nome: 'HUAWEI P20', nMax: 3 },
  { id: 'zo3', nome: 'HUAWEI P10 LITE', nMax: 3 },
  { id: 'w37', nome: 'HUAWEI P20 LITE', nMax: 3 },
  { id: 'w3H', nome: 'HUAWEI P30 LITE', nMax: 3 },
  { id: 'V7v', nome: 'HUAWEI P40 LITE', nMax: 3 },
  { id: 'xhm', nome: 'HUAWEI MATE 10 LITE', nMax: 3 },
  { id: 'hhs', nome: 'HUAWEI MATE 20 LITE', nMax: 3 },
  { id: 'tn4', nome: 'HUAWEI PSMART', nMax: 3 },
  { id: 'xs9', nome: 'HUAWEI PSMART 2019', nMax: 3 },
  { id: 'tW6', nome: 'HUAWEI PSMART Z', nMax: 3 }
]
const sectionList = [
  {
    title: 'To Order',
    data: list
  }
]
export default class DisplayListHW extends DisplayList {
  state = { modalVisible: false,  clearList:false, listFiltered: sectionList,
    search: '' }

  search (model) {
    this.setState({
      search: model,
      listFiltered: [
        {
          title: 'To order',
          data: list.filter(elem => (elem.nome.includes(model.toUpperCase())))
        }
      ]
    })
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }

  renderRow = ({ item }) => (
    <ItemLCD NameItem={item.nome} nMax={item.nMax} id={item.id} />
  )

  clearListDisplay () {
    global.store_Lcd.clear()
    global.list_Display_Huawei = ''

    global.resi_Lcd.clear()
    global.list_Resi_Display_Huawei = ''
    list.forEach(element => {
      //AZZERA TUTTI GLI ELEMENTI NELLO STORE CON PERSISTENZA LOCALE
      const item = {
        id: element.id,
        nameItem: element.nome,
        contatoreW: 0,
        contatoreBK: 0,
        col: '',
        resiW: 0,
        resiBK: 0
      }
      //AsyncStorage.multiRemove([element.id+'W', element.id+'Bk']).then(console.log("multirimozione eseguita"))
      AsyncStorage.mergeItem(element.id, JSON.stringify(item))
    })
    this.setState({clearList: !this.state.clearList})
  }
  render () {
    return (
      <View style={styles.container}>
        <Snackbar
          visible={this.state.clearList}
          onDismiss={() => this.setState({ clearList: false })}
          duration={700}
          style={{ backgroundColor: '#252850', textAlign: 'center' }}
        >
          {' '}
          LISTA AZZERATA{' '}
        </Snackbar>
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
                {//Funzione che permette la stampa pulita della lista in ordine
                [...global.store_Lcd.values()].sort().map(function (element) {
                  if (element.name.includes('HUAWEI')) {
                    if (
                      element.name.includes('P20 LITE') ||
                      element.name.includes('P30 LITE') ||
                      element.name.includes('MATE 20 LITE') ||
                      element.name.includes('PSMART 2019') ||
                      element.name.includes('PSMART Z')
                    ) {
                      return String(
                        element.n +
                          'x ' +
                          ' LCD ' +
                          element.name +
                          ' ' +
                          element.frame +
                          ' [' +
                          element.Fab +
                          ']\n'
                      )
                    } else {
                      return String(
                        element.n +
                          'x ' +
                          ' LCD ' +
                          element.name +
                          ' ' +
                          element.col +
                          ' ' +
                          element.frame +
                          ' [' +
                          element.Fab +
                          ']\n'
                      )
                    }
                  } else {
                    if (
                      element.name.includes('IPHONE X') ||
                      element.name.includes('IPHONE XR') ||
                      element.name.includes('IPHONE 11')
                    ) {
                      return String(
                        element.n + 'x ' + ' LCD ' + element.name + ' ' + '\n'
                      )
                    } else {
                      return String(
                        element.n +
                          'x ' +
                          ' LCD ' +
                          element.name +
                          ' ' +
                          element.col +
                          '\n'
                      )
                    }
                  }
                })}
              </Text>
              <Text style={styles.modalTextResi}>
                RESI {'\n\n'}
                {[...global.resi_Lcd.values()].sort().map(function (element) {
                  if (
                    element.name.includes('IPHONE X') ||
                    element.name.includes('IPHONE 11') ||
                    element.name.includes('P20 LITE') ||
                    element.name.includes('P30 LITE') ||
                    element.name.includes('MATE 20 LITE') ||
                    element.name.includes('PSMART 2019') ||
                    element.name.includes('PSMART Z')
                  ) {
                    return String(
                      element.n + 'x ' + ' LCD ' + element.name + ' ' + '\n'
                    )
                  } else {
                    return String(
                      element.n +
                        'x ' +
                        ' LCD ' +
                        element.name +
                        ' ' +
                        element.col +
                        '\n'
                    )
                  }
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
        <SectionList sections={this.state.listFiltered} renderItem={this.renderRow} />
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
              this.clearListDisplay()
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
    marginBottom: 15,
    textAlign: 'center',
    color: 'white'
  },
  modalTextResi: {
    marginBottom: 15,
    textAlign: 'left',
    color: 'lightgreen',
  },
  container_input: {
    backgroundColor: '#2196F3',
   // borderColor: '#252850',
   // borderWidth: 0.5,
    //margin: 3,
    padding:3,
   // height: 40,
   borderRadius: 10
 },
 input:{
   borderRadius: 10
 }
})
