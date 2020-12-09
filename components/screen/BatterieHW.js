import React, { Component } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { Button } from 'react-native-elements'
import ShareExample from '../Sharing'
import Item from '../Item'

global.list_Batt_Huawei = ' ' //Variabile globale per la scrittura dell'ordine finale
global.store_Huawei = []
const list = [
  { id: 0, nome: 'Huawei P9', nMax: 5 },
  { id: 1, nome: 'Huawei Mate 10 lite', nMax: 2 },
 
]
export default class BattListHW extends Component {
  renderRow = ({ item }) => (
    <Item NameItem={item.nome} nMax={item.nMax} id={item.id} storeName = {global.store_Huawei}/>
  )

  stampList () {
    const jsonList = JSON.stringify(global.store_Huawei)
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
        <View style={{ flexDirection: 'row' }}>
        <Button
            title={'Lista'}
            onPress={() => alert(JSON.stringify(global.store_Huawei))}
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
              global.store_Huawei = []
              global.list_Batt_Huawei = ' '
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
    borderWidth:2,
  
  //    borderBottomWidth: 3,
  //  borderTopWidth: 1.5,
    //borderLeftWidth: 2
  }
  })
  