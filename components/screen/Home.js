import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ShareExample from '../Sharing'

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
          <View
            style={{
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flex: 1
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('./apple.png')}
                style={{ width: 40, height: 40 }}
              />
              <Text style={{ color: 'white', fontSize: 18 }}>iPhone</Text>
            </View>
            <Button
              title='Batterie'
              onPress={() => this.props.navigation.navigate('Batterie')}
              icon={<Icon name='battery-unknown' size={28} color='white' />}
              //iconRight
            ></Button>
            <Button
              title='Display'
              onPress={() => this.props.navigation.navigate('Display')}
              icon={<Icon name='smartphone' size={28} color='white' />}
            ></Button>
          </View>

          <View
            style={{
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flex: 1
            }}
          >
            <Image
              source={require('./huawei.png')}
              style={{ width: 65, height: 65 }}
            />
            <Button
              title='Batterie'
              onPress={() => this.props.navigation.navigate('BatterieHW')}
              icon={<Icon name='battery-unknown' size={28} color='white' />}
            ></Button>
            <Button
              title='Display'
              onPress={() => this.props.navigation.navigate('DisplayHW')}
              icon={<Icon name='smartphone' size={28} color='white' />}
            ></Button>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Button
            title={' Lista Extra'}
            onPress={() => alert('Extra: ' + global.extra)}
            containerStyle={{
              flex: 1,
              borderBottomWidth: 3,
              borderTopWidth: 1.5,
              borderLeftWidth: 2
            }} 
            buttonStyle={{ backgroundColor: 'black' }}
            icon={<Icon name='view-list' size={28} color='white' />}
          />
          <ShareExample nomeLista={'Lista Extra'} />
        </View>
        <Input
          placeholder='   Inserisci Ricambi Extra'
          leftIcon={{ type: 'ionicons', name: 'add', color: 'red', size: 25 }}
          //containerStyle={{borderWidth:1, borderColor:'white'}}
          style={styles.input}
          renderErrorMessage={false}
          ref={this.state.input} //Riferimento per poter ripulire l'input dopo l'invio con la funzione clear in this._save
          value={this.state.text}
          onChangeText={value => this.setState({ text: value })}
          onSubmitEditing={() => {
            this._save()
          }}
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
    borderColor: 'red',
    //borderWidth: 2,
    //borderBottomColor: 'red',
    borderBottomWidth: 2,
    flex: 1,
    flexDirection: 'row'
    //justifyContent: 'space-evenly',
    //alignItems: 'center'
  },
  input: {
    flex: 1,
    //margin: 15,
    height: 40,
    //borderColor: '#7a42f4',
    borderColor: 'red',
    borderWidth: 1,
    color: 'white',
    borderRadius: 10
  }
})
