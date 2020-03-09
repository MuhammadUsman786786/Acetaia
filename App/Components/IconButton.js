import React, {Fragment} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import VectorIcon from './VectorIcon';
import PropTypes from 'prop-types';
import {Colors} from '../Theme';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as _ from 'lodash';

const IconButton = (props = {}) => {
  const {
    title,
    name,
    type,
    size,
    color,
    backgroundColor,
    style,
    titleColor,
    titleStyle,
    isLoading,
  } = props;
  const {container} = props || {};
  const {onPress} = props || {};
  const containerStyle = !_.isEmpty(title) ? styles.optionalContainerStyle : {};

  if (isLoading) {
    return <ActivityIndicator size={'small'} color={Colors.yellow} />;
  }

  const ButtonBody = (
    <Fragment>
      <VectorIcon
        name={name}
        type={type}
        size={size}
        color={color}
        style={[style]}
      />
    </Fragment>
  );

  return typeof onPress === 'function' ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        containerStyle,
        {backgroundColor: backgroundColor},
        container,
      ]}>
      {ButtonBody}
    </TouchableOpacity>
  ) : (
    <View
      style={[
        styles.container,
        containerStyle,
        {backgroundColor: backgroundColor},
        container,
      ]}>
      {ButtonBody}
    </View>
  );
};

export default IconButton;

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  style: ViewPropTypes.style,
  titleStyle: ViewPropTypes.style,
  container: ViewPropTypes.style,
  onPress: PropTypes.func,
};

IconButton.defaultProps = {
  name: '',
  type: '',
  size: moderateScale(15),
  color: Colors.primary,
  title: '',
  backgroundColor: '',
  titleColor: Colors.white,
  style: {},
  titleStyle: {},
  container: {},
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(8),
    paddingVertical: moderateScale(8),
  },
  optionalContainerStyle: {
    marginTop: verticalScale(4),
  },
  titleStyle: {
    fontSize: moderateScale(12),
    color: Colors.white,
    marginLeft: scale(8),
  },
});
