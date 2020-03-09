import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomButton, CustomInputField} from './index';
import {moderateScale, scale} from 'react-native-size-matters';
import {createBarrelValidation} from '../Utils/Validation';
import * as _ from 'lodash';
import {
  createBarrelHandler,
  editBarrelHandler,
  fetchBarrelHandler,
  fetchBatteriesHandler,
} from '../Services/ApiCaller';
import {DROPDOWN_HEADER} from './OperationsForm';
import {withNavigation} from '@react-navigation/compat';
import ModalSelector from 'react-native-modal-selector';
import modalDropDownStyle from './Styles/dropdownStyles';

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
      formMode: props.formMode || 'add',
      oldBarrelId: props.id,
      batteriesList: [],
      author: '15',
    };
  }

  componentDidMount = () => {
    this.onPageFocus();
    this.updateHandler();
  };

  updateHandler = async () => {
    const {formMode} = this.state;
    if (formMode === 'add' || _.isEmpty(formMode)) {
      return;
    }
    try {
      const barrelInfo = await fetchBarrelHandler({id: this.props.id});
      this.setState({...barrelInfo});
    } catch (e) {}
  };

  onPageFocus = async () => {
    try {
      const batteriesList = await fetchBatteriesHandler();
      this.setState({
        batteriesList: [...DROPDOWN_HEADER, ...batteriesList] || [],
      });
    } catch (e) {}
  };

  onChangeText = ({valueKey, value}) => {
    this.setState({[valueKey]: value});
  };

  onCreateEditBarrel = async () => {
    const {formMode, oldBarrelId} = this.state;
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
      if (formMode === 'add') {
        await createBarrelHandler({...params, author: '15'});
      } else {
        await editBarrelHandler({...params, author: '15'}, oldBarrelId);
        this.props.onEditSuccessfull();
      }
      this.setState({...INITIAL_BARREL_FORM});
    } catch (e) {}
  };

  render() {
    const {formMode = 'add'} = this.state;
    return (
      <View style={styles.formContainer}>
        <Text style={styles.titleStyle}>Crea Barile</Text>
        {formMode === 'add' && (
          <CustomInputField
            isBottomSpacing
            valueKey={'id'}
            label={'Id*'}
            placeholder={'Barell id'}
            value={this.state.id}
            onChangeText={this.onChangeText}
          />
        )}
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
        {formMode === 'add' && (
          <ModalSelector
            data={this.state.batteriesList}
            selectedKey={0}
            cancelText={'Cancel'}
            {...modalDropDownStyle}
            keyExtractor={data => data.id}
            labelExtractor={data => {
              return !data.section
                ? `Barrel with Id ${data.id}`
                : 'Select Barrel Origin';
            }}
            onChange={item => this.setState({barrier_id: item.id})}>
            <CustomInputField
              isBottomSpacing
              label={'Barrier id*'}
              placeholder={'Barrier id'}
              value={_.toString(this.state.barrier_id)}
            />
          </ModalSelector>
        )}
        {formMode === 'add' && (
          <CustomInputField
            isBottomSpacing
            valueKey={'quantity'}
            label={'Q.ta*'}
            placeholder={'Quantity'}
            value={this.state.quantity}
            onChangeText={this.onChangeText}
          />
        )}
        <CustomButton title={'Crea'} onPress={this.onCreateEditBarrel} />
      </View>
    );
  }
}

export default withNavigation(BarrelForm);
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
