import React, { Component } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { Button } from 'react-native-elements'
import ShareExample from '../Sharing'
import Item from '../Item'

global.list_Batt_Huawei = ' ' //Variabile globale per la scrittura dell'ordine finale

const list = [
  { id: 0, nome: 'Huawei P9', nMax: 5 },
  { id: 1, nome: 'Huawei Mate 10 lite', nMax: 2 },
 
]
export default class BattListHW extends Component {
  renderRow = ({ item }) => (
    <Item NameItem={item.nome} nMax={item.nMax} id={item.id} />
  )

  stampList () {
    const jsonList = JSON.stringify(global.store)
    const extractList = JSON.parse(jsonList, (key, value) => {
      return value
    })
    extractList.forEach(
      element => (global.list_Batt_Huawei += element.n + ' ' + element.name + '\n')
    )
    console.log(global.list_Batt_Huawei)
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
              global.list_Batt_Huawei = ' '
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
