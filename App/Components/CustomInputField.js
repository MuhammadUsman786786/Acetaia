import React, {Fragment} from 'react';
import {StyleSheet, Text, TextInput, View, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../Theme';
import {moderateScale, scale} from 'react-native-size-matters';

const CustomInputField = props => {
  const {container = {}} = props;
  const {
    valueKey,
    value,
    placeholder,
    isEditable,
    isBottomSpacing,
    placeholderTextColor,
    secureTextEntry,
    inputFieldStyle,
    borderRadius,
    multiline,
  } = props || {};

  const {onChangeText} = props;
  const bottomSpacing = isBottomSpacing ? styles.bottomSpacing : {};
  return (
    <Fragment>
      <Text style={styles.labelStyle}>{props.label}</Text>
      <View
        style={[styles.container, bottomSpacing, container, {borderRadius}]}>
        <TextInput
          value={value}
          placeholder={placeholder}
          multiline={multiline}
          editable={isEditable}
          style={[styles.inputFieldContainer, inputFieldStyle]}
          selectionColor={Colors.yellow}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={placeholderTextColor}
          keyboardType={props.keyboardType||'default'}
          onChangeText={currentValue =>
            onChangeText({valueKey, value: currentValue})
          }
        />
      </View>
    </Fragment>
  );
};

CustomInputField.propTypes = {
  valueKey: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  borderRadius: PropTypes.number,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  placeholderTextColor: PropTypes.string.isRequired,
  isEditable: PropTypes.bool,
  isBottomSpacing: PropTypes.bool,
  multiline: PropTypes.bool,
  selectionColor: PropTypes.string.isRequired,
  inputFieldStyle: ViewPropTypes.style,
  secureTextEntry: PropTypes.bool,
  onChangeText: PropTypes.func,
};

CustomInputField.defaultProps = {
  valueKey: '',
  value: '',
  label: '',
  placeholder: '',
  placeholderTextColor: '',
  borderRadius: moderateScale(6),
  isEditable: true,
  isBottomSpacing: false,
  multiline: false,
  selectionColor: '',
  inputFieldStyle: {},
  secureTextEntry: false,
  onChangeText: () => {},
};
export default CustomInputField;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: moderateScale(15),
    marginBottom: moderateScale(5),
  },
  container: {
    borderWidth: 1,
    paddingHorizontal: scale(15),
    borderColor: Colors.primary,
    height: moderateScale(45),
  },
  inputFieldContainer: {
    flex: 1,
    paddingVertical: 0,
    marginRight: scale(8),
    marginVertical: 0,
    color: Colors.yellow,
    fontSize: moderateScale(15),
  },
  bottomSpacing: {
    marginBottom: moderateScale(20),
  },
});
