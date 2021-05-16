import React, { Component } from 'react'
import { Share, View } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class ShareExample extends Component {
  state = { extra: '' }
  onShare = async () => {
    try {
      const data = new Date()
      const tomorrow = new Date(data)
      tomorrow.setDate(tomorrow.getDate() + 1)
      if(tomorrow.getDay()==0) {
        tomorrow.setDate(tomorrow.getDate() + 1)
      }

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
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message)
    }
  }

  render () {
    return (
      <View style={{ borderTopWidth: 3 }}>
        <Button
          onPress={this.onShare}
          icon={<Icon name='send' size={20} color='white' />}
          iconRight
          title='Invia '
          buttonStyle={{ backgroundColor: 'grey' }}
        />
      </View>
    )
  }
}

export default ShareExample
