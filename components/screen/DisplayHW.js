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

global.list_Display_Huawei = ''
global.list_Resi_Display_Huawei = ''
const list = [
  { id: 'g6p', nome: 'Huawei P8', nMax: 1 },
  { id: 'hm4', nome: 'Huawei P8 Lite', nMax: 1 },
  { id: 'wqq', nome: 'Huawei P9', nMax: 1 },
  { id: 'iz8', nome: 'Huawei P9 Lite', nMax: 1 },
  { id: '2o4', nome: 'Huawei P10', nMax: 1 },
  { id: 'zo3', nome: 'Huawei P10 Lite', nMax: 1 },
  { id: 'w37', nome: 'Huawei P20 Lite', nMax: 2 },
  { id: 'xhm', nome: 'Huawei Mate 10 Lite', nMax: 2 },
  { id: 'hhs', nome: 'Huawei Mate 20 Lite', nMax: 2 },
  { id: 'tn4', nome: 'Huawei PSmart', nMax: 2 },
  { id: 'xs9', nome: 'Huawei PSmart 2019', nMax: 2 }
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
export default class DisplayListHW extends Component {
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
  stampList () {
    const jsonList = JSON.stringify(global.list_Resi_Display_Huawei)
    const extractList = JSON.parse(jsonList, (key, value) => {
      return value
    })
    extractList.forEach(
      element =>
        (global.list_Display_Huawei +=
          element.n + ' ' + element.name + ' ' + element.colore + '\n')
    )
    console.log(global.list_Display_Huawei)
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
