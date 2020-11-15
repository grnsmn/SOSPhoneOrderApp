import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Button, Input } from 'react-native-elements'

global.extra = ''

export default class Home extends Component {
  state = { text: '', input: React.createRef() }
  _save () {
    global.extra += this.state.text + ' \n'
    console.log(global.extra)
    this.state.input.current.clear()
    alert('Inserito!')
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.modelSection}>
         <View style={{alignItems: 'center'}}>
         <Image
            source={require('./apple.png')}
            style={{ width: 30, height: 30 }}
          ></Image>
          <Text style={{ color: 'white', fontSize: 20 }}>iPhone</Text>
         </View>
          <Button
            title='Batterie'
            onPress={() => this.props.navigation.navigate('Batterie')}
          ></Button>
          <Button
            title='Display'
            onPress={() => this.props.navigation.navigate('Display')}
          ></Button>
        </View>

        <Button
          title={'Memory'}
          onPress={() => alert('Extra: ' + global.extra)}
          containerStyle={{
            borderBottomWidth: 3,
            borderTopWidth: 1.5,
            borderLeftWidth: 2
          }}
          buttonStyle={{ backgroundColor: 'black' }}
        />
        <Input
          placeholder='Input Extra'
          leftIcon={{ type: 'font-awesome', name: 'comment' }}
          style={styles.input}
          ref={this.state.input} //Riferimento per poter ripulire l'input dopo l'invio con la funzione clear in this._save
          value={this.state.text}
          onChangeText={value => this.setState({ text: value })}
          onSubmitEditing={() => this._save()}
        />
        <View />
      </View>
    )
  }
} /*
<View style={styles.container}>
          <View style={styles.modelSection}>
            <Image
              source={require('./huawei.png')}
              style={{ width: 30, height: 30 }}
            ></Image>
            <Text style={{ color: 'white', fontSize: 20 }}>HUAWEI</Text>
            <Button
              title='Batterie'
              onPress={() => this.props.navigation.navigate('Batterie')}
            ></Button>
            <Button
              title='Display'
              onPress={() => this.props.navigation.navigate('Display')}
            ></Button>
          </View>
        </View>*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //borderBottomColor: 'red',
    //borderBottomWidth: 2,
    //alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'black'
  },
  modelSection: {
    //borderColor: 'red',
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    color: 'white',
    borderRadius: 10
  }
})