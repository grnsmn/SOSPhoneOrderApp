import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Vibration } from 'react-native'
import { Input } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'

export default class ItemLCD_SM extends PureComponent {
  //OGNI ELEMENTO IN QUESTA CLASSE TIENE CONTO DI UN CONTEGGIO A COLORE DEL DISPLAY (BIANCO E NERO)
  state = {
    id: '',
    nomeItem: '',
    section: 'LCD',
    colore: '\t',
    contatore: 0,
    resiW: 0,
    quality: 'indeterminate'
  }

  constructor (props) {
    super(props)
    this.state.nomeItem = this.props.NameItem
    this.state.id = this.props.id
  }
  componentDidMount () {
    var storeLCD = global.store_Lcd
    
    //console.log('Mount'+ this.state.nomeItem)
    AsyncStorage.getItem(this.state.id).then(result => {
      const parseElement = JSON.parse(result)
      if (parseElement != null && parseElement.id != null) {
        const tmp = JSON.parse(result, (key, value) => {
          //funzione per estrarre per ogni chiave il relativo valore dell'oggetto memorizzato nella memoria async
          return value
        })
        console.log(tmp)
        //Aggiornamento lista ordine
        if (this.state.contatore == 0) {
          storeLCD.delete(parseElement.id)
        }else {
          storeLCD.set(parseElement.id, {
            id: parseElement.id,
            name: this.state.nomeItem,
            col: (this.state.colore==''?'\t':this.state.colore),
            n: this.state.contatore,
            quality: this.state.quality == 'checked' ? 'ORIG' : 'COMP'         
          })
        }
        //RESI BIANCHI
        if (this.state.resiW == 0) global.resi_Lcd.delete(this.state.id)
        if (this.state.resiW != 0) {
          global.resi_Lcd.set(this.state.id, {
            id: this.state.id,
            name: this.state.nomeItem,
            n: this.state.resiW
          })
        }
        this.setState({
          contatore: tmp.n,
          resiW: tmp.resiW,
          colore: (tmp.col==''?'\t':tmp.col),
          quality: tmp.quality
        })
      } else {
      }
    })
  }
  componentDidUpdate () {
    //elimina gli elementi da map se il valore inserito è 0
    if (this.state.contatore == 0) global.store_Lcd.delete(this.state.id)
    //aggiorna la quantità di elementi in contemporanea all'inserimento del valore desiderato
    else {
      AsyncStorage.mergeItem(
        this.state.id,
        JSON.stringify(this.state)
        )
      global.store_Lcd.set(this.state.id, {
        id: this.state.id,
        name: this.state.nomeItem,
        col: (this.state.colore==''?'\t':this.state.colore),
        n: this.state.contatore,
        quality: this.state.quality == 'checked' ? 'ORIG' : 'COMP',
        section: 'LCD'
      })
      }
      //Aggiornamento lista resi
      if (this.state.resiW == 0) global.resi_Lcd.delete(this.state.id)
      else {
        global.resi_Lcd.set(this.state.id, {
        id: this.state.id,
        name: this.state.nomeItem,
        n: this.state.resiW
      })
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.TouchablesItem}>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}
            onPress={() => {
              if (this.state.quality == 'checked') {
                Vibration.vibrate(3)
                this.setState({ quality: 'indeterminate' })
              } else {
                Vibration.vibrate(3)
                this.setState({ quality: 'checked' })
              }
            }}
          >
            <Text
              style={{
                color: '#F1F3F4',
                marginLeft: 10,
                fontSize: 16,
                fontWeight: 'bold'
              }}
            >
              {this.props.NameItem}
              <Text style={styles.codText}>{'\n' + this.props.id}</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container2}>
          <Text
            style={{
              color: 'grey',
              flex: 0.75,
              fontSize: 11,
              fontWeight: 'bold',
              textAlign: 'right'
            }}
          >
            {this.state.quality == 'checked' ? 'ORIG' : 'COMP'}
          </Text>
          <TouchableOpacity>
            <Menu>
              <Text
                style={{ color: 'white', fontSize: 11, textAlign: 'center' }}
              >
                COLORE
              </Text>
              <MenuTrigger
                customStyles={triggerStyles}
                text={String(
                  this.state.colore != '' ? this.state.colore : ' seleziona'
                )}
              />
              <MenuOptions>
                <MenuOption onSelect={() => this.setState({ colore: 'NERO' })}>
                  <Text
                    style={{ color: '#F1F3F4', backgroundColor: '#2196F3' }}
                  >
                    NERO
                  </Text>
                </MenuOption>
                <MenuOption
                  onSelect={() => this.setState({ colore: 'BIANCO' })}
                >
                  <Text
                    style={{ color: '#F1F3F4', backgroundColor: '#2196F3' }}
                  >
                    BIANCO
                  </Text>
                </MenuOption>
                <MenuOption onSelect={() => this.setState({ colore: 'BLU' })}>
                  <Text
                    style={{ color: '#F1F3F4', backgroundColor: '#2196F3' }}
                  >
                    BLU
                  </Text>
                </MenuOption>
                <MenuOption onSelect={() => this.setState({ colore: 'GOLD' })}>
                  <Text
                    style={{ color: '#F1F3F4', backgroundColor: '#2196F3' }}
                  >
                    GOLD
                  </Text>
                </MenuOption>
                {/* <MenuOption
                onSelect={() => alert(`Not called`)}
                disabled={true}
                text='Disabled'
              /> */}
              </MenuOptions>
            </Menu>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.8,
            margin: 2,
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <View style={{ flex: 0.8, borderWidth: 0.5, borderLeftColor: '#2196F3' }}>
            <Input
              style={{ borderWidth: 1, color: 'white', textAlign: 'center' }}
              label={'Order'}
              labelStyle={{
                color: 'gold',
                textAlign: 'center',
                fontSize: 11
                // backgroundColor: 'white'
              }}
              placeholder={String(this.state.contatore)}
              placeholderTextColor={'gold'}
              keyboardType='numeric'
              maxLength={1}
              onChangeText={value => {
                if (value <= this.props.nMax && value != '') {
                  this.setState({
                    contatore: parseInt(value),
                    colore: this.state.colore
                  })
                }
              }}
              //  onSubmitEditing={() => this.inStore2()}
              errorStyle={{ color: 'red', textAlign: 'center', fontSize: 10 }}
              errorMessage={'max ' + this.props.nMax}
            />
          </View>
          <View
            style={{ flex: 0.7, borderWidth: 0.5, borderLeftColor: 'white' }}
          >
            <Input
              style={{ borderWidth: 1, color: 'white', textAlign: 'center' }}
              label={'Reso'}
              labelStyle={{
                color: 'black',
                textAlign: 'center',
                fontSize: 10,
                backgroundColor: 'lightgreen'
              }}
              //disabled={this.oneColor()}
              placeholder={String(this.state.resiW)}
              placeholderTextColor={'lightgreen'}
              keyboardType='numeric'
              maxLength={1}
              renderErrorMessage={false}
              onChangeText={value => {
                if (value != '') {
                  this.setState({
                    resiW: parseInt(value),
                    colore: 'BIANCO'
                  })
                }
              }}
              //onSubmitEditing={() => this.inStore2()}
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
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 1,
    alignItems: 'center',
    backgroundColor: '#000'
  },
  TouchablesItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 1,
    alignItems: 'center'
  },
  container2: {
    flex: 0.7,
    flexDirection: 'column',
    alignItems: 'center'
  },
  codText: {
    color: '#2196F3',
    fontSize: 11,
    textAlign: 'center',
  }
})

const triggerStyles = {
  triggerText: {
    color: 'gold',
    textAlign: 'center'
  },
  // triggerOuterWrapper: {
  //   backgroundColor: 'orange',
  //   padding: 5,
  //   flex: 1,
  // },
  // triggerWrapper: {
  //   backgroundColor: 'blue',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   flex: 1,
  // },
  triggerTouchable: {
    underlayColor: 'darkblue',
    activeOpacity: 70,
    style: {
      flex: 0.5
    }
  }
}
