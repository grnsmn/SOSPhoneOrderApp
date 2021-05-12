import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Modal,
  TouchableHighlight
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Item from '../Item'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appbar } from 'react-native-paper'
import BattList from './Batterie'
import SearchBattery  from '../SearchBattery'
global.list_Batt_Huawei = ' ' //Variabile globale per la scrittura dell'ordine finale

const list = [
  { id: 'cvG', nome: 'HUAWEI P8', nMax: 2 },
  { id: 'po5', nome: 'HUAWEI P8 LITE', nMax: 2 },
  { id: 'cfV', nome: 'HUAWEI P9', compat:'P9 LITE - P8 LITE 2017 - P10 LITE - P20 LITE - HONOR 8 - P SMART - HONOR 9 LITE - Y6 2018 - GT3 - HONOR 7A', nMax: 5 },
  { id: 'cfZ', nome: 'HUAWEI P9 PLUS', nMax: 2 },
  { id: 'dtZ', nome: 'HUAWEI PSMART 2019', compat: 'HONOR 10 LITE - P SMART PLUS 2019',  nMax: 2 },
  { id: 'cf0', nome: 'HUAWEI P10', compat: 'HONOR 9 STF-L09', nMax: 2 },
  { id: 'z9y', nome: 'HUAWEI P20 [EML-L09]', compat:'HONOR 10 COL-L29', nMax: 2 },
  { id: 'S9y', nome: 'HUAWEI P30', compat: 'MATE 20 PRO', nMax: 2 },
  { id: 'T71', nome: 'HUAWEI MATE 9', compat:'Y7 2017 TRT-LX1 - Y7 2019 DUB-LX1', nMax: 2 },
  { id: 'T72', nome: 'HUAWEI MATE 10', compat: 'MATE 10 PRO BLA-L09 L29 - P20 PRO CLT-L09 L29 - P SMART Z STK-LX1 LX2 - P30 PRO VOG-L29 - HONOR VIEW 20', nMax: 2 },
  { id: 'F79', nome: 'HUAWEI MATE 10 LITE', compat: 'P30 LITE - HONOR 7X - P SMART PLUS', nMax: 2 },
  { id: 'x1L', nome: 'HUAWEI MATE 20 LITE', compat: 'P10 PLUS - HONOR VIEW 10 - NOVA 5T', nMax: 2 },
  { id: 'x76', nome: 'HUAWEI MATE S', nMax: 2 },
  { id: 'x78', nome: 'HUAWEI NOVA YOUNG', compat:'HUAWEI Y6 PRO 2017 SLA-L02 L22 TL00 - Y5 2018 - Y6 2019 MRD-LX1 LX2 - Y6S JAT-L41', nMax: 2 },
]
const sectionList = [
  {
    title: 'To Order',
    data: list
  }
]
export default class BattListHW extends BattList {
  state = { modalVisible: false, modalVisibleResi: false}

  // stampList () {
  //   global.list_Batt_Huawei = '' //SVUOTA LA LISTA BATTERIA PRIMA DI UN NUOVO CONCATENAMENTO DI AGGIORNAMENTO DELLA LISTA
  //   global.store_Batt.forEach(element => {
  //     global.list_Batt_Huawei +=
  //       element.n + 'x ' + ' BATT ' + element.name + '\n'
  //   })
  //   global.listResiBatt = ''
  //   global.resi_Batt_IP.forEach(element => {
  //     global.listResiBatt += element.n + 'x ' + ' BATT ' + element.name + '\n'
  //   })
  //   this.onShareBatt()
  // }
  clearListBatt () {
    //Azzera lista ordine
    global.store_Batt.clear()
    global.listBatt = ''
    //Azzera lista resi
    global.resi_Batt_IP.clear()
    global.listResiBatt = ''
    list.forEach(element => {
      //AZZERA TUTTI GLI ELEMENTI NELLO STORE CON PERSISTENZA LOCALE
      const item = {
        id: element.id,
        nomeItem: element.nome,
        contatore: 0,
        NumResi: 0
      }
      AsyncStorage.mergeItem(element.id, JSON.stringify(item))
    })
    alert('Lista Svuotata')
  }
  render () {
    const { search } = this.state
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
                {[...global.store_Batt.values()].sort().map(function (element) {
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
          visible={this.state.modalVisibleResi}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                RESI {'\n\n'}
                {[...global.resi_Batt_IP.values()]
                  .sort()
                  .map(function (element) {
                    return String(element.n + 'x ' + element.name + '\n')
                  })}
              </Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  this.setModalVisibleResi(!this.state.modalVisibleResi)
                }}
              >
                <Text style={styles.textStyle}>Chiui</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
       
        <SectionList
          sections={sectionList}
          renderItem={this.renderRow}
          // renderSectionHeader={({ section: { title } }) => (
          //   <Text style={styles.header}>{title}</Text>
          // )}
        ></SectionList>
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

    //    borderBottomWidth: 3,
    //  borderTopWidth: 1.5,
    //borderLeftWidth: 2
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
