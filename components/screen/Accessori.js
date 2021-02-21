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
  { id: 'Aè4', nome: 'ALIM. COMPUTER', nMax: 2 },
  { id: 'qèp', nome: 'SCHEDA SD 16GB', nMax: 2 },
  { id: 'qè1', nome: 'SCHEDA SD 32GB', nMax: 2 },
  { id: 'qè2', nome: 'SCHEDA SD 64GB', nMax: 2 },
  { id: 'qè3', nome: 'PENDRIVE 16GB', nMax: 2 },
  { id: 'qè4', nome: 'PENDRIVE 32GB', nMax: 2 },
  { id: 'qè5', nome: 'PENDRIVE 64GB', nMax: 2 },
]

const list_magazzino = [
    { id: 'za8', nome: 'PELLICOLE ZAGG SMALL', nMax: 5 },
    { id: 'zaG', nome: 'PELLICOLE ZAGG LARGE', nMax: 2 },
    { id: 'zaS', nome: 'SPRAY ZAGG', nMax: 2 },
    { id: 'VT1', nome: 'V.TEMP IP 7', nMax: 5 },
    { id: 'VT2', nome: 'V.TEMP IP 7 PLUS', nMax: 5 },
    { id: 'VT3', nome: 'V.TEMP IP X', nMax: 5 },
    { id: 'VT4', nome: 'V.TEMP IP XR/11', nMax: 5 },
    { id: 'BL1', nome: 'ARIA COMPRESSA', nMax: 5 },
    { id: 'BL2', nome: 'ALCOOL ISOPROPILICO', nMax: 5 },
  ]

  const sectionList = [
    {
      title: 'Magazzino',
      data: list_magazzino
    },
    {
      title: 'Banco Vendita',
      data: list_banco_vendita
    },
    // {
    //   title: 'Tasto Home',
    //   data: T_HomeList
    // }
  ]

  export default class Accessori extends PureComponent {
    state = { modalVisible: false, modalVisibleResi: false }
  
    setModalVisible = visible => {
      this.setState({ modalVisible: visible })
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
              // onPress={() => this.setModalVisible(true)}
            />
            <Appbar.Action
              style={{ flex: 1 }}
              icon='recycle'
              color={'lightgreen'}
              // onPress={() => this.setModalVisibleResi(true)}
            />
            <Appbar.Action
              style={{ flex: 1 }}
              icon='printer-wireless'
              // onPress={() =>  this.stampList()}
            />
            <Appbar.Action
              style={{ flex: 1 }}
              icon='delete'
              color={'red'}
              // onPress={() => {
              //   this.clearListBatt()
              // }}
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
  