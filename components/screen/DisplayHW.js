import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Button } from 'react-native-elements'
import ShareExample from '../Sharing'
import ItemLCD from '../ItemLCD'

global.list_Display_Huawei = ' '
global.store2_Huawei = []
const list = [
  { id: 0, nome: 'Huawei P8', nMax: 1 },
  { id: 1, nome: 'Huawei P8 Lite', nMax: 1 },
  { id: 2, nome: 'Huawei P9', nMax: 1 },
  { id: 3, nome: 'Huawei P9 Lite', nMax: 1 },
  { id: 4, nome: 'Huawei P10', nMax: 1 },
  { id: 5, nome: 'Huawei P10 Lite', nMax: 1 },
  { id: 6, nome: 'Huawei P20 Lite', nMax: 2 },
  { id: 7, nome: 'Huawei Mate 10 Lite', nMax: 2 },
  { id: 8, nome: 'Huawei Mate 20 Lite', nMax: 2 },
  { id: 9, nome: 'Huawei PSmart', nMax: 2 },
  { id: 10, nome: 'Huawei PSmart 2019', nMax: 2 }
]

export default class DisplayListHW extends Component {
  renderRow = ({ item }) => (
    <ItemLCD NameItem={item.nome} nMax={item.nMax} id={item.id} storeName = {global.store2_Huawei}/>
  )
  stampList () {
    const jsonList = JSON.stringify(global.store2_Huawei)
    const extractList = JSON.parse(jsonList, (key, value) => {
      return value
    })
    extractList.forEach(
      element =>
        (global.list_Display_Huawei +=
          element.n + ' ' + element.name + ' ' + element.colore + '\n')
    )
    console.log(global.list_Display_Huawei)
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList data={list} renderItem={this.renderRow} />
        <View style={{ flexDirection: 'row' }}>
          <Button
            title={'Lista'}
            onPress={() => alert(JSON.stringify(global.store2_Huawei))}
            containerStyle={styles.buttonContainer}
            buttonStyle={{ backgroundColor: 'black' }}
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
              global.store2_Huawei = [] 
              global.list_Display_Huawei = ' '
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
    flex: -0.5,
    backgroundColor: 'black'
    //padding: 5
    //  paddingTop: StatusBar.length
  },
  buttonContainer: {
    flex: 1,
    borderWidth: 2

    //    borderBottomWidth: 3,
    //  borderTopWidth: 1.5,
    //borderLeftWidth: 2
  }
})
