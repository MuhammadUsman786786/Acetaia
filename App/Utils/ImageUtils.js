import ImagePicker from 'react-native-image-picker';

export const loadImageHandler = (callBack = () => {}) => {
  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  ImagePicker.showImagePicker(options, response => {
    if (response.didCancel || response.error || response.customButton) {
      return;
    }
    callBack({uri: response.uri});
  });
};
