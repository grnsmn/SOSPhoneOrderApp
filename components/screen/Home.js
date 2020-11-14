import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'


export default class Home extends Component {
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 2,
    //alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'black'
  },
  modelSection: {
    borderColor: 'red',
    borderWidth: 2,
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})
/*
<View style={{borderColor:'red', borderWidth:2, flex:1, justifyContent:'space-evenly',alignItems:'center'}}>
        <Text style = {{color:'white', fontSize:20}}>HUAWEI</Text>
        <Button
          title='Batterie'
          onPress={() => this.props.navigation.navigate('Batterie')}
        ></Button>
        <Button
          title='Display'
          onPress={() => this.props.navigation.navigate('Display')}
        ></Button>
      </View>*/
