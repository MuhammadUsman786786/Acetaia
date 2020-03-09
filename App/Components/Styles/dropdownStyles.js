import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../../Theme';

export default {
  sectionTextStyle: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    color: Colors.yellow,
  },
  optionTextStyle: {
    fontSize: moderateScale(17),
    color: Colors.primary,
  },
  cancelTextStyle: {
    fontSize: moderateScale(17),
    color: Colors.primary,
  },
  cancelContainerStyle: {
    color: Colors.white,
  },
  cancelStyle: {
    // backgroundColor: Colors.red,
  },
  selectedItemTextStyle: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
};
