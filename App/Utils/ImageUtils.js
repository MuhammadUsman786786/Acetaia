import ImagePicker from 'react-native-image-picker';
import * as _ from 'lodash';

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
    const fileExtension = _.split(response.uri, '.');
    callBack({
      uri: response.uri,
      type: response.type,
      name: `testPhotoName.${fileExtension[_.size(fileExtension) - 1]}`,
    });
  });
};
