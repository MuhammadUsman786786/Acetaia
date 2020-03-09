import Toast from 'react-native-root-toast';
import {Alert} from 'react-native';

export const showToast = message => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.CENTER,
  });
};

export const showAlert = (props = {}) => {
  const {
    title = 'title',
    message = 'message',
    okText = 'OK',
    cancelText = 'Cancel',
    okPressHandler = () => {},
    cancelPressHandler = () => {},
  } = props || {};
  Alert.alert(
    title,
    message,
    [
      {
        text: cancelText,
        onPress: cancelPressHandler,
        style: 'cancel',
      },
      {text: okText, onPress: okPressHandler},
    ],
    {cancelable: false},
  );
};
