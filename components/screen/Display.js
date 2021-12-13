import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  SectionList,
  Modal,
  Text,
  TouchableHighlight,
  Share
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ItemLCD from '../ItemLCD'
import { Appbar, Snackbar } from 'react-native-paper'
import { SearchBar } from 'react-native-elements'

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
  { id: '2TI', nome: 'IPHONE X [ GX ]', nMax: 4 },
  { id: 'JQ7', nome: 'IPHONE XR', nMax: 2 },
  { id: '2A4', nome: 'IPHONE 11', nMax: 2 },
  { id: '2A5', nome: 'IPHONE 11 PRO', nMax: 2 },
  { id: '5QM', nome: 'IPHONE XS MAX', nMax: 2 }
]
const sectionList = [
  {
    title: 'To Order',
    data: list
  }
]
export default class DisplayList extends PureComponent {
  state = {
    modalVisible: false,
    clearList: false,
    listFiltered: sectionList,
    search: ''
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }
  renderRow = ({ item }) => (
    <ItemLCD NameItem={item.nome} nMax={item.nMax} id={item.id} />
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
  onShareDisplay = async () => {
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
          // parseInt(tomorrow.getMonth() + 1) + //BISOGNA EFFETTUARE LA SOMMA PERCHE getMonth restituisce numeri da 0 a 11 in stringa così che corrisponda alla tomorrow italiana
          // '/' +
          // tomorrow.getFullYear() +
          // '\n\n' +
          global.listDisplay +
          (global.resi_Lcd.size == 0
            ? ''
            : '\nResi:\n' + global.listResiDisplay)
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
    global.listDisplay = ''
    global.store_Lcd.forEach(element => {
      if (element.name.includes('HUAWEI')) {
        if (
          element.name.includes('P20 LITE') ||
          element.name.includes('P30 LITE') ||
          element.name.includes('P40 LITE') ||
          element.name.includes('MATE 20 LITE') ||
          element.name.includes('PSMART 2019') ||
          element.name.includes('PSMART Z')
        ) {
          global.listDisplay +=
            element.n +
            'x ' +
            ' LCD ' +
            element.name +
            ' [' +
            element.frame +
            '] ' +
            element.Fab +
            '\n'
        } else {
          global.listDisplay +=
            element.n +
            'x ' +
            ' LCD ' +
            element.name +
            ' ' +
            element.col +
            ' [' +
            element.frame +
            '] ' +
            element.Fab +
            '\n'
        }
      } else if (element.name.includes('SAMSUNG')) {
        global.listDisplay +=
          element.n +
          'x ' +
          ' LCD ' +
          element.name +
          ' ' +
          element.col +
          ' [' +
          element.id +
          ' ' +
          element.quality +
          ']\n'
      } else if(element.name.includes('IPHONE'))
      {
        if (
          element.name.includes('IPHONE X') ||
          element.name.includes('IPHONE XR') ||
          element.name.includes('IPHONE 11')
        ) {
          global.listDisplay +=
            element.n + 'x ' + ' LCD ' + element.name + ' ' + '\n'
        } else {
          global.listDisplay +=
            element.n + 'x ' + ' LCD ' + element.name + ' ' + element.col + '\n'
        }
      }
    })
    global.listResiDisplay = ''
    global.resi_Lcd.forEach(element => {
      if (
        element.name.includes('IPHONE X') ||
        element.name.includes('IPHONE 11') ||
        element.name.includes('P20 LITE') ||
        element.name.includes('P30 LITE') ||
        element.name.includes('P40 LITE') ||
        element.name.includes('MATE 20 LITE') ||
        element.name.includes('PSMART 2019') ||
        element.name.includes('PSMART Z')
      ) {
        global.listResiDisplay +=
          element.n + 'x ' + ' LCD ' + element.name + ' ' + '\n'
      } else {
        global.listResiDisplay +=
          element.n + 'x ' + ' LCD ' + element.name + ' ' + element.col + '\n'
      }
    })
    this.onShareDisplay()
  }
  clearListDisplay () {
    global.store_Lcd.clear()
    global.listDisplay = ''

    global.resi_Lcd.clear()
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
        resiBK: 0
      }
      //AsyncStorage.multiRemove([element.id+'W', element.id+'Bk']).then(console.log("multirimozione eseguita"))
      AsyncStorage.mergeItem(element.id, JSON.stringify(item))
    })
    this.setState({ clearList: !this.state.clearList })
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
          <SafeAreaView style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                IN ORDINE {'\n\n'}
                {//Funzione che permette la stampa pulita della lista in ordine
                [...global.store_Lcd.values()].sort().map(function (element) {
                  while (element.name.includes('IPHONE')) {
                    if (
                      element.name.includes('X') ||
                      element.name.includes('XS MAX') ||
                      element.name.includes('XR') ||
                      element.name.includes('11')
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
                  while (element.name.includes('HUAWEI')) {
                    if (
                      element.name.includes('P20 LITE') ||
                      element.name.includes('P30 LITE') ||
                      element.name.includes('P40 LITE') ||
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
                    element.name.includes('P40 LITE') ||
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
          </SafeAreaView>
        </Modal>
        <SectionList
          sections={this.state.listFiltered}
          renderItem={this.renderRow}
        />
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
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'left',
    color: '#F1F3F4'
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
