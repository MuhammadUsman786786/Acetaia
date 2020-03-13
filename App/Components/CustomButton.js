import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Button} from 'galio-framework';
import {Colors} from '../Theme';
import {moderateScale} from 'react-native-size-matters';

const CustomButton = props => {
  return (
    <Button style={[styles.container,props.container]} shadowless onPress={props.onPress}>
      {props.title}
    </Button>
  );
};

export default CustomButton;

CustomButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

CustomButton.defaultProps = {
  title: '',
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 0,
    marginHorizontal: 0,
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(6),
  },
});
