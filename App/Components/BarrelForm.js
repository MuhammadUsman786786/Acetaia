import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomButton, CustomInputField} from './index';
import {moderateScale, scale} from 'react-native-size-matters';
import {createBarrelValidation} from '../Utils/Validation';
import * as _ from 'lodash';
import {createBarrelHandler} from '../Services/ApiCaller';

const INITIAL_BARREL_FORM = {
  id: '',
  capacity: '',
  wood_type: '',
  vinegar_type: '',
  barrier_id: '',
  quantity: '',
};

class BarrelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_BARREL_FORM,
      author: '15',
    };
  }

  onChangeText = ({valueKey, value}) => {
    this.setState({[valueKey]: value});
  };

  onCreateEditBarrel = async () => {
    const params = _.pick(this.state, [
      'id',
      'capacity',
      'wood_type',
      'vinegar_type',
      'barrier_id',
      'quantity',
      'author',
    ]);

    if (!createBarrelValidation(params)) {
      return;
    }
    try {
      await createBarrelHandler(params);
      this.setState({...INITIAL_BARREL_FORM});
    } catch (e) {}
  };

  componentDidMount = () => {};

  render() {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.titleStyle}>Crea Barile</Text>
        <CustomInputField
          isBottomSpacing
          valueKey={'id'}
          label={'Id*'}
          placeholder={'Barell id'}
          value={this.state.id}
          onChangeText={this.onChangeText}
        />
        <CustomInputField
          isBottomSpacing
          valueKey={'capacity'}
          label={'Maximum Capacity*'}
          placeholder={'Maximum Capacity'}
          value={this.state.capacity}
          onChangeText={this.onChangeText}
        />
        <CustomInputField
          isBottomSpacing
          valueKey={'wood_type'}
          label={'Wood Type*'}
          placeholder={'Wood Type'}
          value={this.state.wood_type}
          onChangeText={this.onChangeText}
        />
        <CustomInputField
          isBottomSpacing
          valueKey={'vinegar_type'}
          label={'Vinegar Type*'}
          placeholder={'Vinegar Type'}
          value={this.state.vinegar_type}
          onChangeText={this.onChangeText}
        />
        <CustomInputField
          isBottomSpacing
          valueKey={'barrier_id'}
          label={'Barrier id*'}
          placeholder={'Barrier id'}
          value={this.state.barrier_id}
          onChangeText={this.onChangeText}
        />
        <CustomInputField
          isBottomSpacing
          valueKey={'quantity'}
          label={'Q.ta*'}
          placeholder={'Quantity'}
          value={this.state.quantity}
          onChangeText={this.onChangeText}
        />
        <CustomButton title={'Crea'} onPress={this.onCreateEditBarrel} />
      </View>
    );
  }
}

export default BarrelForm;
const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: scale(10),
    paddingBottom: moderateScale(20),
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: moderateScale(17),
    paddingVertical: moderateScale(10),
  },
});
