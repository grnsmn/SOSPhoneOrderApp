import React, { Component } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { Button } from 'react-native-elements'
import Item from '../Item'
import AsyncStorage from '@react-native-async-storage/async-storage'

global.listBatt = '' //Variabile globale per la scrittura dell'ordine finale

const list = [
  { id: 'S0Z', nome: 'IPHONE 5', nMax: 2 },
  { id: 'v8E', nome: 'IPHONE 5S', nMax: 2 },
  { id: '3EV', nome: 'IPHONE 6', nMax: 4 },
  { id: '34K', nome: 'IPHONE 6S', nMax: 4 },
  { id: '5Q6', nome: 'IPHONE 7', nMax: 4 },
  { id: 'NQH', nome: 'IPHONE 8', nMax: 2 },
  { id: 'XVW', nome: 'IPHONE X', nMax: 2 },
  { id: 'H9K', nome: 'IPHONE 6/6S PLUS', nMax: 2 },
  { id: 'PNB', nome: 'IPHONE 7 PLUS', nMax: 2 },
  { id: 'IK8', nome: 'IPHONE 8 PLUS', nMax: 2 }
]
export default class BattList extends Component {
  renderRow = ({ item }) => (
    <Item NameItem={item.nome} nMax={item.nMax} id={item.id} />
  )

  stampList () {
    global.listBatt = '' //SVUOTA LA LISTA BATTERIA PRIMA DI UN NUOVO CONCATENAMENTO DI AGGIORNAMENTO DELLA LISTA
    global.store_Batt_IP.forEach(element => {
      global.listBatt += 'x' + element.n + ' BATT ' + element.name + '\n'
    })
    alert('Ordine Inserito!')
  }

 clearListBatt () {
    global.store_Batt_IP.clear()
    global.listBatt = ''
    list.forEach(element => {
      //AZZERA TUTTI GLI ELEMENTI NELLO STORE CON PERSISTENZA LOCALE
      const item = {
        id: element.id,
        nomeItem: element.nome,
        contatore: 0
      }
      AsyncStorage.mergeItem(element.id, JSON.stringify(item))
    })
    alert('Lista Svuotata')
  }
  render () {
    return (
      <View style={styles.container}>
        <FlatList data={list} renderItem={this.renderRow} />

        <View style={{ flexDirection: 'row' }}>
          <Button
            title={'Lista'}
            onPress={() =>
              alert(
                'Lista Batterie \n' +
                  JSON.stringify([...global.store_Batt_IP.values()].sort())
              )
            }
            containerStyle={styles.buttonContainer}
            buttonStyle={{ backgroundColor: 'grey' }}
          />
          <Button
            title={'Stampa'}
            onPress={() => {
              this.stampList()
            }}
            containerStyle={styles.buttonContainer}
            buttonStyle={{ backgroundColor: 'green' }}
          />
          <Button
            title={'Svuota Lista'}
            onPress={() => {
              this.clearListBatt()
            }}
            containerStyle={styles.buttonContainer}
            buttonStyle={{ backgroundColor: 'red' }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'row',
    backgroundColor: 'black',
    padding: 5
    //paddingTop: StatusBar.length
  },
  buttonContainer: {
    flex: 1,
    borderWidth: 2

    //    borderBottomWidth: 3,
    //  borderTopWidth: 1.5,
    //borderLeftWidth: 2
  }
})
