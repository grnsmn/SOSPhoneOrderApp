import React, { PureComponent } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
//import AsyncStorage from '@react-native-async-storage/async-storage'
import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: 'AIzaSyCiHpV7RMsd2okgSwqqBra2e8Gc3dlrKCY',
  authDomain: 'sosorderapp.firebaseapp.com',
  databaseURL:
    'https://sosorderapp-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'sosorderapp',
  storageBucket: 'sosorderapp.appspot.com',
  messagingSenderId: '767773027474',
  appId: '1:767773027474:web:7065eaed04359967d2ca4b',
  measurementId: 'G-30X46P77RX'
}
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app() // if already initialized, use that one
}

export default class Item extends PureComponent {
  state = {
    id: '',
    nomeItem: '',
    compat: '',
    section: 'BATT',
    contatore: 0,
    NumResi: 0,
    modalVisible: false
  }
  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }
  constructor (props) {
    super(props)
    this.state.nomeItem = this.props.NameItem
    this.state.id = this.props.id
    this.state.compat = this.props.compat
  }
  updateItem (ramo) {
    firebase
      .database()
      .ref(ramo)
      .update({
        [String(this.state.nomeItem)]: {
          id: this.state.id,
          n: this.state.contatore,
          resi: this.state.NumResi,
          codice: this.props.codice != null ? this.props.codice : null,
          nMax: this.props.nMax
        }
      })
  }
  componentDidMount () {
    // if (this.state.nomeItem.includes('IPHONE')) {
    var dbPoint = firebase
      .database()
      .ref(this.props.pathDB + this.state.nomeItem)

    dbPoint.on('value', snap => {
      const tmp = snap.val()
      if (tmp != null) {
        this.setState({ contatore: tmp.n, NumResi: tmp.resi })
      }
      if (this.state.contatore == 0) global.store_Batt.delete(this.state.id)
      if (this.state.contatore != 0) {
        global.store_Batt.set(this.state.id, {
          name: this.state.nomeItem,
          n: this.state.contatore,
          section: this.state.section
        })
      }
      
      if (this.state.NumResi == 0) global.resi_Batt_IP.delete(this.state.id)
      if (this.state.NumResi != 0) {
        global.resi_Batt_IP.set(this.state.id, {
          name: this.state.nomeItem,
          n: this.state.NumResi,
          section: this.state.section
        })
      }
    })
  }
  componentDidUpdate () {
    this.updateItem(this.props.pathDB)
    
    if (this.state.contatore == 0) {
      global.store_Batt.delete(this.state.id)
      firebase
      .database()
      .ref('/BATTERIE/ORDER/' + this.state.nomeItem)
      .remove()
    }
    if (this.state.contatore != 0) {
      this.updateItem('BATTERIE/ORDER/')
      global.store_Batt.set(this.state.id, {
        name: this.state.nomeItem,
        n: this.state.contatore,
        section: this.state.section
      })
    }
    if (this.state.NumResi == 0) global.resi_Batt_IP.delete(this.state.id)
    if (this.state.NumResi != 0) {
      this.updateItem('BATTERIE/ORDER/')
      global.resi_Batt_IP.set(this.state.id, {
        name: this.state.nomeItem,
        n: this.state.NumResi,
        section: this.state.section
      })
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.titleItem}>
          {this.props.NameItem}
          {this.props.codice ? (
            <Text style={styles.codText}>{'\n' + this.props.codice}</Text>
          ) : (
            <Text />
          )}
          {(this.state.nomeItem.includes('SAMSUNG')==true) ? (
            <Text style={styles.codText}>{'\n' + this.props.id}</Text>
          ) : (
            <Text />
          )}
        </Text>
        <Text style={styles.compaText}>{this.state.compat}</Text>
        <View
          style={{
            flex: 1,
            margin: 1.5,
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <View style={{ flex: 0.5, borderLeftWidth: 0, borderColor: 'gold' }}>
            <Input
              style={{ borderWidth: 1, color: 'white', textAlign: 'center' }}
              renderErrorMessage={false}
              labelStyle={{ color: 'gold', textAlign: 'center', fontSize: 11 }}
              label={'To Order'}
              placeholder={
                String(this.state.contatore) == '0'
                  ? '-'
                  : String(this.state.contatore)
              }
              placeholderTextColor={'gold'}
              keyboardType='number-pad'
              maxLength={1}
              onChangeText={value => {
                if (value <= this.props.nMax && value != '') {
                  this.setState({ contatore: parseInt(value) })
                }
              }}
              //onSubmitEditing={() => this.componentDidMount()}
              errorStyle={{ color: 'red', textAlign: 'center', fontSize: 10 }}
              errorMessage={'max ' + this.props.nMax}
            />
          </View>
          <View
            style={{
              flex: 0.4,
              borderLeftWidth: 0.5,
              borderColor: '#2196F3'
            }}
          >
            <Input
              label={'Reso'}
              style={{ borderWidth: 1, color: 'white', textAlign: 'center' }}
              renderErrorMessage={false}
              labelStyle={{
                color: 'lightgreen',
                textAlign: 'center',
                fontSize: 10
              }}
              placeholder={
                this.state.NumResi.toString() == '0'
                  ? '-'
                  : this.state.NumResi.toString()
              }
              placeholderTextColor={'lightgreen'}
              keyboardType='number-pad'
              maxLength={1}
              onChangeText={value => {
                if (value != '') {
                  this.setState({ NumResi: parseInt(value) })
                }
              }}
              //onSubmitEditing={() => this.componentDidMount()}
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
    borderColor: '#2196F3',
    borderWidth: 0.3,
    borderRadius: 10,
    margin: 2,
    alignItems: 'center',
    backgroundColor: '#000'
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
  },
  titleItem: {
    color: '#F1F3F4',
    flex: 1.1,
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  codText: {
    color: '#2196F3',
    fontSize: 11,
    textAlign: 'center'
  },
  compaText: {
    color: 'grey',
    flex: 0.75,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right'
  }
})
