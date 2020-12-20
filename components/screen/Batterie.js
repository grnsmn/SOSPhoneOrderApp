import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Modal,
  TouchableHighlight
} from 'react-native'
import Item from '../Item'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appbar } from 'react-native-paper'


global.listBatt = '' //Variabile globale per la scrittura dell'ordine finale
global.listResiBatt = '' //Variabile globale per la scrittura della lista dei resi finale

const list = [
  { id: 'S0Z', nome: 'IPHONE 5', nMax: 2 },
  { id: 'v8E', nome: 'IPHONE 5S', nMax: 2 },
  { id: 'v8L', nome: 'IPHONE SE', nMax: 2 },
  { id: '3EV', nome: 'IPHONE 6', nMax: 4 },
  { id: '34K', nome: 'IPHONE 6S', nMax: 4 },
  { id: '5Q6', nome: 'IPHONE 7', nMax: 4 },
  { id: 'NQH', nome: 'IPHONE 8', nMax: 2 },
  { id: 'H9K', nome: 'IPHONE 6/6S PLUS', nMax: 2 },
  { id: 'PNB', nome: 'IPHONE 7 PLUS', nMax: 2 },
  { id: 'IK8', nome: 'IPHONE 8 PLUS', nMax: 2 },
  { id: 'XVW', nome: 'IPHONE X', nMax: 2 },
  { id: 'XVR', nome: 'IPHONE XR', nMax: 2 }
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
export default class BattList extends PureComponent {
  state = { modalVisible: false, modalVisibleResi: false }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }

  setModalVisibleResi = visible => {
    this.setState({ modalVisibleResi: visible })
  }
  renderRow = ({ item }) => (
    <Item NameItem={item.nome} nMax={item.nMax} id={item.id} />
  )

  stampList () {
    global.listBatt = '' //SVUOTA LA LISTA BATTERIA PRIMA DI UN NUOVO CONCATENAMENTO DI AGGIORNAMENTO DELLA LISTA
    global.store_Batt.forEach(element => {
      global.listBatt += element.n + 'x ' + ' BATT ' + element.name + '\n'
    })
    global.listResiBatt = ''
    global.resi_Batt_IP.forEach(element => {
      global.listResiBatt += element.n + 'x ' + ' BATT ' + element.name + '\n'
    })
    alert('Ordine Inserito!')
  }
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
    //    <FlatList data={list} renderItem={this.renderRow} />

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
                  [...global.store_Batt.values()]
                    .sort()
                    .map(function (element) {
                      return String(element.n + 'x '+ element.name + '\n')
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
                  [...global.resi_Batt_IP.values()]
                    .sort()
                    .map(function (element) {
                      return String(element.n + 'x '+ element.name + '\n')
                    })
                }
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
            icon='printer-wireless'
            onPress={() =>  this.stampList()}
          />
          <Appbar.Action
            style={{ flex: 1 }}
            icon='delete'
            color={'red'}
            onPress={() => {
              this.clearListBatt()
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
    borderColor:'#f4511D',
    borderTopWidth:3,
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
    color:'white'
  }
})
