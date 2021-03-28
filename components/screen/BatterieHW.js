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
  { id: 'cvG', nome: 'HUAWEI P8', nMax: 1 },
  { id: 'po5', nome: 'HUAWEI P8 LITE', nMax: 1 },
  { id: 'cfV', nome: 'HUAWEI P9', nMax: 5 },
  { id: 'xqg', nome: 'HUAWEI P20 PRO', nMax: 1 },
  { id: 'z9y', nome: 'HUAWEI P20', nMax: 1 },
  { id: 'T72', nome: 'HUAWEI MATE 10', nMax: 1 },
  { id: 'F79', nome: 'HUAWEI MATE 10 LITE', nMax: 1 },
  { id: 'x1L', nome: 'HUAWEI MATE 20 LITE', nMax: 1 },
  { id: 'x76', nome: 'HUAWEI MATE S', nMax: 1 },

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
