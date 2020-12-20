import React, { Component } from 'react'
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

const list = [
    { id: 'uiz', nome: 'IPHONE 5', nMax: 2 },
    { id: 't1b', nome: 'IPHONE 5S', nMax: 2 },
    { id: 'lui', nome: 'IPHONE 6', nMax: 2 },
    { id: 'zfv', nome: 'IPHONE 6S', nMax: 2 },
    { id: 's4o', nome: 'IPHONE 7', nMax: 2 },
    { id: '5wo', nome: 'IPHONE 8', nMax: 2 },
    { id: 'a58', nome: 'IPHONE 6/6S PLUS', nMax: 2 },
    { id: 'bjy', nome: 'IPHONE 7 PLUS', nMax: 2 },
    { id: 'h5q', nome: 'IPHONE 8 PLUS', nMax: 2 },
    { id: 'mqq', nome: 'IPHONE X', nMax: 2 },
    { id: '5ko', nome: 'IPHONE XR', nMax: 2 }
  ]
  /*const T_HomeList = [
    { id: 'l2w', nome: 'IPHONE 5s', nMax: 2 },
    { id: 'l8i', nome: 'IPHONE 6', nMax: 2 },
    { id: 'z1q', nome: 'IPHONE 6S', nMax: 2 },   
]*/
  const sectionList = [
    {
      title: 'Dock Ricarica',
      data: list
    },
    {
      title: 'Circuito Prossimità',
      data: list
    },
    /*{
      title: 'Tasto Home',
      data: T_HomeList
    }*/
  ]
  export default class OtherList extends Component {
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
                  {JSON.stringify(
                    [...global.store_Batt_IP.values()]
                      .sort()
                      .map(function (element) {
                        return element
                      })
                  )}
                </Text>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                  }}
                >
                  <Text style={styles.textStyle}>Hide List</Text>
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
                  {JSON.stringify(
                    [...global.resi_Batt_IP.values()]
                      .sort()
                      .map(function (element) {
                        return element
                      })
                  )}
                </Text>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                  onPress={() => {
                    this.setModalVisibleResi(!this.state.modalVisibleResi)
                  }}
                >
                  <Text style={styles.textStyle}>Hide List</Text>
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
      color:'white',
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
  