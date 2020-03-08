import {AppRegistry} from 'react-native';
import App from './App/Containers/RootContainer';
import {name as appName} from './app.json';
import './App/Config/ReactotronConfig';

AppRegistry.registerComponent(appName, () => App);
