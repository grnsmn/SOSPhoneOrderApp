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
import { Button } from 'react-native-elements'
import ItemLCD from '../ItemLCD'
import { Appbar } from 'react-native-paper'
import DisplayList from './Display'

global.list_Display_Huawei = ''
global.list_Resi_Display_Huawei = ''
const list = [
  { id: 'g6p', nome: 'HUAWEI P8', nMax: 1 },
  { id: 'hm4', nome: 'HUAWEI P8 LITE', nMax: 1 },
  { id: 'hZ4', nome: 'HUAWEI P8 LITE 2017', nMax: 1 },
  { id: 'wqq', nome: 'HUAWEI P9', nMax: 1 },
  { id: 'iz8', nome: 'HUAWEI P9 LITE', nMax: 1 },
  { id: '2o4', nome: 'HUAWEI P10', nMax: 1 },
  { id: 'zo3', nome: 'HUAWEI P10 LITE', nMax: 1 },
  { id: 'w37', nome: 'HUAWEI P20 LITE', nMax: 2 },
  { id: 'w3H', nome: 'HUAWEI P30 LITE', nMax: 1 },
  { id: 'xhm', nome: 'HUAWEI MATE 10 LITE', nMax: 2 },
  { id: 'hhs', nome: 'HUAWEI MATE 20 LITE', nMax: 2 },
  { id: 'tn4', nome: 'HUAWEI PSMART', nMax: 2 },
  { id: 'xs9', nome: 'HUAWEI PSMART 2019', nMax: 2 },
  { id: 'tW6', nome: 'HUAWEI PSMART Z', nMax: 2 },
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
export default class DisplayListHW extends DisplayList {
  state = { modalVisible: false, modalVisibleResi: false }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }

  setModalVisibleResi = visible => {
    this.setState({ modalVisibleResi: visible })
  }
  renderRow = ({ item }) => (
    <ItemLCD NameItem={item.nome} nMax={item.nMax} id={item.id}/>
  )
  // stampList () {
  //   global.list_Display_Huawei = ''
  //   global.store_Lcd.forEach(element => {
  //     if (
  //       element.name.includes('P20 LITE') ||
  //       element.name.includes('P30 LITE') ||
  //       element.name.includes('MATE 20 LITE') ||
  //       element.name.includes('PSMART 2019') ||
  //       element.name.includes('PSMART Z')
  //       ) {
  //         global.list_Display_Huawei +=
  //         element.n + 'x ' + ' LCD ' + element.name + ' ' + '\n'
  //       } else {
  //         global.list_Display_Huawei +=
  //         element.n + 'x ' + ' LCD ' + element.name + ' ' + element.col + '\n'
  //       }
  //     })
  //     global.list_Resi_Display_Huawei = ''
  //     global.resi_Lcd.forEach(element => {
  //       if (
  //         element.name.includes('P20 LITE') ||
  //         element.name.includes('P30 LITE')||
  //         element.name.includes('MATE 20 LITE') ||
  //       element.name.includes('PSMART 2019') ||
  //       element.name.includes('PSMART Z')
  //     ) {
  //       global.list_Resi_Display_Huawei +=
  //         element.n + 'x ' + ' LCD ' + element.name + ' ' + '\n'
  //     } else {
  //       global.list_Resi_Display_Huawei +=
  //         element.n + 'x ' + ' LCD ' + element.name + ' ' + element.col + '\n'
  //     }
  //   })
  //   this.onShareDisplay()
  // }
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
            IN ORDINE {"\n\n"}
              {
                //Funzione che permette la stampa pulita della lista in ordine  
                [...global.store_Lcd.values()]
                  .sort()
                  .map(function (element) {
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
                      element.n + 'x ' + ' LCD ' + element.name + ' ' + element.col + '\n'
                    )
                  }
                  })
              }
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
            RESI {"\n\n"}
              {
                [...global.resi_Lcd.values()]
                  .sort()
                  .map(function (element) {
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
                      element.n + 'x ' + ' LCD ' + element.name + ' ' + element.col + '\n'
                    )
                  }
                  })
              }
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
