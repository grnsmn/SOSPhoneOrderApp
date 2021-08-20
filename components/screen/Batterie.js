import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Modal,
  TouchableHighlight,
  Share
} from 'react-native'
import Item from '../Item'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appbar, Searchbar, Snackbar } from 'react-native-paper'

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
  { id: 'H9K', nome: 'IPHONE 6 PLUS', nMax: 2 },
  { id: 'PNB', nome: 'IPHONE 7 PLUS', nMax: 2 },
  { id: 'IK8', nome: 'IPHONE 8 PLUS', nMax: 2 },
  { id: 'XVW', nome: 'IPHONE X', nMax: 2 },
  { id: 'XVR', nome: 'IPHONE XR', nMax: 2 },
  { id: 'XSV', nome: 'IPHONE XS', nMax: 2 },
  { id: 'XQ4', nome: 'IPHONE XS MAX', nMax: 2 }
]
const sectionList = [
  {
    title: 'To Order',
    data: list
  }
]
export default class BattList extends PureComponent {
  state = {
    modalVisible: false,
    clearList: false,
    listFiltered: sectionList,
    searchModel: '',
    refresh:false
  }
  
  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }
  
  renderRow = ({ item }) => (
    <Item
      NameItem={item.nome}
      nMax={item.nMax}
      id={item.id}
      compat={item.compat}
      codice={item.codice}
      clear= {this.state.refresh}
    />
  )
  search (model) {
    this.setState({
      listFiltered: [
        {
          title: 'To order',
          data: list.filter(elem => elem.nome.includes(model.toUpperCase()))
        }
      ]
    })
  }
  onShareBatt = async () => {
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
          // parseInt(tomorrow.getMonth() + 1) +  //BISOGNA EFFETTUARE LA SOMMA PERCHE getMonth restituisce numeri da 0 a 11 in stringa così che corrisponda alla data italiana
          // '/' +
          // tomorrow.getFullYear() +
          // '\n\n' +
          global.listBatt +
          (global.resi_Batt_IP.size == 0
            ? ''
            : '\nResi:\n' + global.listResiBatt)
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
    global.listBatt = '' //SVUOTA LA LISTA BATTERIA PRIMA DI UN NUOVO CONCATENAMENTO DI AGGIORNAMENTO DELLA LISTA
    global.store_Batt.forEach(element => {
      global.listBatt += element.n + 'x ' + ' BATT ' + element.name + '\n'
    })
    global.listResiBatt = ''
    global.resi_Batt_IP.size == 0
      ? (global.listResiBatt = '')
      : global.resi_Batt_IP.forEach(element => {
          global.listResiBatt +=
            element.n + 'x ' + ' BATT ' + element.name + '\n'
        })
    this.onShareBatt()
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
    this.setState({ clearList: !this.state.clearList, refresh: !this.state.refresh})
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
              <Text style={styles.modalTextResi}>
                RESI {'\n'}
                {[...global.resi_Batt_IP.values()]
                  .sort()
                  .map(function (element) {
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
          sections={this.state.listFiltered}
          renderItem={this.renderRow}
          refreshing={this.state.refresh}          
        ></SectionList>
        <Searchbar
          placeholder='Cerca...'
          onChangeText={text => this.search(text)}
          style={styles.input}
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
              this.clearListBatt()
            }}
          />
          <Appbar.Action
            style={{ flex: 1 }}
            icon='send'
            onPress={() => {
              this.stampList()
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
    backgroundColor: '#181818',
    padding: 5
    //paddingTop: StatusBar.length
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
    textAlign: 'center',
    color: 'gold'
  },
  modalTextResi: {
    marginBottom: 15,
    textAlign: 'left',
    color: 'lightgreen'
  },
  input: {
    backgroundColor: '#2196F3',
    borderColor: '#252850',
    borderWidth: 0.5,
    marginTop: 3,
    height: 40,
    borderRadius: 10
  }
})
