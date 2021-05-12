import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Modal, TouchableHighlight } from 'react-native'
import { Input } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'

global.store_accessori = new Map() 

export default class ItemAccessori extends PureComponent {
  state = {
    id: '',
    nomeItem: '',
    nomeSection: '',
    contatore: 0,
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
          this.setState({ contatore: tmp.contatore,})
          if (this.state.contatore == 0) global.store_accessori.delete(this.state.id)
          if (this.state.contatore != 0) {
            global.store_accessori.set(this.state.id, {
              name: this.state.nomeItem,
              n: this.state.contatore
            })
          }
        }
      } else {
      }
    })
  }
  componentDidUpdate () {
    AsyncStorage.mergeItem(this.state.id, JSON.stringify(this.state))
    if (this.state.contatore == 88 ) global.store_accessori.delete(this.state.id)
    if (this.state.contatore != 0) {
      global.store_accessori.set(this.state.id, {
        name: this.state.nomeItem,
        n: this.state.contatore
      })
    }
  }

  inStore () {
    //this.setModalVisible(!this.state.modalVisible)
    this.componentDidMount()
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
              label={'Ultimi'}
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
    alignItems: 'center',
    backgroundColor: '#181818'

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
