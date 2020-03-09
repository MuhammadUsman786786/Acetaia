import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../Theme';
import {moderateScale, scale} from 'react-native-size-matters';
import {VectorIcon} from './index';
import {ICON_TYPES} from '../Utilities/Constants';

const ToggleItem = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, props.isDivider && styles.dividerStyle]}>
      <Text style={styles.titleStyle}>{props.title}</Text>
      <VectorIcon name={'ios-arrow-down'} type={ICON_TYPES.IonIcons} />
    </TouchableOpacity>
  );
};

export default ToggleItem;

ToggleItem.propTypes = {
  title: PropTypes.string,
  isDivider: PropTypes.bool,
  onPress: PropTypes.func,
};

ToggleItem.defaultProps = {
  title: '',
  isDivider: false,
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    backgroundColor: Colors.white,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: moderateScale(17),
    paddingVertical: moderateScale(10),
  },
  dividerStyle: {
    marginBottom: 1,
  },
});
