import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomButton, CustomInputField} from './index';
import {moderateScale, scale} from 'react-native-size-matters';
import {withNavigation} from '@react-navigation/compat';
import modalDropDownStyle from './Styles/dropdownStyles';
import * as _ from 'lodash';
import {
  createOperationHandler,
  fetchBarrelsHandler,
} from '../Services/ApiCaller';
import {printLogs} from '../Config/ReactotronConfig';
import ModalSelector from 'react-native-modal-selector';
import {createOperationValidation} from '../Utils/Validation';

export const DROPDOWN_HEADER = [{section: true, id: 'Select User Type'}];

const INITIAL_OPERATIONS_FORM = {
  op_type: '',
  vinegar_type: '',
  barrel_or: '',
  barrel_dest: '',
  quantity: '',
  measure_type: '',
  measured_value: '',
  description: '',
};

class OperationsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barrelsList: [],
      operator: '1',
      ...INITIAL_OPERATIONS_FORM,
    };
  }

  onChangeText = ({valueKey, value}) => {
    this.setState({[valueKey]: value});
  };

  onCreateOperation = async () => {
    const {params, isValid} = createOperationValidation(
      this.state,
      this.props.formId,
    );
    if (!isValid) {
      return;
    }
    try {
      await createOperationHandler(params);
      this.setState({...INITIAL_OPERATIONS_FORM});
    } catch (e) {}
  };

  componentDidMount = () => {
    this.props.navigation.addListener('focus', this.onPageFocus);
  };

  onPageFocus = async () => {
    try {
      const barrelsList = await fetchBarrelsHandler();
      this.setState({barrelsList: [...DROPDOWN_HEADER, ...barrelsList] || []});
    } catch (e) {}
  };

  render() {
    const {formId, formLabel} = this.props;
    const {barrelsList} = this.state;
    return (
      <View style={styles.formContainer}>
        <Text style={styles.titleStyle}>{formLabel} Operation</Text>
        <CustomInputField
          isBottomSpacing
          valueKey={'op_type'}
          label={'Types of Operation*'}
          placeholder={'Types of Operation'}
          value={this.state.op_type}
          onChangeText={this.onChangeText}
        />
        <CustomInputField
          isBottomSpacing
          valueKey={'vinegar_type'}
          label={'Vinegar type*'}
          placeholder={'Vinegar type'}
          value={this.state.vinegar_type}
          onChangeText={this.onChangeText}
        />
        {!_.isEmpty(barrelsList) && (
          <ModalSelector
            data={this.state.barrelsList}
            selectedKey={0}
            cancelText={'Cancel'}
            {...modalDropDownStyle}
            keyExtractor={data => data.id}
            labelExtractor={data => {
              return !data.section
                ? `Barrel with Id ${data.id}`
                : 'Select Barrel Origin';
            }}
            onChange={item => this.setState({barrel_or: item.id})}>
            <CustomInputField
              isBottomSpacing
              label={'Barrel of Origin*'}
              placeholder={'Barrel of Origin'}
              value={_.toString(this.state.barrel_or)}
            />
          </ModalSelector>
        )}
        {formId === 2 && !_.isEmpty(barrelsList) && (
          <ModalSelector
            data={this.state.barrelsList}
            selectedKey={0}
            cancelText={'Cancel'}
            {...modalDropDownStyle}
            keyExtractor={data => data.id}
            labelExtractor={data => {
              return !data.section
                ? `Barrel with Id ${data.id}`
                : 'Select Barrel Destination';
            }}
            onChange={item => this.setState({barrel_dest: item.id})}>
            <CustomInputField
              isBottomSpacing
              label={'Barrel of Origin*'}
              placeholder={'Barrel of Origin'}
              value={_.toString(this.state.barrel_dest)}
            />
          </ModalSelector>
        )}
        {(formId === 0 || formId === 1 || formId === 2) && (
          <CustomInputField
            isBottomSpacing
            valueKey={'quantity'}
            label={'Q.ta*'}
            placeholder={'Quantity'}
            value={this.state.quantity}
            keyboardType={'numeric'}
            onChangeText={this.onChangeText}
          />
        )}
        {formId === 3 && (
          <CustomInputField
            isBottomSpacing
            valueKey={'measure_type'}
            label={'Measurement Type*'}
            placeholder={'Measurement Type'}
            value={this.state.measure_type}
            onChangeText={this.onChangeText}
          />
        )}
        {formId === 3 && (
          <CustomInputField
            isBottomSpacing
            valueKey={'measured_value'}
            label={'Measurement Value*'}
            placeholder={'Measurement Value'}
            value={this.state.measured_value}
            onChangeText={this.onChangeText}
          />
        )}
        {formId === 4 && (
          <CustomInputField
            isBottomSpacing
            valueKey={'description'}
            label={'Description*'}
            placeholder={'Description'}
            value={this.state.description}
            onChangeText={this.onChangeText}
          />
        )}
        <CustomButton title={'Crea'} onPress={this.onCreateOperation} />
      </View>
    );
  }
}

export default withNavigation(OperationsForm);
const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: scale(10),
    paddingBottom: moderateScale(20),
  },
  titleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: moderateScale(20),
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
  },
});
