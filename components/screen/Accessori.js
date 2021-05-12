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
import { Appbar } from 'react-native-paper'
import ItemAccessori from '../ItemAccessori'

const list_banco_vendita = [
  { id: 'cè6', nome: 'CAVO LIGHTNING', nMax: 4 },
  { id: 'cè1', nome: 'CAVO LIGHTNING 2M', nMax: 4 },
  { id: 'cè8', nome: 'CAVO MICRO-USB', nMax: 4 },
  { id: 'cè2', nome: 'CAVO MICRO-USB 2M', nMax: 4 },
  { id: 'cè9', nome: 'CAVO TYPE-C', nMax: 4 },
  { id: 'cè0', nome: 'CAVO TYPE-C 2M', nMax: 4 },
  { id: 'Aè1', nome: 'ALIM. 2.1A', nMax: 4 },
  { id: 'Aè2', nome: 'ALIM. USB 3A', nMax: 4 },
  { id: 'Aè3', nome: 'ALIM. TYPE-C 3A', nMax: 4 },
  { id: 'pè3', nome: 'POWER-BANK', nMax: 4 },
  { id: 'Aè4', nome: 'ALIM. COMPUTER', nMax: 2 },
  { id: 'qèp', nome: 'SCHEDA SD 16GB', nMax: 2 },
  { id: 'qè1', nome: 'SCHEDA SD 32GB', nMax: 2 },
  { id: 'qè2', nome: 'SCHEDA SD 64GB', nMax: 2 },
  { id: 'qè3', nome: 'PENDRIVE 16GB', nMax: 2 },
  { id: 'qè4', nome: 'PENDRIVE 32GB', nMax: 2 },
  { id: 'qè5', nome: 'PENDRIVE 64GB', nMax: 2 },
  { id: 'qò5', nome: 'AURICOLARI LIGHTNING (IPHONE)', nMax: 2 },
  { id: 'qò1', nome: 'AURICOLARI JACK 3.5', nMax: 2 },
  { id: 'qò2', nome: 'AURICOLARI BLUETOOTH', nMax: 2 },
  { id: 'qò3', nome: 'AIRPODS COMPATIBILI', nMax: 2 },
  { id: 'b0à', nome: 'COVER TPU IPHONE [6/6S]', nMax: 5 },
  { id: 'b1à', nome: 'COVER TPU IPHONE [7/8]', nMax: 5 },
  { id: 'b2à', nome: 'COVER TPU IPHONE [X/XS]', nMax: 5 },
  { id: 'bùà', nome: 'COVER TPU IPHONE X TRASPARENTI', nMax: 5 },
  { id: 'b3à', nome: 'COVER TPU IPHONE XR', nMax: 5 },
  { id: 'b4à', nome: 'COVER TPU IPHONE 11', nMax: 5 },
  { id: 'b5à', nome: 'COVER TPU IPHONE 12', nMax: 5 },
  { id: 'b6à', nome: 'COVER TPU IPHONE 6PLUS', nMax: 5 },
  { id: 'b7à', nome: 'COVER TPU IPHONE 7PLUS', nMax: 5 },
]

const list_magazzino = [
    { id: 'za8', nome: 'PELLICOLE ZAGG SMALL', nMax: 10 },
    { id: 'zaG', nome: 'PELLICOLE ZAGG LARGE', nMax: 2 },
    { id: 'zaS', nome: 'SPRAY ZAGG', nMax: 2 },
    { id: 'VT1', nome: 'V.TEMP IPHONE 7', nMax: 10 },
    { id: 'VT2', nome: 'V.TEMP IPHONE 7P', nMax: 10 },
    { id: 'VT3', nome: 'V.TEMP IPHONE X', nMax: 10 },
    { id: 'VT4', nome: 'V.TEMP IPHONE XR/11', nMax: 10 },
    { id: 'BL1', nome: 'ARIA COMPRESSA', nMax: 5 },
    { id: 'BL2', nome: 'ALCOOL ISOPROPILICO', nMax: 5 },
    { id: 'BL3', nome: 'COLLA B-7000 110ml', nMax: 1 },
  ]

  const sectionList = [
    {
      title: 'Magazzino',
      data: list_magazzino
    },
    {
      title: 'Accessori e utilità ',
      data: list_banco_vendita
    },
    // {
    //   title: 'Tasto Home',
    //   data: T_HomeList
    // }
  ]
  global.list_accessori = ''
  export default class Accessori extends PureComponent {
    state = { modalVisible: false, modalVisibleResi: false }
  
    setModalVisible = visible => {
      this.setState({ modalVisible: visible })
    }
    onShareAccessori = async () => {
      try {
        const data = new Date()
        const tomorrow = new Date(data)
        tomorrow.setDate(tomorrow.getDate() + 1)
        if(tomorrow.getDay()==0) {
          tomorrow.setDate(tomorrow.getDate() + 1)
        }
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
        global.list_accessori += element.name + ' ('+element.n + ') '+ '\n'
      })
      this.onShareAccessori()
    }
    
    clearListAccessori () {
      //Azzera lista ordine
      global.store_accessori.clear()
      global.list_accessori = ''
      list_banco_vendita.forEach(element => {
        //AZZERA TUTTI GLI ELEMENTI NELLO STORE CON PERSISTENZA LOCALE
        const item = {
          id: element.id,
          nomeItem: element.nome,
          contatore: 0
        }
        AsyncStorage.mergeItem(element.id, JSON.stringify(item))
      })
      list_magazzino.forEach(element => {
        //AZZERA TUTTI GLI ELEMENTI NELLO STORE CON PERSISTENZA LOCALE
        const item = {
          id: element.id,
          nomeItem: element.nome,
          contatore: 0
        }
        AsyncStorage.mergeItem(element.id, JSON.stringify(item))
      })
      alert('Lista Svuotata')
    }
    setModalVisibleResi = visible => {
      this.setState({ modalVisibleResi: visible })
    }
    renderRow = ({ item }) => (
      <ItemAccessori NameItem={item.nome} nMax={item.nMax} id={item.id} />
    )
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
                  [...global.store_accessori.values()]
                    .sort()
                    .map(function (element) {
                      return String( element.name + ' ('+element.n + ') '+ '\n')
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
          <SectionList
            sections={sectionList}
            renderItem={this.renderRow}
             renderSectionHeader={({ section: { title } }) => (
               <Text style={styles.header}>{title}</Text>
             )}
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
              icon='printer-wireless'
              onPress={() =>  this.stampList()}
            />
            <Appbar.Action
              style={{ flex: 1 }}
              icon='delete'
              color={'red'}
              onPress={() => this.clearListAccessori() }
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
      color:'gold',
      backgroundColor: '#252850',
      textAlign:'center'
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
  