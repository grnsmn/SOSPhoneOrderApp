import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Modal, TouchableHighlight } from 'react-native'
import { Input } from 'react-native-elements'

import AsyncStorage from '@react-native-async-storage/async-storage'

global.store_Batt = new Map() //Oggetto map globale che conterrà nomi e quantità di BATTERIE IPHONE da mettere in lista
global.resi_Batt_IP = new Map() //Per immagazzinamento lista resi
export default class Item extends PureComponent {
  state = {
    id: '',
    nomeItem: '',
    contatore: 0,
    NumResi: 0,
    modalVisible: false,
  }
  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }
  constructor (props) {
    super(props)
    this.state.nomeItem = this.props.NameItem
    this.state.id = this.props.id
  }
  componentDidMount () {
    AsyncStorage.getItem(this.state.id).then(result => {
      //console.log(JSON.parse(result).contatore)
      const parseElement = JSON.parse(result)
      if (parseElement != null) {
        if (JSON.parse(result).id != null) {
          const tmp = JSON.parse(result, (key, value) => {
            //funzione per estrarre per ogni chiave il relativo valore dell'oggetto memorizzato nella memoria async
            return value
          })
          this.setState({ contatore: tmp.contatore, NumResi: tmp.NumResi })
          if (this.state.contatore == 0) global.store_Batt.delete(this.state.id)
          if (this.state.contatore != 0) {
            // console.log([...global.store_Batt.get(this.state.id)])
            global.store_Batt.set(this.state.id, {
              name: this.state.nomeItem,
              n: this.state.contatore
            })
          }

          if (this.state.NumResi == 0) global.resi_Batt_IP.delete(this.state.id)
          if (this.state.NumResi != 0) {
            global.resi_Batt_IP.set(this.state.id, {
              name: this.state.nomeItem,
              n: this.state.NumResi
            })
          }
        }
      } else {
      }
    })
  }
  componentDidUpdate () {
    AsyncStorage.mergeItem(this.state.id, JSON.stringify(this.state))
    if (this.state.contatore == 0) global.store_Batt.delete(this.state.id)
    if (this.state.contatore != 0) {
      global.store_Batt.set(this.state.id, {
        name: this.state.nomeItem,
        n: this.state.contatore
      })
    }
    if (this.state.NumResi == 0) global.resi_Batt_IP.delete(this.state.id)
    if (this.state.NumResi != 0) {
      global.resi_Batt_IP.set(this.state.id, {
        name: this.state.nomeItem,
        n: this.state.NumResi
      })
    }
  }

  inStore () {
    //this.setModalVisible(!this.state.modalVisible)
    this.componentDidMount()
    //console.log('elemento inserito')
  }
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
        <Text style={{ color: 'white', flex: 1, fontSize: 15, marginLeft: 10 }}>
          {this.props.NameItem}
        </Text>
        <View
          style={{
            flex: 1,
            margin: 1.5,
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{ flex: 0.4, borderLeftWidth: 0.5, borderColor: 'gold' }}
          >
            <Input
              style={{ borderWidth: 1, color: 'white' }}
              renderErrorMessage={false}
              labelStyle={{ color: 'gold', textAlign: 'center', fontSize: 11 }}
              label={'To Order'}
              placeholder={this.state.contatore.toString()}
              placeholderTextColor={'gold'}
              keyboardType='number-pad'
              maxLength={1}
              onChangeText={value => {
                if (value <= this.props.nMax && value != '') {
                  this.setState({ contatore: parseInt(value) })
                }
              }}
              onSubmitEditing={() => this.inStore()}
              errorStyle={{ color: 'red', textAlign: 'center', fontSize: 10 }}
              errorMessage={'max ' + this.props.nMax}
            />
          </View>
          <View
            style={{ flex: 0.3, borderLeftWidth: 0.5, borderColor: 'gold' }}
          >
            <Input
              label={'Reso'}
              style={{ borderWidth: 1, color: 'white' }}
              renderErrorMessage={false}
              labelStyle={{
                color: 'lightgreen',
                textAlign: 'center',
                fontSize: 10
              }}
              placeholder={String(this.state.NumResi)}
              placeholderTextColor={'lightgreen'}
              keyboardType='number-pad'
              maxLength={1}
              onChangeText={value => {
                if (value != '') {
                  this.setState({ NumResi: parseInt(value) })
                }
              }}
              onSubmitEditing={() => this.inStore()}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 0.25,
    margin: 1,
    alignItems: 'center'
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
