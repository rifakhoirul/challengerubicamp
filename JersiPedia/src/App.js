/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router'
import { View, Text } from 'react-native'

const App = () => {
  return (
    // <View>
    //   <Text>Halo</Text>
    // </View>
    <NavigationContainer>
      <Router/>
    </NavigationContainer>
  );
}

export default App;