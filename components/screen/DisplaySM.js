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
import ItemLCD_SM from '../ItemLCD_SM'
import { Appbar, Snackbar } from 'react-native-paper'
import DisplayList from './Display'

global.list_Display_Huawei = ''
global.list_Resi_Display_Huawei = ''
const list = [
  { id: 'SM-J330', nome: 'SAMSUNG J3', nMax: 2 },
  { id: 'SM-J320', nome: 'SAMSUNG J3 2016', nMax: 2 },
  { id: 'SM-J415', nome: 'SAMSUNG J4 PLUS', nMax: 2 },
  { id: 'SM-J500', nome: 'SAMSUNG J5 2015', nMax: 2 },
  { id: 'SM-J510', nome: 'SAMSUNG J5 2016', nMax: 2 },
  { id: 'SM-J530', nome: 'SAMSUNG J5 2017', nMax: 2 },
  { id: 'SM-J600', nome: 'SAMSUNG J6 2018', nMax: 2 },
  { id: 'SM-J710', nome: 'SAMSUNG J7 2016', nMax: 2 },
  { id: 'SM-J730', nome: 'SAMSUNG J7 2017', nMax: 2 },
  { id: 'SM-A510F', nome: 'SAMSUNG A5 2016', nMax: 2 },
  { id: 'SM-A520', nome: 'SAMSUNG A5 2017', nMax: 2 },
  { id: 'SM-A530', nome: 'SAMSUNG A8 2018', nMax: 2 },
  { id: 'SM-A605', nome: 'SAMSUNG A6 PLUS', nMax: 2 },
  { id: 'SM-A750', nome: 'SAMSUNG A7 2018', nMax: 2 },
  { id: 'SM-A405', nome: 'SAMSUNG A40', nMax: 2 },
  { id: 'SM-A415', nome: 'SAMSUNG A41', nMax: 2 },
  { id: 'SM-A426', nome: 'SAMSUNG A42', nMax: 2 },
  { id: 'SM-A505', nome: 'SAMSUNG A50', nMax: 2 },
  { id: 'SM-A515', nome: 'SAMSUNG A51', nMax: 2 },
  { id: 'SM-A705', nome: 'SAMSUNG A70', nMax: 2 },
  { id: 'SM-A715', nome: 'SAMSUNG A71', nMax: 2 },
  { id: 'SM-A105', nome: 'SAMSUNG A10', nMax: 2 },
  { id: 'SM-A107', nome: 'SAMSUNG A10s', nMax: 2 },
  { id: 'SM-A125', nome: 'SAMSUNG A12', nMax: 2 },
  { id: 'SM-A202', nome: 'SAMSUNG A20E', nMax: 2 },
  { id: 'SM-A207', nome: 'SAMSUNG A20S', nMax: 2 },
  { id: 'SM-A217', nome: 'SAMSUNG A21S', nMax: 2 },
  { id: 'SM-A307', nome: 'SAMSUNG A30S', nMax: 2 },
  { id: 'SM-A326', nome: 'SAMSUNG A32', nMax: 2 },
  { id: 'SM-A025', nome: 'SAMSUNG A02S', nMax: 2 },
  { id: 'SM-A115', nome: 'SAMSUNG A11', nMax: 2 }
]
const sectionList = [
  {
    title: 'To Order',
    data: list
  }
]
export default class DisplayListSM extends DisplayList {
  state = { modalVisible: false, modalVisibleResi: false, clearList: false }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }

  setModalVisibleResi = visible => {
    this.setState({ modalVisibleResi: visible })
  }
  renderRow = ({ item }) => (
    <ItemLCD_SM NameItem={item.nome} nMax={item.nMax} id={item.id} />
  )

  clearListDisplay () {
    global.store_Lcd.clear()
    global.resi_Lcd.clear()
    global.list_Resi_Display_Huawei = ''
    list.forEach(element => {
      //AZZERA TUTTI GLI ELEMENTI NELLO STORE CON PERSISTENZA LOCALE
      const item = {
        id: element.id,
        nameItem: element.nome,
        contatoreW: 0,
        col: element.colore,
        resiW: 0
      }
      //AsyncStorage.multiRemove([element.id+'W', element.id+'Bk']).then(console.log("multirimozione eseguita"))
      AsyncStorage.mergeItem(element.id, JSON.stringify(item))
    })
    this.setState({ clearList: !this.state.clearList })
  }
  render () {
    return (
      <View style={styles.container}>
       
        <SectionList sections={sectionList} renderItem={this.renderRow} />
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
            Alert.alert('Modal has been closed.')
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
                          element.quality +
                          '\n'
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
                          '\n'
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
          visible={this.state.modalVisibleResi}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
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
                  this.setModalVisibleResi(!this.state.modalVisibleResi)
                }}
              >
                <Text style={styles.textStyle}>Hide List</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Appbar style={styles.bottom}>
          <Appbar.Action
            style={{ flex: 1 }}
            icon='format-list-bulleted'
            color={'gold'}
            onPress={() => this.setModalVisible(true)}
          />
          <Appbar.Action
            style={{ flex: 1 }}
            icon='recycle'
            color={'lightgreen'}
            onPress={() => this.setModalVisibleResi(true)}
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
    borderColor: '#f4511D',
    borderTopWidth: 3,
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
  }
})
