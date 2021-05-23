import React, { } from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Modal,
  TouchableHighlight
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appbar, Snackbar } from 'react-native-paper'
import BattList from './Batterie'


const list = [
  { id: 'G920F', nome: 'SAMSUNG S6', nMax: 2 },
  { id: 'G925F', nome: 'SAMSUNG S6 EDGE', nMax: 2 },
  { id: 'G928F', nome: 'SAMSUNG S6 EDGE PLUS', nMax: 2 },
  { id: 'G930F', nome: 'SAMSUNG S7', nMax: 2 },
  { id: 'G935F', nome: 'SAMSUNG S7 EDGE', nMax: 2 },
  { id: 'G950F', nome: 'SAMSUNG S8', nMax: 2 },
  { id: 'N950F', nome: 'SAMSUNG NOTE 8', nMax: 2 },
  { id: 'G955F', nome: 'SAMSUNG S8 PLUS', nMax: 2 },
  { id: 'G960F', nome: 'SAMSUNG S9', nMax: 2 },
  { id: 'N960F', nome: 'SAMSUNG NOTE 9', nMax: 2 },
  { id: 'G965F', nome: 'SAMSUNG S9 PLUS', nMax: 2 },
  { id: 'G970F', nome: 'SAMSUNG S10E', nMax: 2 },
  { id: 'G975F', nome: 'SAMSUNG S10 PLUS', nMax: 2 },
  { id: 'G980F', nome: 'SAMSUNG S20', nMax: 2 },
  { id: 'G985F', nome: 'SAMSUNG S20 PLUS', nMax: 2 },
  { id: 'A310', nome: 'SAMSUNG A3 2016', nMax: 2 },
  { id: 'A320', nome: 'SAMSUNG A3 2017', nMax: 2 },
  { id: 'A105', nome: 'SAMSUNG A10', compat: ' A7 2018 A750', nMax: 2 },
  { id: 'A505', nome: 'SAMSUNG A30', compat: 'A20-A30-A30S-A50', nMax: 2 },
  { id: 'A405', nome: 'SAMSUNG A40', nMax: 2 },
  { id: 'A202', nome: 'SAMSUNG A20E', nMax: 2 },
  { id: 'A705', nome: 'SAMSUNG A70', nMax: 2 },
  { id: 'A510', nome: 'SAMSUNG A5 2016', nMax: 2 },
  { id: 'A520', nome: 'SAMSUNG A5 2017', compat:'J5 2017 J530', nMax: 2 },
  { id: 'A605', nome: 'SAMSUNG A6 PLUS 2018', nMax: 2 },
  { id: 'J320', nome: 'SAMSUNG J3 2016',compat:'J5 2015 SM-J500F', nMax: 2 },
  { id: 'J330', nome: 'SAMSUNG J3 2017',compat:'J5 2015 SM-J500F', nMax: 2 },
  { id: 'J415', nome: 'SAMSUNG J4 PLUS',compat:'J6 PLUS', nMax: 2 },
  { id: 'J510', nome: 'SAMSUNG J5 2016',compat:'J6 PLUS', nMax: 2 },
  { id: 'J710', nome: 'SAMSUNG J7 2016',compat:'J6 PLUS', nMax: 2 },
  { id: 'J730', nome: 'SAMSUNG J7 2017',compat:'J6 PLUS', nMax: 2 },
]
const sectionList = [
  {
    title: 'To Order',
    data: list
  }
]
export default class BattListSM extends BattList {
  state = { modalVisible: false, modalVisibleResi: false, clearList:false}

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
            this.setModalVisible(!this.state.modalVisible)
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
