import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { View, StyleSheet, FlatList, SectionList } from 'react-native'
import { Button } from 'react-native-elements'
import ItemLCD from '../ItemLCD'

global.listDisplay = ''

const list = [
  { id: 'KIX', nome: 'IPHONE 5', nMax: 2 },
  { id: 'Z7P', nome: 'IPHONE 5S', nMax: 2 },
  { id: 'RFJ', nome: 'IPHONE 6', nMax: 2 },
  { id: 'H3V' , nome: 'IPHONE 6S', nMax: 2 },
  { id: 'ZK2', nome: 'IPHONE 7', nMax: 2 },
  { id: 'FP6', nome: 'IPHONE 8', nMax: 2 },
  { id: 'D89', nome: 'IPHONE 6 PLUS', nMax: 2 },
  { id: 'G5G', nome: 'IPHONE 6S PLUS', nMax: 2 },
  { id: 'WYR', nome: 'IPHONE 7 PLUS', nMax: 2 },
  { id: 'M3P', nome: 'IPHONE 8 PLUS', nMax: 2 },
  { id: '2TI', nome: 'IPHONE X', nMax: 4 },
  { id: '5QM', nome: 'IPHONE XS MAX', nMax: 1 },
  { id: 'JQ7', nome: 'IPHONE XR', nMax: 2 },
  { id: '2A4', nome: 'IPHONE 11', nMax: 2 }
]
const sectionList = [
  {
    title: 'To Order',
    data: list
  },
  // {
  //   title: 'Resi',
  //   data: list
  // }
]
export default class DisplayList extends Component {
  renderRow = ({ item }) => (
    <ItemLCD NameItem={item.nome} nMax={item.nMax} id={item.id} />
  )
  stampList () {
    global.listDisplay = ''
    global.store_Lcd_IP.forEach(
      element =>{
        if(element.name.includes('IPHONE X') || element.name.includes('IPHONE 11')){
          global.listDisplay += element.n +'x '+ ' LCD ' + element.name + ' ' + '\n'
        }else{
          global.listDisplay += element.n +'x '+ ' LCD ' + element.name + ' ' + element.col + '\n'
        }
      }
    )
    alert('Ordine Inserito!')
  }
  clearListDisplay () {
    global.store_Lcd_IP.clear()
    global.listDisplay = ''
    list.forEach(element => {
      //AZZERA TUTTI GLI ELEMENTI NELLO STORE CON PERSISTENZA LOCALE
      const item = {
        id: element.id,
        nameItem: element.nome,
        contatoreW: 0,
        contatoreBK: 0,
        col: ''
      }
      //AsyncStorage.multiRemove([element.id+'W', element.id+'Bk']).then(console.log("multirimozione eseguita"))
      AsyncStorage.mergeItem(element.id, JSON.stringify(item))
    })
    alert('Lista Svuotata')
  }
  render () {
    return (
      <View style={styles.container}>
        <SectionList sections={sectionList} renderItem={this.renderRow} />

        <View style={{ flexDirection: 'row' }}>
          <Button
            title={'Lista'}
            onPress={() =>
              alert(
              'Lista Display \n' + 
                JSON.stringify([...global.store_Lcd_IP.values()].sort()))
            }
            containerStyle={styles.buttonContainer}
            buttonStyle={{ backgroundColor: 'gray' }}
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
            onPress={() => {this.clearListDisplay()
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
    backgroundColor: 'black',
    padding: 5
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
