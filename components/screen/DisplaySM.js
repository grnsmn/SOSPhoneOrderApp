import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  SectionList,
  Modal,
  Text,
  TouchableHighlight
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-elements'
import ItemLCD_SM from '../ItemLCD_SM'
import { Appbar } from 'react-native-paper'
import DisplayList from './Display'

global.list_Display_Huawei = ''
global.list_Resi_Display_Huawei = ''
const list = [
  { id: 'SM-J330', nome: 'SAMSUNG J3', nMax: 2 },
  { id: 'SM-J320', nome: 'SAMSUNG J3 2016', nMax: 2 },
  { id: 'SM-J500', nome: 'SAMSUNG J5 2015', nMax: 2 },
  { id: 'SM-J510', nome: 'SAMSUNG J5 2016', nMax: 2 },
  { id: 'SM-J530', nome: 'SAMSUNG J5 2017', nMax: 2 },
  { id: 'SM-J710', nome: 'SAMSUNG J7 2016', nMax: 2 },
  { id: 'SM-J730', nome: 'SAMSUNG J7 2017', nMax: 2 },
  { id: 'SM-A520', nome: 'SAMSUNG A5 2017', nMax: 2 },
  
]
const sectionList = [
  {
    title: 'To Order',
    data: list
  }
]
export default class DisplayListSM extends DisplayList {
  state = { modalVisible: false, modalVisibleResi: false }

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
        resiW: 0,
      }
      //AsyncStorage.multiRemove([element.id+'W', element.id+'Bk']).then(console.log("multirimozione eseguita"))
      AsyncStorage.mergeItem(element.id, JSON.stringify(item))
    })
    alert('Lista Svuotata')
  }
  render () {
    return (
      <View style={styles.container}>
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
                          element.quality +
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
        <SectionList sections={sectionList} renderItem={this.renderRow} />
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
