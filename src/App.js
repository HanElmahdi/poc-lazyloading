/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { React } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  View,
} from 'react-native';

import AppRecord from './components/AppRecord';
// import AppHeader from './components/AppHeader';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import FlashMessage from "react-native-flash-message";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
function HomeScreen() {
  return (
      <SafeAreaView style={styles.container}>
          <AppRecord />
          <FlashMessage position="top" />
      </SafeAreaView>
  );
}


const App = () => {
  const Stack = createNativeStackNavigator();

  //  return (
  //    <SafeAreaView style={styles.container}>
  //      <ScrollView style={styles.scrollView}>
  //        <AppHeader />
  //        <AppNotification />
  //        <FlashMessage position="top" />
  //      </ScrollView>
  //    </SafeAreaView>    
  //  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Items' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  scrollView: {
    padding: 12,
  },
});

export default App;
