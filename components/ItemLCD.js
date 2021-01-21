import React, { PureComponent } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Item from './Item'
import AsyncStorage from '@react-native-community/async-storage'

global.store_Lcd = new Map() //Array globale che conterrà nomi e quantità di LCD IPHONE da mettere in lista
global.resi_Lcd = new Map() //Per immagazzinamento lista resi

export default class ItemLCD extends PureComponent {
  //OGNI ELEMENTO IN QUESTA CLASSE TIENE CONTO DI UN CONTEGGIO A COLORE DEL DISPLAY (BIANCO E NERO)
  state = {
    id: '',
    nomeItem: '',
    colore: '',
    contatoreW: 0,
    contatoreBK: 0,
    resiW: 0,
    resiBK: 0
  }

  constructor (props) {
    super(props)
    this.state.nomeItem = this.props.NameItem
    this.state.id = this.props.id
  }
  componentDidMount () {
    //console.log('Mount'+ this.state.nomeItem)
    const id_W = this.state.id + 'W'
    const id_BK = this.state.id + 'Bk'
    AsyncStorage.getItem(this.state.id).then(result => {
      const parseElement = JSON.parse(result)
      if (parseElement != null) {
        if (parseElement.id != null) {
          const tmp = JSON.parse(result, (key, value) => {
            //funzione per estrarre per ogni chiave il relativo valore dell'oggetto memorizzato nella memoria async
            return value
          })
          this.setState({
            contatoreW: tmp.contatoreW,
            contatoreBK: tmp.contatoreBK,
            resiW: tmp.resiW,
            resiBK: tmp.resiBK
          })
          //Aggiornamento lista ordine
          if (this.state.contatoreW != 0) {
            global.store_Lcd.set(id_W, {
              name: this.state.nomeItem,
              col: 'BIANCO',
              n: this.state.contatoreW
            })
          } else if (this.state.contatoreW == 0) {
            global.store_Lcd.delete(id_W)
          }
          if (tmp.contatoreBK != 0) {
            global.store_Lcd.set(id_BK, {
              name: this.state.nomeItem,
              col: 'NERO',
              n: this.state.contatoreBK
            })
          } else if (tmp.contatoreBK == 0) {
            global.store_Lcd.delete(id_BK)
          }

          //Aggiornamento lista resi
          //RESI BIANCHI
          if (this.state.resiW == 0) global.resi_Lcd.delete(id_W)
          if (this.state.resiW != 0) {
            global.resi_Lcd.set(id_W, {
              name: this.state.nomeItem,
              col: 'BIANCO',
              n: this.state.resiW
            })
          }
          //RESI NERI
          if (this.state.resiBK == 0) global.resi_Lcd.delete(id_BK)
          if (this.state.resiBK != 0) {
            global.resi_Lcd.set(id_BK, {
              name: this.state.nomeItem,
              col: 'NERO',
              n: this.state.resiBK
            })
          }
        }
      } else {
      }
    })
  }
  componentDidUpdate () {
    AsyncStorage.mergeItem(this.state.id, JSON.stringify(this.state))
    const id_W = this.state.id + 'W'
    const id_BK = this.state.id + 'Bk'
    //console.log("attualmente inseriti:" +  this.state.resiW)
    //elimina gli elementi da map se il valore inserito è 0
    if (this.state.contatoreW == 0) global.store_Lcd.delete(id_W)
    if (this.state.contatoreBK == 0) global.store_Lcd.delete(id_BK)
    //aggiorna la quantità di elementi in contemporanea all'inserimento del valore desiderato
    if (this.state.contatoreW != 0) {
      global.store_Lcd.set(id_W, {
        name: this.state.nomeItem,
        col: 'BIANCO',
        n: this.state.contatoreW
      })
    }
    if (this.state.contatoreBK != 0) {
      global.store_Lcd.set(id_BK, {
        name: this.state.nomeItem,
        col: 'NERO',
        n: this.state.contatoreBK
      })
    }
    //Aggiornamento lista resi
    //RESI BIANCHI
    if (this.state.resiW == 0) global.resi_Lcd.delete(id_W)
    if (this.state.resiW != 0) {
      global.resi_Lcd.set(id_W, {
        name: this.state.nomeItem,
        col: 'BIANCO',
        n: this.state.resiW
      })
    }
    //RESI NERI
    if (this.state.resiBK == 0) global.resi_Lcd.delete(id_BK)
    if (this.state.resiBK != 0) {
      global.resi_Lcd.set(id_BK, {
        name: this.state.nomeItem,
        col: 'NERO',
        n: this.state.resiBK
      })
    }
  }

  inStore2 () {
    this.componentDidMount()
  }
  oneColor () {
    if (
      this.state.nomeItem.includes('IPHONE X') ||
      this.state.nomeItem.includes('IPHONE 11') ||
      this.state.nomeItem.includes('MATE 20 LITE')||
      this.state.nomeItem.includes('P20 LITE')||
      this.state.nomeItem.includes('P30 LITE')||
      this.state.nomeItem.includes('PSMART Z')||
      this.state.nomeItem.includes('PSMART 2019')
    ) {
      return true
    } else {
      return false
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <Text
          style={{
            color: 'white',
            flex: 1,
            marginLeft: 10,
            fontSize: 15
          }}
        >
          {this.props.NameItem}
        </Text>

        <View
          style={{
            flex: 1,
            margin: 2,
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <View style={{ flex: 0.7, borderWidth: 1, borderLeftColor: 'white' }}>
            <Input
              label={'WHITE'}
              labelStyle={{
                color: 'black',
                textAlign: 'center',
                fontSize: 12,
                backgroundColor: 'white'
              }}
              disabled={this.oneColor()}
              //renderErrorMessage={false}
              placeholder={String(this.state.contatoreW)}
              placeholderTextColor={'gold'}
              keyboardType='numeric'
              maxLength={1}
              onChangeText={value => {
                if (value <= this.props.nMax && value != '') {
                  this.setState({
                    contatoreW: parseInt(value),
                    colore: 'BIANCO'
                  })
                }
              }}
              onSubmitEditing={() => this.inStore2()}
              errorStyle={{ color: 'red', textAlign: 'center', fontSize: 10 }}
              errorMessage={'max ' + this.props.nMax}
            />
            <Input
              label={'Reso'}
              labelStyle={{
                color: 'black',
                textAlign: 'center',
                fontSize: 10,
                backgroundColor: 'lightgreen'
              }}
              disabled={this.oneColor()}
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
          <View
            style={{ flex: 0.7, borderWidth: 0.5, borderLeftColor: 'white' }}
          >
            <Input
              label={'BLACK'}
              labelStyle={{ color: 'white', textAlign: 'center', fontSize: 12 }}
              placeholder={this.state.contatoreBK.toString()}
              placeholderTextColor={'gold'}
              //style={{ borderWidth: 0, color: 'white' }}
              renderErrorMessage={false}
              keyboardType='numeric'
              maxLength={1}
              onChangeText={value => {
                if (value <= this.props.nMax && value != '') {
                  this.setState({
                    contatoreBK: parseInt(value),
                    colore: 'NERO'
                  })
                }
              }}
              onSubmitEditing={() => this.inStore2()}
              errorStyle={{ color: 'red', textAlign: 'center', fontSize: 10 }}
              errorMessage={'max ' + this.props.nMax}
            />
            <Input
              label={'Reso'}
              labelStyle={{
                color: 'black',
                textAlign: 'center',
                fontSize: 10,
                backgroundColor: 'lightgreen'
              }}
              placeholder={this.state.resiBK.toString()}
              placeholderTextColor={'lightgreen'}
              keyboardType='numeric'
              maxLength={1}
              renderErrorMessage={false}
              onChangeText={value => {
                if (value != '') {
                  this.setState({
                    resiBK: parseInt(value),
                    colore: 'NERO'
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
    borderColor: 'white',
    borderWidth: 1,
    margin: 1,
    alignItems: 'center'
  }
})
