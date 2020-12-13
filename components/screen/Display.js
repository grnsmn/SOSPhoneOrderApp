import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  SectionList,
  Modal,
  Text,
  TouchableHighlight
} from 'react-native'
import { Button } from 'react-native-elements'
import ItemLCD from '../ItemLCD'
import { Appbar } from 'react-native-paper'

global.listDisplay = ''
global.listResiDisplay = ''
const list = [
  { id: 'KIX', nome: 'IPHONE 5', nMax: 2 },
  { id: 'Z7P', nome: 'IPHONE 5S', nMax: 2 },
  { id: 'RFJ', nome: 'IPHONE 6', nMax: 2 },
  { id: 'H3V', nome: 'IPHONE 6S', nMax: 2 },
  { id: 'ZK2', nome: 'IPHONE 7', nMax: 2 },
  { id: 'FP6', nome: 'IPHONE 8', nMax: 2 },
  { id: 'D89', nome: 'IPHONE 6 PLUS', nMax: 2 },
  { id: 'G5G', nome: 'IPHONE 6S PLUS', nMax: 2 },
  { id: 'WYR', nome: 'IPHONE 7 PLUS', nMax: 2 },
  { id: 'M3P', nome: 'IPHONE 8 PLUS', nMax: 2 },
  { id: '2TI', nome: 'IPHONE X', nMax: 4 },
  { id: '5QM', nome: 'IPHONE XS MAX', nMax: 1 },
  { id: 'JQ7', nome: 'IPHONE XR', nMax: 2 },
  { id: '2A4', nome: 'IPHONE 11', nMax: 2 }
]
const sectionList = [
  {
    title: 'To Order',
    data: list
  }
  // {
  //   title: 'Resi',
  //   data: list
  // }
]
export default class DisplayList extends Component {
  state = { modalVisible: false, modalVisibleResi: false }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }

  setModalVisibleResi = visible => {
    this.setState({ modalVisibleResi: visible })
  }
  renderRow = ({ item }) => (
    <ItemLCD NameItem={item.nome} nMax={item.nMax} id={item.id} />
  )
  stampList () {
    global.listDisplay = ''
    global.store_Lcd_IP.forEach(element => {
      if (
        element.name.includes('IPHONE X') ||
        element.name.includes('IPHONE 11')
      ) {
        global.listDisplay +=
          element.n + 'x ' + ' LCD ' + element.name + ' ' + '\n'
      } else {
        global.listDisplay +=
          element.n + 'x ' + ' LCD ' + element.name + ' ' + element.col + '\n'
      }
    })
    global.listResiDisplay = ''
    global.resi_Lcd_IP.forEach(element => {
      if (
        element.name.includes('IPHONE X') ||
        element.name.includes('IPHONE 11')
      ) {
        global.listResiDisplay +=
          element.n + 'x ' + ' LCD ' + element.name + ' ' + '\n'
      } else {
        global.listResiDisplay +=
          element.n + 'x ' + ' LCD ' + element.name + ' ' + element.col + '\n'
      }
    })

    alert('Ordine Inserito!')
  }
  clearListDisplay () {
    global.store_Lcd_IP.clear()
    global.listDisplay = ''

    global.resi_Lcd_IP.clear()
    global.listResiDisplay = ''
    list.forEach(element => {
      //AZZERA TUTTI GLI ELEMENTI NELLO STORE CON PERSISTENZA LOCALE
      const item = {
        id: element.id,
        nameItem: element.nome,
        contatoreW: 0,
        contatoreBK: 0,
        col: '',
        resiW: 0,
        resiBK:0
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
                {JSON.stringify(
                  [...global.store_Lcd_IP.values()]
                    .sort()
                    .map(function (element) {
                      return element
                    })
                )}
              </Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}
              >
                <Text style={styles.textStyle}>Hide List</Text>
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
                {JSON.stringify(
                  [...global.resi_Lcd_IP.values()]
                    .sort()
                    .map(function (element) {
                      return element
                    })
                )}
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
            icon='printer-wireless'
            onPress={() => this.stampList()}
          />
          <Appbar.Action
            style={{ flex: 1 }}
            icon='delete'
            color={'red'}
            onPress={() => {
              this.clearListDisplay()
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
