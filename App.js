import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/screen/Home'
import BattList from './components/screen/Batterie'
import BattListHW from './components/screen/BatterieHW'
import BattListSM from './components/screen/BatterieSM';
import DisplayList from './components/screen/Display'
import DisplayListHW from './components/screen/DisplayHW'
import DisplayListSM from './components/screen/DisplaySM'
//import Other from './components/screen/Other'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

function LogoTitle () {
  return (
    <View style= {{flexDirection:'row', alignItems:'center'}}>
      <Image
        style={{ width: 50, height: 50 }}
        source={require('./img/SOSPhone.jpg')}
      />
      <Text style={{ fontWeight: 'bold', color:'white'}}>Order App</Text>
    </View>
  )
}

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'ORDER APP HOME',
            headerStyle: {
              backgroundColor: '#252850'
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
              backgroundColor: '#252850'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name='Batterie Huawei'
          component={BattListHW}
          options={{
            headerStyle: {
              backgroundColor: '#252850'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name='Batterie Samsung'
          component={BattListSM}
          options={{
            headerStyle: {
              backgroundColor: '#252850'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name='Display'
          component={DisplayList}
          options={{
            headerStyle: {
              backgroundColor: '#252850'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
        <Stack.Screen
          name='Display Huawei'
          component={DisplayListHW}
          options={{
            headerStyle: {
              backgroundColor: '#252850'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
        <Stack.Screen
          name='Display Samsung'
          component={DisplayListSM}
          options={{
            headerStyle: {
              backgroundColor: '#252850'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
        {/* <Stack.Screen
          name='Other'
          component={Other}
          options={{
            headerStyle: {
              backgroundColor: '#252850'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />  */}
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