import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Modal,
  TouchableHighlight,
  Share,
  TextInput
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appbar, Snackbar } from 'react-native-paper'
import ItemAccessori from '../ItemAccessori'
import { SearchBar } from 'react-native-elements'

const list_banco_vendita = [
  { id: 'cT6', nome: 'ADATTATORI SIM', nMax: 20 },
  { id: 'cè1', nome: 'CAVO LIGHTNING 2M', nMax: 20 },
  { id: 'cè6', nome: 'CAVO LIGHTNING', nMax: 20 },
  { id: 'cè8', nome: 'CAVO MICRO-USB', nMax: 20 },
  { id: 'cè2', nome: 'CAVO MICRO-USB 2M', nMax: 20 },
  { id: 'cèM', nome: 'CAVO TYPE-C/LIGHTING', nMax: 20 },
  { id: 'cèH', nome: 'CAVO TYPE-C/TYPE-C', nMax: 20 },
  { id: 'cè9', nome: 'CAVO TYPE-C', nMax: 20 },
  { id: 'cè0', nome: 'CAVO TYPE-C 2M', nMax: 20 },
  { id: 'Aè1', nome: 'ALIM. 2.1A', nMax: 20 },
  { id: 'Aè2', nome: 'ALIM. USB 3A', nMax: 20 },
  { id: 'Aè3', nome: 'ALIM. TYPE-C 3A', nMax: 20 },
  { id: 'pè3', nome: 'POWER-BANK', nMax: 10 },
  { id: 'Aè4', nome: 'ALIM. COMPUTER', nMax: 6 },
  { id: 'qèp', nome: 'SCHEDA SD 16GB', nMax: 6 },
  { id: 'qè1', nome: 'SCHEDA SD 32GB', nMax: 6 },
  { id: 'qè2', nome: 'SCHEDA SD 64GB', nMax: 6 },
  { id: 'qè3', nome: 'PENDRIVE 16GB', nMax: 6 },
  { id: 'qè4', nome: 'PENDRIVE 32GB', nMax: 6 },
  { id: 'qè5', nome: 'PENDRIVE 64GB', nMax: 6 },
  { id: 'qò5', nome: 'AURICOLARI LIGHTNING (IPHONE)', nMax: 6 },
  { id: 'qò1', nome: 'AURICOLARI JACK 3.5', nMax: 6 },
  { id: 'qò2', nome: 'AURICOLARI BLUETOOTH', nMax: 6 },
  { id: 'qò3', nome: 'AIRPODS COMPATIBILI', nMax: 6 },
  { id: 'b0à', nome: 'COVER TPU IPHONE [6/6S]', nMax: 15 },
  { id: 'b1à', nome: 'COVER TPU IPHONE [7/8]', nMax: 15 },
  { id: 'b2à', nome: 'COVER TPU IPHONE [X/XS]', nMax: 15 },
  { id: 'ba0', nome: 'COVER TPU IPHONE [7/8] TRASPARENTI', nMax: 15 },
  { id: 'bùà', nome: 'COVER TPU IPHONE X TRASPARENTI', nMax: 15 },
  { id: 'b3à', nome: 'COVER TPU IPHONE XR', nMax: 15 },
  { id: 'b4à', nome: 'COVER TPU IPHONE 11', nMax: 15 },
  { id: 'b5à', nome: 'COVER TPU IPHONE 12', nMax: 15 },
  { id: 'p5à', nome: 'COVER TPU IPHONE 12 MINI', nMax: 15 },
  { id: 'b8à', nome: 'COVER TPU IPHONE 12 PRO MAX', nMax: 15 },
  { id: 'b9à', nome: 'COVER TPU IPHONE 13', nMax: 15 },
  { id: 'c0à', nome: 'COVER TPU IPHONE 13 MINI', nMax: 15 },
  { id: 'c1à', nome: 'COVER TPU IPHONE 13 PRO MAX', nMax: 15 },
  { id: 'b6à', nome: 'COVER TPU IPHONE 6PLUS', nMax: 15 },
  { id: 'b7à', nome: 'COVER TPU IPHONE 7PLUS', nMax: 15 }
]

const list_magazzino = [
  { id: 'za8', nome: 'PELLICOLE ZAGG SMALL', nMax: 10 },
  { id: 'zaG', nome: 'PELLICOLE ZAGG LARGE', nMax: 10 },
  { id: 'zaS', nome: 'SPRAY ZAGG', nMax: 2 },
  { id: 'VT0', nome: 'V.TEMP IPHONE 5', nMax: 10 },
  { id: 'VT1', nome: 'V.TEMP IPHONE 7', nMax: 10 },
  { id: 'VT2', nome: 'V.TEMP IPHONE 7P', nMax: 10 },
  { id: 'VT3', nome: 'V.TEMP IPHONE X/11 PRO', nMax: 10 },
  { id: 'VT4', nome: 'V.TEMP IPHONE XR/11', nMax: 10 },
  { id: 'VT5', nome: 'V.TEMP IPHONE XS MAX', nMax: 10 },
  { id: 'VT6', nome: 'V.TEMP IPHONE 12/12 PRO', nMax: 10 },
  { id: 'VT7', nome: 'V.TEMP IPHONE 13', nMax: 10 },
  { id: 'BL1', nome: 'ARIA COMPRESSA', nMax: 5 },
  { id: 'BL2', nome: 'ALCOOL ISOPROPILICO', nMax: 5 },
  { id: 'BL3', nome: 'COLLA B-7000 110ml', nMax: 2 }
]

const sectionList = [
  {
    title: 'Magazzino',
    data: list_magazzino
  },
  {
    title: 'Accessori e utilità ',
    data: list_banco_vendita
  }
  // {
  //   title: 'Tasto Home',
  //   data: T_HomeList
  // }
]
global.list_accessori = ''
export default class Accessori extends PureComponent {
  state = {
    modalVisible: false,
    modalVisibleResi: false,
    listFiltered: sectionList,
    search: '',
    clearList: false,
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }
  search (model) {
    this.setState({
      search:model,
      listFiltered: [
        {
          title: 'Magazzino',
          data: list_magazzino.filter(elem =>
            elem.nome.includes(model.toUpperCase())
          )
        },
        {
          title: 'Accessori e Utilità',
          data: list_banco_vendita.filter(elem =>
            elem.nome.includes(model.toUpperCase())
          )
        }
      ]
    })
  }
  onShareAccessori = async () => {
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
          global.list_accessori
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
    global.list_accessori = '' //SVUOTA LA LISTA BATTERIA PRIMA DI UN NUOVO CONCATENAMENTO DI AGGIORNAMENTO DELLA LISTA
    global.store_accessori.forEach(element => {
      global.list_accessori += element.name + ' (' + element.n + ') ' + '\n'
    })
    this.onShareAccessori()
  }

  clearListAccessori () {
    //Azzera lista ordine
    global.store_accessori.clear()
    global.list_accessori = ''
    this.setState({ clearList: !this.state.clearList})

    list_banco_vendita.forEach(element => {
      //AZZERA TUTTI GLI ELEMENTI NELLO STORE CON PERSISTENZA LOCALE
      const item = {
        id: element.id,
        nomeItem: element.nome,
        contatore: '-'
      }
      AsyncStorage.mergeItem(element.id, JSON.stringify(item))
    })
    list_magazzino.forEach(element => {
      //AZZERA TUTTI GLI ELEMENTI NELLO STORE CON PERSISTENZA LOCALE
      const item = {
        id: element.id,
        nomeItem: element.nome,
        contatore: '-'
      }
      AsyncStorage.mergeItem(element.id, JSON.stringify(item))
    })
    
  }
  setModalVisibleResi = visible => {
    this.setState({ modalVisibleResi: visible })
  }
  renderRow = ({ item }) => (
    <ItemAccessori NameItem={item.nome} nMax={item.nMax} id={item.id}/>
  )
  render () {
    return (
      <View style={styles.container}>
       <Snackbar
          visible={this.state.clearList}
          onDismiss={() => this.setState({ clearList: false })}
          duration={700}
          style={{ backgroundColor: '#252849', textAlign: 'center' }}
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                IN ORDINE {'\n\n'}
                {[...global.store_accessori.values()]
                  .sort()
                  .map(function (element) {
                    return String(element.name + ' (' + element.n + ') ' + '\n')
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
        <SectionList
        keyExtractor={(item,index)=> item.id}
          sections={this.state.listFiltered}
          renderItem={this.renderRow}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        ></SectionList>
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
            icon='printer-wireless'
            onPress={() => this.stampList()}
          />
          <Appbar.Action
            style={{ flex: 1 }}
            icon='delete'
            color={'red'}
            onPress={() => this.clearListAccessori()}
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
    fontSize: 25,
    color: 'gold',
    backgroundColor: '#252850',
    textAlign: 'center'
  },
  bottom: {
    borderRadius: 15,
    borderTopWidth: 1,
   // borderColor: '#2196F3',
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
