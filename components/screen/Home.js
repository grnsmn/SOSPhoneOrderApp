import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableHighlight,
  Vibration,
  StatusBar
} from 'react-native'
import { Button, Input } from 'react-native-elements'
import { FAB, Snackbar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ShareExample from '../Sharing'
import ListOrder from '../ListOrder'
import AsyncStorage from '@react-native-async-storage/async-storage'

global.extra = ''

export default class Home extends Component {
  state = {
    text: '',
    input: React.createRef(),
    toDay: new Date(),
    modalVisible: false,
    modalVisibleOrder: false,
    reset: false
  }
  constructor (props) {
    super(props)
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }
  setModalVisibleOrder = visible => {
    this.setState({ modalVisibleOrder: visible })
  }

  _save () {
    global.extra += this.state.text + ' \n'
    AsyncStorage.setItem('ListExtra', global.extra)
    this.state.input.current.clear()
    //alert('Inserito!')
  }

  _reset () {
    global.store_Batt = new Map()
    global.resi_Batt_IP = new Map()
    global.store_Lcd = new Map()
    global.resi_Lcd = new Map()
    global.extra = ''
    global.listBatt = ''
    global.listDisplay = ''
    global.list_Batt_Huawei = ''
    global.list_Display_Huawei = ''
    global.listResiBatt = ''
    global.listResiDisplay = ''
    AsyncStorage.clear()
    this.setState({reset: !this.state.reset})
    Vibration.vibrate()
  }
  componentDidMount () {
    AsyncStorage.getItem('ListExtra').then(
      //Mantiene in memoria la lista scritta anche dopo il riavvio dell'app
      (result, err) => {
        if (result != null) {
          global.extra = result
        }
      }
    )
    // var i = 0
    // AsyncStorage.getAllKeys().then(
    //   (result, err) => {
    //     const x = [...result]
    //     console.log(x)
    //     for(i = 0; i<x.length; i++){
    //       AsyncStorage.getItem(x[i]).then( res =>{
    //         if(JSON.parse(res).section == 'BATT' && JSON.parse(res).contatore !=0){ 
    //           global.store_Batt.set(JSON.parse(res).id, {
    //             name: JSON.parse(res).nomeItem,
    //             n: JSON.parse(res).contatore,
    //             section: JSON.parse(res).section
    //           })
    //         }
    //         else if(JSON.parse(res).section == 'LCD' && (JSON.parse(res).contatoreW !=0)){ 
    //           global.store_Lcd.set(JSON.parse(res).id_W, {
    //             name: JSON.parse(res).nomeItem,
    //             col: 'BIANCO',
    //             n: JSON.parse(res).contatoreW,
    //             frame: JSON.parse(res).noFrame == 'checked' ? '+ FRAME' : 'NO FRAME',
    //             section: JSON.parse(res).section
    //           })
    //         }
    //         else if(JSON.parse(res).section == 'LCD' && (JSON.parse(res).contatoreBK !=0)){ 
    //           global.store_Lcd.set(JSON.parse(res).id_BK, {
    //             name: JSON.parse(res).nomeItem,
    //             col: 'nero',
    //             n: JSON.parse(res).contatoreBK,
    //             frame: JSON.parse(res).noFrame == 'checked' ? '+ FRAME' : 'NO FRAME',
    //             section: JSON.parse(res).section
    //           })
    //         }
    //        }
    //          )
    //     }
    //     }
    // )
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar animated={false}></StatusBar>
        <Snackbar
          visible={this.state.reset}
          onDismiss= {() => this.setState({reset: false})}
          duration={700}
          style={{backgroundColor: '#252850', textAlign:''}}
          > RESET ESEGUITO </Snackbar>
        <View style={styles.modelSection}>
          <FAB
            style={styles.fab}
            small
            animated
            icon='delete-forever'
            onPress={() => this._reset()}
          />
          <FAB
            style={styles.fab2}
            animated
            icon='toolbox'
            onPress={() => this.props.navigation.navigate('Accessori')}
          />
          <Modal    //modal Lista Extra
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
                  IN ORDINE {'\n\n'}
                  {[...global.extra]}
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
          <Modal    //modal chiusura Lista Extra
            animationType='slide'
            transparent={true}
            visible={this.state.modalVisibleOrder}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.')
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ListOrder/>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                  onPress={() => {
                    this.setModalVisibleOrder(!this.state.modalVisibleOrder)
                  }}
                >
                  <Text style={styles.textStyle}>Chiudi</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <View
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              flex: 1
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('./apple.png')}
                style={{ width: 40, height: 40 }}
              />
              <Text style={{ color: 'white', fontSize: 18 }}>iPhone</Text>
            </View>
            <Button
              title='Batterie'
              buttonStyle={styles.button}
              onPress={() => this.props.navigation.navigate('Batterie')}
              icon={<Icon name='battery-unknown' size={28} color='white' />}
              //iconRight
            ></Button>
            <Button
              title='Display'
              buttonStyle={styles.button}
              onPress={() => this.props.navigation.navigate('Display')}
              icon={<Icon name='smartphone' size={28} color='white' />}
            ></Button>
            {/* <Button
              title=' Other'
              buttonStyle={styles.button}
              onPress={() => this.props.navigation.navigate('Other')}
              icon={<Icon name='more' size={28} color='white' />}
            ></Button>  */}
          </View>
          <View
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              flex: 1
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('./HUAWEI2.png')}
                style={{
                  width: 66,
                  height: 66,
                  backgroundColor: '#F1F3F4',
                  borderRadius: 11
                }}
              />
            </View>
            <Button
              title='Batterie'
              buttonStyle={styles.button}
              onPress={() => this.props.navigation.navigate('Batterie Huawei')}
              icon={<Icon name='battery-unknown' size={28} color='#F1F3F4' />}
              //iconRight
            ></Button>
            <Button
              title='Display'
              buttonStyle={styles.button}
              onPress={() => this.props.navigation.navigate('Display Huawei')}
              icon={<Icon name='smartphone' size={28} color='#F1F3F4' />}
            ></Button>
          </View>
          <View
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              flex: 1
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('./samsung.png')}
                style={{
                  width: 140,
                  height: 30,
                  marginTop:16,
                  marginBottom:16
                }}
              />
            </View>
            <Button
              title='Batterie'
              buttonStyle={styles.button}
              onPress={() => this.props.navigation.navigate('Batterie Samsung')}
              icon={<Icon name='battery-unknown' size={28} color='white' />}
              //iconRight
            ></Button>
            <Button
              title='Display'
              buttonStyle={styles.button}
              onPress={() => this.props.navigation.navigate('Display Samsung')}
              icon={<Icon name='smartphone' size={28} color='white' />}
            ></Button>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>  
          <Button
            title={' Extra'}
            onPress={() => {
              this.setModalVisible(true)
            }}
            containerStyle={{
              flex: 1,
              //borderBottomWidth: 2,
              borderTopWidth: 3,
              //borderLeftWidth: 2
            }}
            buttonStyle={{ backgroundColor: '#181818' }}
            icon={<Icon name='view-list' size={28} color='#F1F3F4' />}
          />
          {/* <Button
            title={' ORDER'}
            onPress={() => {
              this.setModalVisibleOrder(true)
            }}
            containerStyle={{
              flex: 1,
              //borderBottomWidth: 2,
              borderTopWidth: 3,
              //borderLeftWidth: 2
            }}
            buttonStyle={{ backgroundColor: '#181818' }}
            icon={<Icon name='view-list' size={28} color='#F1F3F4' />}
          /> */}
          <Button
            title={'Svuota Extra'}
            onPress={() => {
              global.extra = ''
              AsyncStorage.removeItem('ListaExtra').then(() =>
                alert('lista svuotata')
              )
            }}
            containerStyle={{
              flex: 0.8,
              //borderBottomWidth: 2,
              borderTopWidth: 3,
              borderRightWidth: 2
            }}
            buttonStyle={{ backgroundColor: 'red' }}
          />
          {/* <Button
            icon={<Icon name='delete-forever' size={28} color='white' />}
            onPress={() => {
              this._reset()
            }}
            containerStyle={{
              flex: 0.3,
              //borderBottomWidth: 2,
              borderTopWidth: 3,
              borderRightWidth: 2
            }}
            buttonStyle={{ backgroundColor: 'darkred' }}
          /> */}
          <ShareExample nomeLista={'Lista Extra'} />
        </View>
        <Input
          placeholder='   Inserisci Ricambi Extra'
          leftIcon={{ type: 'ionicons', name: 'add', color: 'red', size: 25 }}
          //containerStyle={{borderWidth:1, borderColor:'white'}}
          style={styles.input}
          //multiline={true}
          renderErrorMessage={false}
          ref={this.state.input} //Riferimento per poter ripulire l'input dopo l'invio con la funzione clear in this._save
          value={this.state.text}
          onChangeText={value => this.setState({ text: value })}
          onSubmitEditing={() => {
            this._save()
          }}
        />
        <View />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //borderBottomColor: 'red',
    //borderBottomWidth: 2,
    //alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#181818',
    
  },
  modelSection: {
    borderColor: 'red',
    //borderWidth: 2,
    //borderBottomColor: 'red',
    borderBottomWidth: 2,
    flex: 1,
    flexDirection: 'row'
    //justifyContent: 'space-evenly',
    //alignItems: 'center'
  },
  input: {
    flex: 1,
    //margin: 15,
    height: 40,
    //borderColor: '#7a42f4',
    borderColor: 'red',
    borderWidth: 1,
    color: 'white',
    borderRadius: 10
  },
  button: {
    backgroundColor: '#007AFF'
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
  fab: {
    position: 'absolute',
    margin: 20,
    right: 150,
    bottom: -10,
    backgroundColor: 'darkred'
  },
  fab2: {
    position: 'absolute',
    margin: 20,
    right: 143,
    bottom: 150,
    backgroundColor: '#007AFF'
  }
})
