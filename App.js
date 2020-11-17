import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import HomeScreen from './components/screen/Home'
import BattList from './components/screen/Batterie'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import DisplayList from './components/screen/Display'
import BattListHW from './components/screen/BatterieHW'
import DisplayListHW from './components/screen/DisplayHW'

const Stack = createStackNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'SOS PHONE ORDER APP',
            headerStyle: {
              backgroundColor: '#f4511D',
              height:60
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
        <Stack.Screen
          name='Batterie'
          component={BattList}
          options={{
            headerStyle: {
              backgroundColor: '#f4511D'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
        <Stack.Screen
          name='Display'
          component={DisplayList}
          options={{
            headerStyle: {
              backgroundColor: '#f4511D'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
          <Stack.Screen
          name='BatterieHW'
          component={BattListHW}
          options={{
            headerStyle: {
              backgroundColor: '#f4511D'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
          <Stack.Screen
          name='DisplayHW'
          component={DisplayListHW}
          options={{
            headerStyle: {
              backgroundColor: '#f4511D'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 5
  }
})
