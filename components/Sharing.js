import React, { Component } from 'react'
import { Share, View, AsyncStorage } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class ShareExample extends Component {
  state = { extra: '' }
  onShare = async () => {
    try {
      const data = new Date()

      /*    AsyncStorage.getItem('ListExtra').then((result, err) =>
        this.setState({ extra: result })
      )
      console.log(this.state.extra)
*/
      const result = await Share.share({
        message:
          'Ordine del ' +
          data.getDate() +
          '/' +
          data.getMonth() +
          '/' +
          data.getFullYear() +
          '\n\n' +
          //'Lista Batterie:\n' +
          global.listBatt +
          '\n' +
          //global.list_Batt_Huawei +
          //'Lista Display:\n' +
          global.listDisplay +
          '\n' +
        //  global.list_Display_Huawei +
          'Lista Extra:\n' +
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
