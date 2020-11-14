import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import Item from './Item'

global.store2 = []

class ItemLCD extends Item {
  state = { id: 0, nomeItem: '', contatore: 0, contatore2: 0 }
  constructor (props) {
    super(props)
    this.state.nomeItem = this.props.NameItem
    this.state.id = this.props.id
  }
  upgrade2 () {
    this.setState({ contatore2: this.state.contatore2 + 1 })
  }
  downgrade2 () {
    this.setState({ contatore2: this.state.contatore2 - 1 })
  }
  inStore2 (col, count) {
    //Funzione che aggiunge in lista elementi
    global.store2.push({
      id: this.state.id,
      name: this.state.nomeItem,
      colore: col,
      n: count
    })
    //console.log(JSON.stringify(global.store));
  }
  render () {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          margin: 1,
          borderWidth: 1,
          borderColor: 'white'
        }}
      >
        <Text
          style={{
            color: 'white',
            flex: 2,
            marginLeft: 10,
            fontSize: 15
          }}
        >
          {this.props.NameItem}
        </Text>

        <View
          style={{
            margin: 5,
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Button
              onPress={() => {
                this.downgrade()
              }}
              title='-'
              disabled={this.state.contatore == 0 ? true : false}
              containerStyle={{ borderRightWidth: 2 }}
            />
            <Button
              onPress={() => {
                this.upgrade()
              }}
              title='+'
              disabled={this.state.contatore == this.props.nMax ? true : false}
            />
            <Button
              title={'W ' + this.state.contatore}
              onPress={() => this.inStore2('Bianco', this.state.contatore)}
              containerStyle={{ borderRightWidth: 4 }}
              buttonStyle={{ backgroundColor: 'white' }}
              titleStyle={{ color: 'black' }}
            />
          </View>
        </View>
        <View
          style={{
            margin: 5,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            //borderWidth: 1,
            borderColor: 'white'
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Button
              onPress={() => {
                this.downgrade2()
              }}
              title='-'
              disabled={this.state.contatore2 == 0 ? true : false}
              containerStyle={{ borderRightWidth: 2 }}
            />
            <Button
              onPress={() => {
                this.upgrade2()
              }}
              title='+'
              disabled={this.state.contatore2 == this.props.nMax ? true : false}
            />
            <Button
              title={'BK ' + this.state.contatore2}
              onPress={() => this.inStore2('Nero', this.state.contatore2)}
              containerStyle={{ borderRightWidth: 4 }}
              buttonStyle={{ backgroundColor: 'black' }}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default ItemLCD
