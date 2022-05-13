import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { useDefaultStyleSheet } from './components/style';
import Sqlite from './db/Sqlite';
import HomeScreen from './scenes/Home';
import LoginScreen from './scenes/Login';
import NewLoginScreen from './scenes/NewLogin';
import NewContatoScreen from './scenes/NewContato';
import ContatosScreen from './scenes/Contatos';
import SplashScreen from './scenes/Splash';

const Stack = createNativeStackNavigator();

export default function App() {
  const style = useDefaultStyleSheet()

  async function initProject() {
    await Sqlite.runDDL().catch(err => alert(err))
  }
  initProject()
  return (
    <ThemeProvider theme={style}>

      <NavigationContainer initialRouteName="Login">
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ title: 'Splash', headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login', headerShown: false }} />
          <Stack.Screen name="NewLogin" component={NewLoginScreen} options={{ title: 'NewLogin', headerShown: false }} />
          <Stack.Screen name="Contatos" component={ContatosScreen} options={{ title: 'Contatos', headerShown: false }} />
          <Stack.Screen name="NewContato" component={NewContatoScreen} options={{ title: 'NewContato', headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}