import React, { Component } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { Button } from 'react-native-elements'
import ShareExample from '../Sharing'
import Item from '../Item'

global.listBatt = ' ' //Variabile globale per la scrittura dell'ordine finale

const list = [
  { id: 0, nome: 'IPHONE 5', nMax: 2 },
  { id: 1, nome: 'IPHONE 5S', nMax: 2 },
  { id: 2, nome: 'IPHONE 6', nMax: 4 },
  { id: 3, nome: 'IPHONE 6S', nMax: 4 },
  { id: 4, nome: 'IPHONE 7', nMax: 4 },
  { id: 5, nome: 'IPHONE 8', nMax: 2 },
  { id: 6, nome: 'IPHONE X', nMax: 2 },
  { id: 7, nome: 'IPHONE 6/6S PLUS', nMax: 2 },
  { id: 8, nome: 'IPHONE 7 PLUS', nMax: 2 },
  { id: 9, nome: 'IPHONE 8 PLUS', nMax: 2 }
]
export default class BattList extends Component {
  renderRow = ({ item }) => (
    <Item NameItem={item.nome} nMax={item.nMax} id={item.id} />
  )

  stampList () {
    const jsonList = JSON.stringify(global.store)
    const extractList = JSON.parse(jsonList, (key, value) => {
      return value
    })
    extractList.forEach(
      element => (global.listBatt += element.n + ' ' + element.name + '\n')
    )
    console.log(global.listBatt)
  }
  render () {
    return (
      <View style={styles.container}>
        <FlatList data={list} renderItem={this.renderRow} />
        <View style={{ flexDirection: 'column' }}>
          <ShareExample nomeLista={'Lista Batterie'} />
          <Button
            title={'STAMPA'}
            onPress={() => {
              this.stampList()
            }}
            containerStyle={{
              borderBottomWidth: 3,
              borderTopWidth: 1.5,
              borderLeftWidth: 2
            }}
            buttonStyle={{ backgroundColor: 'green' }}
          />
          <Button
            title={'CLEAR Memory'}
            onPress={() => {
              global.store = []
              global.listBatt = ' '
            }}
            containerStyle={{
              borderBottomWidth: 3,
              borderTopWidth: 1.5,
              borderLeftWidth: 2
            }}
            buttonStyle={{ backgroundColor: 'red' }}
          />
          <Button
            title={'Memory'}
            onPress={() => alert(JSON.stringify(global.store))}
            containerStyle={{
              borderBottomWidth: 3,
              borderTopWidth: 1.5,
              borderLeftWidth: 2
            }}
            buttonStyle={{ backgroundColor: 'black' }}
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
    backgroundColor: 'black',
    padding: 5
    //paddingTop: StatusBar.length
  }
})
