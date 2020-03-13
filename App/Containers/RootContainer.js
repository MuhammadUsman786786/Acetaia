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
import {VectorIcon} from '../Components';
import {ICON_TYPES} from '../Utilities/Constants';
import {moderateScale} from 'react-native-size-matters';
import SignInScreen from './SignInScreen';
import {navigationRef} from '../Services/NavigatorServices';
import SignUpScreen from './SignUpScreen';

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

const ICONS_LIST = {
  Home: {iconType: ICON_TYPES.AntDesign, iconName: 'home'},
  Nuovo: {iconType: ICON_TYPES.FontAwesome5, iconName: 'drum-steelpan'},
  Operazioni: {iconType: ICON_TYPES.AntDesign, iconName: 'form'},
};

const Home = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          const {iconType, iconName} = ICONS_LIST[route.name];
          return (
            <VectorIcon
              type={iconType}
              name={iconName}
              size={moderateScale(20)}
              color={color}
            />
          );
        },
      })}>
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
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
          // initialRouteName={'BarrelDetailScreen'}
          >
            <Stack.Screen
              name="SignInScreen"
              component={SignInScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{headerShown: false}}
            />
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
