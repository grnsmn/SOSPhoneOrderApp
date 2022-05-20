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
    noFrame: 'indeterminate',
    Fab: 'indeterminate'
  }

  constructor (props) {
    super(props)
    this.state.nomeItem = this.props.NameItem
    this.state.id = this.props.id
  }
  componentDidMount () {
    var storeLCD = global.store_Lcd
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
            frame: this.state.noFrame == 'checked' ? '+ FRAME' : 'NO FRAME',
            Fab: this.state.Fab == 'checked' ? 'FAB' : ''
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
            frame: this.state.noFrame == 'checked' ? '+ FRAME' : ' NO FRAME',
            Fab: this.state.Fab == 'checked' ? 'FAB' : ''
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
          noFrame: tmp.frame,
          Fab: tmp.Fab
        })
      } else {
      }
    })
  }
  componentDidUpdate () {
    var storeLCD = global.store_Lcd

    AsyncStorage.mergeItem(this.state.id, JSON.stringify(this.state))
    const id_W = this.state.id + 'W'
    const id_BK = this.state.id + 'Bk'
    //console.log("attualmente inseriti:" +  this.state.resiW)
    //elimina gli elementi da map se il valore inserito è 0
    if (this.state.contatoreW == 0) storeLCD.delete(id_W)
    //aggiorna la quantità di elementi in contemporanea all'inserimento del valore desiderato
    else {
      storeLCD.set(id_W, {
        id: id_W,
        name: this.state.nomeItem,
        col: 'BIANCO',
        n: this.state.contatoreW,
        section: 'LCD',
        frame: this.state.noFrame == 'checked' ? '+ FRAME' : 'NO FRAME',
        Fab: this.state.Fab == 'checked' ? 'FAB' : ''
      })
    }
    if (this.state.contatoreBK == 0) storeLCD.delete(id_BK)
    else {
      storeLCD.set(id_BK, {
        id: id_BK,
        name: this.state.nomeItem,
        col: 'NERO',
        n: this.state.contatoreBK,
        section: 'LCD',
        frame: this.state.noFrame == 'checked' ? '+ FRAME' : 'NO FRAME',
        Fab: this.state.Fab == 'checked' ? 'FAB' : ''
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
  chackedFab () {
    if (this.state.Fab == 'checked') {
      Vibration.vibrate(3)
      this.setState({ Fab: 'indeterminate' })
    } else {
      Vibration.vibrate(3)
      this.setState({ Fab: 'checked' })
    }
  }
  chackedFrame () {
    if (this.state.noFrame == 'checked') {
      Vibration.vibrate(3)
      this.setState({ noFrame: 'indeterminate' })
    } else {
      Vibration.vibrate(3)
      this.setState({ noFrame: 'checked' })
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.TouchablesItem}>
          <TouchableOpacity
            style={styles.viewItem}
            onPress={() => this.chackedFab()}
          >
            <Text style={styles.textItem}>{this.props.NameItem}</Text>
          </TouchableOpacity>
        </View>
        {this.props.NameItem.includes('IPHONE') == false ? (
          <View style={styles.container2}>
            <Checkbox.Item
              label={this.state.noFrame == 'checked' ? '+ FRAME' : 'NO FRAME'}
              color='gold'
              labelStyle={styles.checkLabelStyle}
              status={this.state.noFrame}
              onPress={() => this.chackedFrame()}
            />
            <Checkbox.Item
              label={this.state.Fab == 'checked' ? 'FAB' : 'FAB'}
              color='blue'
              labelStyle={styles.checkLabelStyle}
              status={this.state.Fab}
              onPress={() => this.chackedFab()}
            />
          </View>
        ) : (
          <View style={styles.container2} />
        )}

        <View style={styles.InputsView}>
          {(this.props.NameItem.includes('IPHONE X') ||
            this.props.NameItem.includes('IPHONE XR') ||
            this.props.NameItem.includes('IPHONE 11') ||
            this.props.NameItem.includes('P30 LITE') ||
            this.props.NameItem.includes('P40 LITE') ||
            this.props.NameItem.includes('MATE 20 LITE') ||
            this.props.NameItem.includes('PSMART 2019') ||
            this.props.NameItem.includes('PSMART Z') ||
            this.props.NameItem.includes('P20 LITE')) == false ? (
            <View style={styles.SingleInputView}>
              <Input
                style={styles.InputStyle}
                label={'WHITE'}
                labelStyle={styles.InputWhite}
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
                errorStyle={{
                  color: 'red',
                  textAlign: 'center',
                  fontSize: 10
                }}
                errorMessage={'max ' + this.props.nMax}
              />
              <Input
                style={styles.InputStyle}
                label={'Reso'}
                labelStyle={styles.InputReso}
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
              />
            </View>
          ) : (
            <View />
          )}
          <View style={styles.SingleInputView}>
            <Input
              style={styles.InputStyle}
              label={'BLACK'}
              labelStyle={styles.InputBlack}
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
              errorStyle={{ color: 'red', textAlign: 'center', fontSize: 10 }}
              errorMessage={'max ' + this.props.nMax}
            />
            <Input
              style={styles.InputStyle}
              label={'Reso'}
              labelStyle={styles.InputReso}
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  viewItem: { flex: 1, alignItems: 'center', flexDirection: 'row' },
  textItem: {
    color: '#F1F3F4',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  checkLabelStyle: {
    color: '#BABCBE',
    fontSize: 10
  },
  InputsView: {
    flex: 1,
    margin: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  SingleInputView: {
    flex: 0.5,
    borderWidth: 0.5,
    borderLeftColor: '#2196F3'
  },
  InputStyle: { borderWidth: 1, color: 'white', textAlign: 'center' },
  InputWhite: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    backgroundColor: '#F1F3F4'
  },
  InputBlack: {
    color: '#F1F3F4',
    textAlign: 'center',
    fontSize: 12
  },
  InputReso: {
    color: 'black',
    textAlign: 'center',
    fontSize: 10,
    backgroundColor: 'lightgreen'
  }
})
