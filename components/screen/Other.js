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
import ItemLCD from '../ItemLCD'
import ItemOther from '../ItemOther'

const list = [
    { id: 'uiz', nome: 'IPHONE 5', nMax: 2 },
    // { id: 't1b', nome: 'IPHONE 5S', nMax: 2 },
    // { id: 'lui', nome: 'IPHONE 6', nMax: 2 },
    // { id: 'zfv', nome: 'IPHONE 6S', nMax: 2 },
    // { id: 's4o', nome: 'IPHONE 7', nMax: 2 },
    // { id: '5wo', nome: 'IPHONE 8', nMax: 2 },
    // { id: 'a58', nome: 'IPHONE 6 PLUS', nMax: 2 },
    // { id: 'a54', nome: 'IPHONE 6S PLUS', nMax: 2 },
    // { id: 'bjy', nome: 'IPHONE 7 PLUS', nMax: 2 },
    // { id: 'h5q', nome: 'IPHONE 8 PLUS', nMax: 2 },
    // { id: 'mqq', nome: 'IPHONE X', nMax: 2 },
    // { id: '5ko', nome: 'IPHONE XR', nMax: 2 }
  ]
  const T_HomeList = [
    { id: 'l2w', nome: 'IPHONE 5S', nMax: 2 },
    { id: 'l8i', nome: 'IPHONE 6', nMax: 2 },
    { id: 'z9q', nome: 'IPHONE 6S', nMax: 2 },   
]
  const BackoverList = [
    { id: 'ghw', nome: 'IPHONE 8', nMax: 2 },
    { id: 'l65', nome: 'IPHONE X', nMax: 2 },
    { id: 'Y3Z', nome: 'IPHONE XS', nMax: 2 },
    { id: 'YX0', nome: 'IPHONE XS MAX', nMax: 2 },
    { id: 'S5f', nome: 'IPHONE 8 PLUS', nMax: 2 },   
]
  const sectionList = [
    {
      title: 'Dock Ricarica',
      data: list
    },
    // {
    //   title: 'Circuito Prossimità',
    //   data: list
    // },
    // {
    //   title: 'Tasto Home',
    //   data: T_HomeList
    // }
  ]
  const sectionListColor = [
    {test: {
      title: 'T. Home',
      data: T_HomeList
    }},
    {test2: {
      title: 'Backcover',
      data: BackoverList
    }}
  ]
  export default class OtherList extends PureComponent {
    state = { modalVisible: false, modalVisibleResi: false }
  
    setModalVisible = visible => {
      this.setState({ modalVisible: visible })
    }
  
    setModalVisibleResi = visible => {
      this.setState({ modalVisibleResi: visible })
    }
    renderRow = ({ item }) => (
      <ItemOther NameItem={item.nome} nMax={item.nMax} id={item.id} />
    )
    renderRowColor = ({ item }) => (
      <ItemLCD NameItem={item.nome} nMax={item.nMax} id={item.id} />
    )
    componentDidMount(){
      console.log(JSON.stringify(sectionListColor))
    }
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
  