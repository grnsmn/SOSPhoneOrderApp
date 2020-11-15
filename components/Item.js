import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'

global.store = [] //Array globale che conterrà nomi e quantità di elementi da mettere in lista

export default class Item extends Component {
  state = { id: 0, nomeItem: '', contatore: 0 }

  constructor (props) {
    super(props)
    this.state.nomeItem = this.props.NameItem
    this.state.id = this.props.id
  }
  upgrade () {
    this.setState({ contatore: this.state.contatore + 1 })
  }
  downgrade () {
    this.setState({ contatore: this.state.contatore - 1 })
  }
  inStore () {
    //Funzione che aggiunge in lista elementi
    global.store.push({
      id: this.state.id,
      name: this.state.nomeItem,
      n: this.state.contatore
    })
    //console.log(JSON.stringify(global.store));
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', flex: 1, fontSize: 15, marginLeft: 10 }}>
          {this.props.NameItem}
        </Text>
        <View style={{ flex: 0.3, borderWidth:1, borderColor:'white'}}>
          <Input
            style={{ borderWidth: 1, color: 'white' }}
            renderErrorMessage={false}
            label={'n°'}
            keyboardType='numeric'
            maxLength={1}
            value={this.state.contatore}
            onChangeText={value => this.setState({ contatore: value })}
            onSubmitEditing={() => this.inStore()}
          />
        </View>
      </View>
    )
  }
}
/**
 *  <Button
          containerStyle={{ color: 'red' }}
          onPress={() => {
            this.downgrade()
          }}
          title='-'
          disabled={this.state.contatore == 0 ? true : false}
          containerStyle={{ borderWidth: 2 }}
        />
        <Button
          color='green'
          onPress={() => {
            this.upgrade()
          }}
          title='+'
          disabled={this.state.contatore == this.props.nMax ? true : false}
          containerStyle={{ borderWidth: 2 }}
        />
        <Button
          title={'' + this.state.contatore}
          onPress={() => this.inStore()}
          buttonStyle={{ backgroundColor: 'black' }}
        />
 */
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
