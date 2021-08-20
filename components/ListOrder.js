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
                  <Text style={{color:'#007AFF'}}>{'\n\t'}BATTERIE{'\n'}</Text> 
                  {[...global.store_Batt.values()]    //Sezione batterie
                    .sort()
                    .map(function (element) {
                      return String(element.n + 'x '+ ' ' + element.name+ '\n')
                    })
                  }
                  <Text style={{color:'#007AFF'}}> {'\n\t'}DISPLAY{'\n'}</Text> 
                      {
                [...global.store_Lcd.values()].sort().map(function (element) {
                  if (element.name.includes('IPHONE')) {
                    if (
                      element.name.includes('IPHONE X') ||
                      element.name.includes('IPHONE XS MAX') ||
                      element.name.includes('IPHONE XR') ||
                      element.name.includes('IPHONE 11')
                    ) {
                      return String(
                        element.n + 'x ' + element.name + '\n'
                      )
                    } else {
                      return String(
                        element.n +
                          'x ' +
                          
                          element.name +
                          ' ' +
                          element.col +
                          '\n'
                      )
                    }
                  } if (element.name.includes('HUAWEI')){
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
                         
                          element.name +
                          ' ' +
                          element.frame +
                          '\n'
                      )
                    } else {
                      return String(
                        element.n +
                          'x ' +
                         
                          element.name +
                          ' ' +
                          element.col +
                          ' ' +
                          element.frame +
                          '\n'
                      )
                    }
                  } if(element.name.includes('SAMSUNG')){
                    return String(
                        element.n +
                          'x ' +
                          element.name +
                          ' ' +
                          element.col +
                          '\n'
                      )
                  }
                })}
                <Text style={{color:'#007AFF'}}> {'\n\t'}EXTRA{'\n'}</Text> 
                  {[...global.extra].map(function(element){
                    return element
                  }) }
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
        textAlign: 'left',
        color: '#F1F3F4',
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