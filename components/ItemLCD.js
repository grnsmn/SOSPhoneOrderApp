import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Vibration } from 'react-native'
import { Input } from 'react-native-elements'
import { Checkbox } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'

global.store_Lcd = new Map() //Array globale che conterrà nomi e quantità di LCD IPHONE da mettere in lista
global.resi_Lcd = new Map() //Per immagazzinamento lista resi

export default class ItemLCD extends PureComponent {
  //OGNI ELEMENTO IN QUESTA CLASSE TIENE CONTO DI UN CONTEGGIO A COLORE DEL DISPLAY (BIANCO E NERO)
  state = {
    id: '',
    nomeItem: '',
    section: 'LCD',
    colore: '',
    contatoreW: 0,
    contatoreBK: 0,
    resiW: 0,
    resiBK: 0,
    noFrame: 'indeterminate'
  }
  constructor (props) {
    super(props)
    this.state.nomeItem = this.props.NameItem
    this.state.id = this.props.id
  }
  componentDidMount () {
    var storeLCD = global.store_Lcd;
    const id_W = this.state.id + 'W'
    const id_BK = this.state.id + 'Bk'
    AsyncStorage.getItem(this.state.id).then(result => {
      const parseElement = JSON.parse(result)
      if (parseElement != null && parseElement.id != null) {
        const tmp = JSON.parse(result, (key, value) => {
          //funzione per estrarre per ogni chiave il relativo valore dell'oggetto memorizzato nella memoria async
          return value
        })
        //Aggiornamento lista ordine
        if (this.state.contatoreW == 0) {
          storeLCD.delete(id_W)
        } else {
          storeLCD.set(id_W, {
            id: id_W,
            name: this.state.nomeItem,
            col: 'BIANCO',
            n: this.state.contatoreW,
            frame: this.state.noFrame == 'checked' ? '+ FRAME' : 'NO FRAME'
          })
        }
        if (tmp.contatoreBK == 0) {
          storeLCD.delete(id_BK)
        } else {
          storeLCD.set(id_BK, {
            id: id_BK,
            name: this.state.nomeItem,
            col: 'NERO',
            n: this.state.contatoreBK,
            frame: this.state.noFrame == 'checked' ? '+ FRAME' : ' NO FRAME'
          })
        }

        //Aggiornamento lista resi
        //RESI BIANCHI
        if (this.state.resiW == 0) global.resi_Lcd.delete(id_W)
        else {
          global.resi_Lcd.set(id_W, {
            name: this.state.nomeItem,
            col: 'BIANCO',
            n: this.state.resiW
          })
        }
        //RESI NERI
        if (this.state.resiBK == 0) global.resi_Lcd.delete(id_BK)
        else {
          global.resi_Lcd.set(id_BK, {
            name: this.state.nomeItem,
            col: 'NERO',
            n: this.state.resiBK
          })
        }
        this.setState({
          contatoreW: tmp.contatoreW,
          contatoreBK: tmp.contatoreBK,
          resiW: tmp.resiW,
          resiBK: tmp.resiBK,
          noFrame: tmp.frame
        })
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
    //aggiorna la quantità di elementi in contemporanea all'inserimento del valore desiderato
    else {
      global.store_Lcd.set(id_W, {
        id: id_W,
        name: this.state.nomeItem,
        col: 'BIANCO',
        n: this.state.contatoreW,
        section: 'LCD',
        frame: this.state.noFrame == 'checked' ? '+ FRAME' : 'NO FRAME'
      })
    }
    if (this.state.contatoreBK == 0) global.store_Lcd.delete(id_BK)
    else {
      global.store_Lcd.set(id_BK, {
        id: id_BK,
        name: this.state.nomeItem,
        col: 'NERO',
        n: this.state.contatoreBK,
        section: 'LCD',
        frame: this.state.noFrame == 'checked' ? '+ FRAME' : 'NO FRAME'
      })
    }
    //Aggiornamento lista resi
    //RESI BIANCHI
    if (this.state.resiW == 0) global.resi_Lcd.delete(id_W)
    else {
      global.resi_Lcd.set(id_W, {
        name: this.state.nomeItem,
        col: 'BIANCO',
        n: this.state.resiW
      })
    }
    //RESI NERI
    if (this.state.resiBK == 0) global.resi_Lcd.delete(id_BK)
    else {
      global.resi_Lcd.set(id_BK, {
        name: this.state.nomeItem,
        col: 'NERO',
        n: this.state.resiBK
      })
    }
  }
  oneColor () {
    if (
      this.state.nomeItem.includes('IPHONE X') ||
      this.state.nomeItem.includes('IPHONE 11') ||
      this.state.nomeItem.includes('MATE 20 LITE') ||
      this.state.nomeItem.includes('P20 LITE') ||
      this.state.nomeItem.includes('P30 LITE') ||
      this.state.nomeItem.includes('P40 LITE') ||
      this.state.nomeItem.includes('PSMART Z') ||
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
        <View style={styles.TouchablesItem}>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}
            onPress={() => {
              if (this.state.noFrame == 'checked') {
                Vibration.vibrate(3)
                this.setState({ noFrame: 'indeterminate' })
              } else {
                Vibration.vibrate(3)
                this.setState({ noFrame: 'checked' })
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
          <Checkbox.Item
            label={this.state.noFrame == 'checked' ? '+ FRAME' : 'NO FRAME'}
            color='gold'
            labelStyle={{
              color: '#BABCBE',
              fontSize: 10
            }}
            status={this.state.noFrame}
            onPress={() => {
              if (this.state.noFrame == 'checked') {
                Vibration.vibrate(3)
                this.setState({ noFrame: 'indeterminate' })
              } else {
                Vibration.vibrate(3)
                this.setState({ noFrame: 'checked' })
              }
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            margin: 2,
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          {(this.props.NameItem.includes('IPHONE X') ||
            this.props.NameItem.includes('IPHONE XR') ||
            this.props.NameItem.includes('IPHONE 11') ||
            this.props.NameItem.includes('P30 LITE') ||
            this.props.NameItem.includes('P40 LITE') ||
            this.props.NameItem.includes('MATE 20 LITE') ||
            this.props.NameItem.includes('PSMART 2019') ||
            this.props.NameItem.includes('PSMART Z') ||
            this.props.NameItem.includes('P20 LITE')) == false ? (
            <View
              style={{
                flex: 0.5,
                borderWidth: 0.5,
                borderLeftColor: '#2196F3'
              }}
            >
              <Input
                style={{ borderWidth: 1, color: 'white', textAlign: 'center' }}
                label={'WHITE'}
                labelStyle={{
                  color: 'black',
                  textAlign: 'center',
                  fontSize: 12,
                  backgroundColor: '#F1F3F4'
                }}
                disabled={this.oneColor()}
                //renderErrorMessage={false}
                placeholder={
                  String(this.state.contatoreW) == '0'
                    ? '-'
                    : String(this.state.contatoreW)
                }
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
                //onSubmitEditing={() =>  this.componentDidMount()}
                errorStyle={{ color: 'red', textAlign: 'center', fontSize: 10 }}
                errorMessage={'max ' + this.props.nMax}
              />
              <Input
                style={{ borderWidth: 1, color: 'white', textAlign: 'center' }}
                label={'Reso'}
                labelStyle={{
                  color: 'black',
                  textAlign: 'center',
                  fontSize: 10,
                  backgroundColor: 'lightgreen'
                }}
                disabled={this.oneColor()}
                placeholder={
                  String(this.state.resiW) == '0'
                    ? '-'
                    : String(this.state.resiW)
                }
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
                //onSubmitEditing={() =>  this.componentDidMount()}
              />
            </View>
          ) : (
            <View />
          )}
          <View
            style={{ flex: 0.5, borderWidth: 0.5, borderLeftColor: '#2196F3' }}
          >
            <Input
              style={{ borderWidth: 1, color: 'white', textAlign: 'center' }}
              label={'BLACK'}
              labelStyle={{
                color: '#F1F3F4',
                textAlign: 'center',
                fontSize: 12
              }}
              placeholder={
                String(this.state.contatoreBK) == '0'
                  ? '-'
                  : String(this.state.contatoreBK)
              }
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
              //onSubmitEditing={() =>  this.componentDidMount()}

              errorStyle={{ color: 'red', textAlign: 'center', fontSize: 10 }}
              errorMessage={'max ' + this.props.nMax}
            />
            <Input
              style={{ borderWidth: 1, color: 'white', textAlign: 'center' }}
              label={'Reso'}
              labelStyle={{
                color: 'black',
                textAlign: 'center',
                fontSize: 10,
                backgroundColor: 'lightgreen'
              }}
              placeholder={
                String(this.state.resiBK) == '0'
                  ? '-'
                  : String(this.state.resiBK)
              }
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
              //onSubmitEditing={() =>  this.componentDidMount()}
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
    flexDirection: 'row',
    alignItems: 'center'
  }
})
