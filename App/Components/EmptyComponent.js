import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../Theme';

const EmptyComponent = (props = {}) => {
  const {title} = props || {};
  return (
    <View>
      <Text style={styles.titleStyle}>{title}</Text>
    </View>
  );
};

export default EmptyComponent;

EmptyComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

EmptyComponent.defaultProps = {
  title: 'No Event is found',
};

const styles = StyleSheet.create({
  titleStyle: {
    textAlign: 'center',
    fontSize: moderateScale(15),
    marginTop: moderateScale(30),
  },
});
