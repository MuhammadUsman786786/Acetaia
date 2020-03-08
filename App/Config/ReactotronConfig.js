import Reactotron from 'reactotron-react-native';
import {AsyncStorage} from 'react-native';

Reactotron.configure({name: 'Acetaia'})
  .useReactNative()
  .setAsyncStorageHandler(AsyncStorage)
  .connect();
Reactotron.clear();

// Totally hacky, but this allows you to not both importing reactotron-react-native
// on every file.  This is just DEV mode, so no big deal.
console.tron = Reactotron;

export const printLogs = log => {
  console.tron.warn(log);
};
