import React, {Component} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import HomeScreen from './HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from '../Theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BatteryScreen from './BatteryScreen';
import BarrelDetailScreen from './BarrelDetailScreen';
import OperationsScreen from './OperationsScreen';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const navBarStyle = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const Home = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Nuovo" component={BatteryScreen} />
      <Tab.Screen name="Operazioni" component={OperationsScreen} />
    </Tab.Navigator>
  );
};

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <NavigationContainer>
          <Stack.Navigator
          // initialRouteName={'BarrelDetailScreen'}
          >
            <Stack.Screen
              name="Acetaia"
              component={Home}
              options={{...navBarStyle}}
            />
            <Stack.Screen
              name="BarrelDetailScreen"
              component={BarrelDetailScreen}
              options={{...navBarStyle, headerTitle: 'Barile Info'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
