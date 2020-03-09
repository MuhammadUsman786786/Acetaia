import {AppRegistry} from 'react-native';
import App from './App/Containers/RootContainer';
import {name as appName} from './app.json';
import './App/Config/ReactotronConfig';

console.ignoredYellowBox = [
  'Warning: BackAndroid is deprecated. Please use BackHandler instead.',
  'source.uri should not be an empty string',
  'Invalid props.style key',
];
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
