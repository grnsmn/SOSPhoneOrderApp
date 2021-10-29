import React from 'react'
import { StyleSheet, Image, View, Text} from 'react-native'
import HomeScreen from './components/screen/Home'
import BattList from './components/screen/Batterie'
import BattListHW from './components/screen/BatterieHW'
import BattListSM from './components/screen/BatterieSM'
import DisplayList from './components/screen/Display'
import DisplayListHW from './components/screen/DisplayHW'
import DisplayListSM from './components/screen/DisplaySM'
import Other from './components/screen/Other'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Accessori from './components/screen/Accessori'
import { MenuProvider } from 'react-native-popup-menu';

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
// Work around issue `Setting a timer for long time`
// see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startsWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}
const Stack = createStackNavigator()

export default function App () {
  return (
  <MenuProvider>
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
            headerTintColor: '#F1F3F4',
            headerTitleStyle: {
              fontWeight: 'bold'
            },
          }}
        />
        <Stack.Screen
          name='Batterie'
          component={BattList}
          options={{
            headerStyle: {
              backgroundColor: '#252850'
            },
            headerTintColor: '#F1F3F4',
            headerTitleStyle: {
              fontWeight: 'bold'
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
            headerTintColor: '#F1F3F4',
            headerTitleStyle: {
              fontWeight: 'bold'
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
            headerTintColor: '#F1F3F4',
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
              backgroundColor: '#252850'
            },
            headerTintColor: '#F1F3F4',
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
            headerTintColor: '#F1F3F4',
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
            headerTintColor: '#F1F3F4',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
        <Stack.Screen
          name='Other'
          component={Other}
          options={{
            headerStyle: {
              backgroundColor: '#252850'
            },
            headerTintColor: '#F1F3F4',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
        <Stack.Screen
          name='Accessori'
          component={Accessori}
          options={{
            headerStyle: {
              backgroundColor: '#252850'
            },
            headerTintColor: '#F1F3F4',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </MenuProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    padding: 5
  }
})
