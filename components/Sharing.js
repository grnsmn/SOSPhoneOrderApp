import React, { Component } from 'react'
import { Share, View } from 'react-native'
import { Button } from 'react-native-elements'

class ShareExample extends Component {
  onShare = async () => {
    try {
      const data = new Date()
      const result = await Share.share({
        message:
          'Ordine del ' +
          data.getDate() +
          '/' +
          data.getMonth() +
          '/' +
          data.getFullYear() +
          '\n\n' +
          'Lista batterie:\n' +
          global.listBatt +
          '\nLista Display:\n' +
          global.listDisplay +
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
      <View style={{ flex: 1, borderWidth:2 }}>
        <Button
          onPress={this.onShare}
          title='Share'
          buttonStyle={{ backgroundColor: 'grey' }}
        />
      </View>
    )
  }
}

export default ShareExample
