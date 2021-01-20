import React, { Component } from 'react'
import { Share, View } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class ShareExample extends Component {
  state = { extra: '' }
  onShare = async () => {
    try {
      const data = new Date()
      
      const result = await Share.share({
        
        message:
        'Ordine del ' +
        data.getDate() +
        '/' + 
        parseInt(data.getMonth() + 1) +  //BISOGNA EFFETTUARE LA SOMMA PERCHE getMonth restituisce numeri da 0 a 11 in stringa così che corrisponda alla data italiana
        '/' +
        data.getFullYear() +
        '\n\n' +
        //'Lista Batterie:\n' +
        global.listBatt +
        '\n' +
        global.list_Batt_Huawei +
        //'Lista Display:\n' +
        global.listDisplay +
        '\n' +
         global.list_Display_Huawei +
        '\nLista Extra:\n' +
        global.extra +
        '\n\nResi:\n' +
        global.listResiBatt +
        global.listResiDisplay

      })
      console.log(message)
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
