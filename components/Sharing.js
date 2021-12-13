import React, { Component } from 'react'
import { Share, View } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class ShareExample extends Component {
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
        // 'Ordine del ' +
        // tomorrow.getDate() +
        // '/' + 
        // parseInt(tomorrow.getMonth() + 1) +  //BISOGNA EFFETTUARE LA SOMMA PERCHE getMonth restituisce numeri da 0 a 11 in stringa così che corrisponda alla tomorrow italiana
        // '/' +
        // tomorrow.getFullYear() +
        '\n' +
        global.extra
      })
      // const result2 = await Share.share({
      //   message:
      //   // 'Ordine del ' +
      //   // tomorrow.getDate() +
      //   // '/' + 
      //   // parseInt(tomorrow.getMonth() + 1) +  //BISOGNA EFFETTUARE LA SOMMA PERCHE getMonth restituisce numeri da 0 a 11 in stringa così che corrisponda alla tomorrow italiana
      //   // '/' +
      //   // tomorrow.getFullYear() +
      //   '\n' +
      //   global.listBatt
      // })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
      // if (result2.action === Share.sharedAction) {
      //   if (result2.activityType) {
      //     // shared with activity type of result2.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result2.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      alert(error.message)
    }
  }

  render () {
    return (
      <View style={{ borderTopWidth: 2 }}>
        <Button
          onPress={this.onShare}
          icon={<Icon name='send' size={23} color='white' />}
          title=''
          buttonStyle={{ backgroundColor: 'grey' }}
        />
      </View>
    )
  }
}

export default ShareExample
