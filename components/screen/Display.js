import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Button } from 'react-native-elements'
import ShareExample from '../Sharing'
import ItemLCD from '../ItemLCD'
global.listDisplay = ' ';

const list = [
  { id: 0, nome: 'IPHONE 5', nMax: 2 },
  { id: 1, nome: 'IPHONE 5S', nMax: 2 },
  { id: 2, nome: 'IPHONE 6', nMax: 4 },
  { id: 3, nome: 'IPHONE 6S', nMax: 4 },
  { id: 4, nome: 'IPHONE 7', nMax: 4 },
  { id: 5, nome: 'IPHONE 8', nMax: 2 },
  { id: 6, nome: 'IPHONE 6 PLUS', nMax: 2 },
  { id: 7, nome: 'IPHONE 6S PLUS', nMax: 2 },
  { id: 8, nome: 'IPHONE 7 PLUS', nMax: 2 },
  { id: 9, nome: 'IPHONE 8 PLUS', nMax: 2 },
  { id: 10, nome: 'IPHONE X', nMax: 4 },
  { id: 11, nome: 'IPHONE XS MAX', nMax: 1 },
  { id: 12, nome: 'IPHONE XR', nMax: 2 },
  { id: 13, nome: 'IPHONE 11', nMax: 1 }
]

export default class DisplayList extends Component {
  renderRow = ({ item }) => (
    <ItemLCD NameItem={item.nome} nMax={item.nMax} id={item.id} />
  )
  stampList () {
    const jsonList = JSON.stringify(global.store2)
    const extractList = JSON.parse(jsonList, (key, value) => {
      return value
    })
    extractList.forEach(
      element =>
        (global.listDisplay +=
          element.n + ' ' + element.name + ' ' + element.colore + '\n')
    )
    console.log(global.listDisplay)
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList data={list} renderItem={this.renderRow} />
        
        <View style={{ flexDirection: 'row' }}>
          <Button
            title={'Lista'}
            onPress={() => alert(JSON.stringify(global.store2))}
            containerStyle={styles.buttonContainer}
            buttonStyle={{ backgroundColor: 'black' }}
          />
          <Button
            title={'STAMPA'}
            onPress={() => {
              this.stampList()
            }}
            containerStyle={styles.buttonContainer}
            buttonStyle={{ backgroundColor: 'green' }}
          />
          <Button
            title={'Svuota Lista'}
            onPress={() => {
              global.store2 = []
              global.listDisplay = ' '
              alert('Lista Svuotata')
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
    borderWidth:2,

//    borderBottomWidth: 3,
  //  borderTopWidth: 1.5,
    //borderLeftWidth: 2
  }
})
