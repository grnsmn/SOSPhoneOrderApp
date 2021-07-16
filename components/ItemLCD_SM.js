import React, { PureComponent } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Vibration,
} from 'react-native'
import { Input } from 'react-native-elements'
import { Checkbox } from 'react-native-paper'
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
    colore: '',
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
    //console.log('Mount'+ this.state.nomeItem)
    AsyncStorage.getItem(this.state.id).then(result => {
      const parseElement = JSON.parse(result)
      if (parseElement != null) {
        if (parseElement.id != null) {
          const tmp = JSON.parse(result, (key, value) => {
            //funzione per estrarre per ogni chiave il relativo valore dell'oggetto memorizzato nella memoria async
            return value
          })
          this.setState({
            contatore: tmp.contatore,
            resiW: tmp.resiW,
            colore: tmp.colore,
            quality: tmp.quality
          })
          //Aggiornamento lista ordine
          if (this.state.contatore != 0) {
            global.store_Lcd.set(this.state.id, {
              name: this.state.nomeItem,
              col: this.state.colore,
              n: this.state.contatore,
              quality: this.state.quality == 'checked' ? 'ORIG' : 'COMP'
            })
          } else if (this.state.contatore == 0) {
            global.store_Lcd.delete(this.state.id)
          }
          //RESI BIANCHI
          if (this.state.resiW == 0) global.resi_Lcd.delete(this.state.id)
          if (this.state.resiW != 0) {
            global.resi_Lcd.set(this.state.id, {
              name: this.state.nomeItem,
              n: this.state.resiW
            })
          }
        }
      } else {
      }
    })
  }
  componentDidUpdate () {
    //console.log("attualmente inseriti:" +  this.state.resiW)
    //elimina gli elementi da map se il valore inserito è 0
    if (this.state.contatore == 0) global.store_Lcd.delete(this.state.id)
    //aggiorna la quantità di elementi in contemporanea all'inserimento del valore desiderato
    if (this.state.contatore != 0) {
      global.store_Lcd.set(this.state.id, {
        name: this.state.nomeItem,
        col: this.state.colore,
        n: this.state.contatore,
        quality: this.state.quality,
        section: 'LCD'
      })
      AsyncStorage.mergeItem(this.state.id, JSON.stringify(global.store_Lcd.get(this.state.id)))
    }
    //Aggiornamento lista resi
    //RESI BIANCHI
    if (this.state.resiW == 0) global.resi_Lcd.delete(this.state.id)
    if (this.state.resiW != 0) {
      global.resi_Lcd.set(this.state.id, {
        name: this.state.nomeItem,
        n: this.state.resiW
      })
    }
  }
  inStore2 () {
    this.componentDidMount()
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
            </Text>
            
          </TouchableOpacity>
        </View>
        <View style={styles.container2}>
          <TouchableOpacity>
              {/* <Checkbox.Item
              label={this.state.quality == 'checked' ? 'ORIG' : 'COMP'}
              color='gold'
              labelStyle={{
                color: '#BABCBE',
                fontSize: 10,
                textAlign:'center'
              }}
              status={this.state.quality}
              // onPress={() => {
              //   if (this.state.quality == 'checked') {
              //     Vibration.vibrate(3)
              //     this.setState({ quality: 'indeterminate' })
              //   } else {
              //     Vibration.vibrate(3)
              //     this.setState({ quality: 'checked' })
              //   }
              // }}
            /> */}
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
                  <Text style={{ color: '#F1F3F4', backgroundColor: '#2196F3' }}>NERO</Text>
                </MenuOption>
                <MenuOption
                  onSelect={() => this.setState({ colore: 'BIANCO' })}
                >
                  <Text style={{ color: '#F1F3F4', backgroundColor: '#2196F3' }}>BIANCO</Text>
                </MenuOption>
                <MenuOption onSelect={() => this.setState({ colore: 'BLU' })}>
                  <Text style={{ color: '#F1F3F4', backgroundColor: '#2196F3' }}>BLU</Text>
                </MenuOption>
                <MenuOption onSelect={() => this.setState({ colore: 'GOLD' })}>
                  <Text style={{ color: '#F1F3F4', backgroundColor: '#2196F3' }}>GOLD</Text>
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
            flex: 1,
            margin: 2,
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <View style={{ flex: 0.8, borderWidth: 1, borderLeftColor: 'white' }}>
            <Input
              label={'To Order'}
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
              onSubmitEditing={() => this.inStore2()}
              errorStyle={{ color: 'red', textAlign: 'center', fontSize: 10 }}
              errorMessage={'max ' + this.props.nMax}
            />
          </View>
          <View
            style={{ flex: 0.7, borderWidth: 0.5, borderLeftColor: 'white' }}
          >
            <Input
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
              onSubmitEditing={() => this.inStore2()}
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
    flex: 0.8,
    flexDirection: 'column',
    alignItems: 'center'
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
      flex: 1
    }
  }
}
