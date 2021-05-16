import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

export default class ListOrder extends Component{
    render (){
        return (
              // <View style={styles.modalView}>
              <View>
                <Text style={styles.modalText}>
                  IN ORDINE {'\n\n'}
                  {[...global.extra] } 
                  {[...global.store_Batt.values()]    //Sezione batterie
                    .sort()
                    .map(function (element) {
                      return String(element.n + 'x '+ element.section + ' ' + element.name+ '\n')
                    })
                  }
                      {
                [...global.store_Lcd.values()].sort().map(function (element) {
                  if (element.name.includes('IPHONE')) {
                    if (
                      element.name.includes('IPHONE X') ||
                      element.name.includes('IPHONE XR') ||
                      element.name.includes('IPHONE 11')
                    ) {
                      return String(
                        element.n + 'x ' + ' LCD ' + element.name + ' '+ element.section + '\n'
                      )
                    } else {
                      return String(
                        element.n +
                          'x ' +
                          ' LCD ' +
                          element.name +
                          ' ' +
                          element.col +
                          '\n'
                      )
                    }
                  } else {
                    if (
                      element.name.includes('P20 LITE') ||
                      element.name.includes('P30 LITE') ||
                      element.name.includes('MATE 20 LITE') ||
                      element.name.includes('PSMART 2019') ||
                      element.name.includes('PSMART Z')
                    ) {
                      return String(
                        element.n +
                          'x ' +
                          ' LCD ' +
                          element.name +
                          ' ' +
                          element.frame +
                          '\n'
                      )
                    } else {
                      return String(
                        element.n +
                          'x ' +
                          ' LCD ' +
                          element.name +
                          ' ' +
                          element.col +
                          ' ' +
                          element.frame +
                          '\n'
                      )
                    }
                  }
                })}
                </Text>
              </View>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: '#252850',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
      },

})