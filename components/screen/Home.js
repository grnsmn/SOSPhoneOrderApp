import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { color } from 'react-native-reanimated'

global.extra = ''

export default class Home extends Component {
  state = { text: ""}
  _save(){
    global.extra+=this.state.text + ' \n'
    console.log(global.extra);
    alert("Inserito!");
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.modelSection}>
          <Text style={{ color: 'white', fontSize: 20 }}>IPHONE</Text>
          <Button
            title='Batterie'
            onPress={() => this.props.navigation.navigate('Batterie')}
          ></Button>
          <Button
            title='Display'
            onPress={() => this.props.navigation.navigate('Display')}
          ></Button>
        </View>

        <View style={styles.container}>
          <View style={styles.modelSection}>
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
        </View>
        <View />
        <Input
          placeholder='Input Extra'
          leftIcon={{ type: 'font-awesome', name: 'comment' }}
          style={styles.input}
          //value={this.state.text}
          onChangeText={(value)=>this.setState({text: value})}
          onSubmitEditing={()=>this._save()}
        />
      </View>
    )
  }
}

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
    color:'white'
  }
})
