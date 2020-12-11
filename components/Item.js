import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'

global.store_Batt_IP = new Map() //Array globale che conterrà nomi e quantità di BATTERIE IPHONE da mettere in lista

class Item extends Component {
  state = { id: '', nomeItem: '', contatore: 0 }

  constructor (props) {
    super(props)
    this.state.nomeItem = this.props.NameItem
    this.state.id = this.props.id
  }
  componentDidMount () {
    AsyncStorage.getItem(this.state.id).then(result => {
      //console.log(JSON.parse(result).contatore)
      if (JSON.parse(result).id != null) {
        const tmp = JSON.parse(result, (key, value) => {
          //funzione per estrarre per ogni chiave il relativo valore dell'oggetto memorizzato nella memoria async
          return value
        })
        this.setState({ contatore: tmp.contatore })
        if (this.state.contatore != 0) {
          // console.log([...global.store_Batt_IP.get(this.state.id)])
          global.store_Batt_IP.set(this.state.id, {
            name: this.state.nomeItem,
            n: this.state.contatore
          })
        } else {
          global.store_Batt_IP.delete(this.state.id)
        }
      }
    })
  }
  componentDidUpdate () {
    AsyncStorage.mergeItem(this.state.id, JSON.stringify(this.state))
    if (this.state.contatore == 0) global.store_Batt_IP.delete(this.state.id)
    if (this.state.contatore != 0) {
      global.store_Batt_IP.set(this.state.id, {
        name: this.state.nomeItem,
        n: this.state.contatore
      })
    }
  }

  inStore () {
    this.componentDidMount()
    //console.log('elemento inserito')
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', flex: 1, fontSize: 15, marginLeft: 10 }}>
          {this.props.NameItem}
        </Text>
        <View style={{ flex: 0.3, borderWidth: 1, borderColor: 'white' }}>
          <Input
            style={{ borderWidth: 1, color: 'white' }}
            //renderErrorMessage={false}
            //label={'n°'}
            placeholder={this.state.contatore.toString()}
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

export default Item
