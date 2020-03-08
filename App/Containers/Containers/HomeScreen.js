import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {fetchBatteriesHandler} from '../../Services/ApiCaller';

class HomeScreen extends Component {
  componentDidMount() {
    fetchBatteriesHandler();
  }

  render() {
    return (
      <View>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
      </View>
    );
  }
}

export default HomeScreen;
