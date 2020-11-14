import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={{backgroundColor:'white', flexDirection:'row', justifyContent:'flex-start', alignItems:"flex-start"}}>
        <Text
          style={{
            flex:1,
            margin: 24,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'red',
          }}>
          SOSPHONE ORDER
        </Text>
      </View>
    );
  }
}
export default Header;
