import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Item from './Item'
import AsyncStorage from '@react-native-async-storage/async-storage'

global.store_Lcd_IP = new Map() //Array globale che conterrà nomi e quantità di LCD IPHONE da mettere in lista

class ItemLCD extends Item {
  //OGNI ELEMENTO IN QUESTA CLASSE TIENE CONTO DI UN CONTEGGIO A COLORE DEL DISPLAY (BIANCO E NERO)
  state = {
    id: '',
    //id_BK: '',
    //id_W: '',
    nomeItem: '',
    colore: '',
    contatoreW: 0,
    contatoreBK: 0
  }

  constructor (props) {
    super(props)
    this.state.nomeItem = this.props.NameItem
    this.state.id = this.props.id
    //this.state.id_BK = this.props.id + 'BK'
    //this.state.id_W = this.props.id + 'W'
  }
  componentDidMount () {
    //global.store_Lcd_IP.forEach( (element, key) => console.log())
    AsyncStorage.getItem(this.state.id).then(result => {
      try {
        const parseElement = JSON.parse(result)
        if (parseElement.id != null) {
          if (parseElement.colore == 'BIANCO') {
            const tmp = JSON.parse(result, (key, value) => {
              //funzione per estrarre per ogni chiave il relativo valore dell'oggetto memorizzato nella memoria async
              return value
            })
            const id_W = tmp.id + 'W'
            this.setState({ contatoreW: tmp.contatoreW })
            if (this.state.contatoreW != 0) {
              global.store_Lcd_IP.set(id_W, {
                name: this.state.nomeItem,
                col: tmp.colore,
                n: this.state.contatoreW
              })
            } else {
              global.store_Lcd_IP.delete(this.state.id_W)
            }
          } else if (parseElement.colore == 'NERO') {
            const tmp = JSON.parse(result, (key, value) => {
              //funzione per estrarre per ogni chiave il relativo valore dell'oggetto memorizzato nella memoria async
              return value
            })
            const id_BK = tmp.id + 'Bk'
            this.setState({ contatoreBK: tmp.contatoreBK })
            if (this.state.contatoreBK != 0) {
              global.store_Lcd_IP.set(id_BK, {
                name: this.state.nomeItem,
                col: tmp.colore,
                n: this.state.contatoreBK
              })
            } else {
              global.store_Lcd_IP.delete(this.state.id_BK)
            }
          }
        }
      } catch {}
    })
  }
  componentDidUpdate () {
    AsyncStorage.mergeItem(this.state.id, JSON.stringify(this.state))
    this.componentDidMount()
  }

  inStore2 () {
    //Funzione che aggiunge in lista gli elementi univocamente
    AsyncStorage.mergeItem(this.state.id, JSON.stringify(this.state))
    this.componentDidMount()
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
          <View style={{ flex: 0.8, borderWidth: 1, borderColor: 'white' }}>
            <Input
              label={'White'}
              style={{ borderWidth: 1, color: 'white' }}
              //renderErrorMessage={false}
              placeholder={this.state.contatoreW.toString()}
              placeholderTextColor={'white'}
              keyboardType='numeric'
              maxLength={1}
              inputContainerStyle={{ color: 'red' }}
              onChangeText={value => {
                if (value <= this.props.nMax && value!= '') {
                  this.setState({
                    contatoreW: parseInt(value),
                    colore: 'BIANCO'
                  })
                }
              }}
              //onSubmitEditing={() => this.inStore2()}
              errorStyle={{ color: 'red', textAlign: 'center', fontSize: 10 }}
              errorMessage={'max ' + this.props.nMax}
            />
          </View>
          <View style={{ flex: 0.8, borderWidth: 1, borderColor: 'white' }}>
            <Input
              label={'Black'}
              placeholder={this.state.contatoreBK.toString()}
              style={{ borderWidth: 1, color: 'white' }}
              renderErrorMessage={false}
              keyboardType='numeric'
              maxLength={1}
              placeholderTextColor={'white'}
              onChangeText={value => {
                if (value <= this.props.nMax && value!= '') {
                  this.setState({
                    contatoreBK: parseInt(value),
                    colore: 'NERO'
                  })
                } 
              }}
              //onSubmitEditing={() => this.inStore2()}
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
    borderWidth: 1,
    margin: 1,
    alignItems: 'center'
  }
})
export default ItemLCD
