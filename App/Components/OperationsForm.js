import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {CustomButton, CustomInputField} from './index';
import {moderateScale, scale} from 'react-native-size-matters';
import {withNavigation} from '@react-navigation/compat';
import modalDropDownStyle from './Styles/dropdownStyles';
import * as _ from 'lodash';
import {
  createOperationHandler,
  editBarrelHandler,
  fetchBarrelsHandler,
} from '../Services/ApiCaller';
import ModalSelector from 'react-native-modal-selector';
import {createOperationValidation} from '../Utils/Validation';
import {printLogs} from '../Config/ReactotronConfig';
import {ICON_TYPES} from '../Utilities/Constants';
import IconButton from './IconButton';
import {loadImageHandler} from '../Utils/ImageUtils';

export const DROPDOWN_HEADER = [{section: true, id: 'Select User Type'}];

const INITIAL_OPERATIONS_FORM = {
  op_type: '',
  vinegar_type: '',
  barrel_or: '',
  barrel_dest: '',
  quantity: '',
  mis_type: '',
  mis_value: '',
  description: '',
  isLoadImage: false,
  uploadedImage: {},
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
    const {
      params,
      isValid,
      sourceBarrelObject = {},
      destinationBarrelObject = {},
    } = createOperationValidation(
      this.state,
      this.props.formId,
      this.state.barrelsList,
    );
    if (!isValid) {
      return;
    }
    try {
      await createOperationHandler(params, sourceBarrelObject);
      if (!_.isEmpty(sourceBarrelObject)) {
        await editBarrelHandler(sourceBarrelObject, sourceBarrelObject.id, '');
      }
      if (!_.isEmpty(destinationBarrelObject)) {
        await editBarrelHandler(
          destinationBarrelObject,
          destinationBarrelObject.id,
          '',
        );
      }
      if (
        !_.isEmpty(sourceBarrelObject) ||
        !_.isEmpty(destinationBarrelObject)
      ) {
        printLogs('focus');
        await this.onPageFocus();
      }
      this.setState({...INITIAL_OPERATIONS_FORM});
    } catch (e) {}
  };

  componentDidMount = () => {
    this.props.navigation.addListener('focus', this.onPageFocus);
  };

  onPageFocus = async () => {
    try {
      const barrelsList = await fetchBarrelsHandler();
      this.setState({
        barrelsList: [...DROPDOWN_HEADER, ...(barrelsList || [])] || [],
      });
    } catch (e) {}
  };

  showLoadImageBottomSheet = () => {
    loadImageHandler(async uploadedImage => {
      this.setState({uploadedImage, isLoadImage: true});
    });
  };

  render() {
    const {formId, formLabel} = this.props;
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
        {formId === 2 && (
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
              label={'Barrel of Destination*'}
              placeholder={'Barrel of Destination'}
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
            valueKey={'mis_type'}
            label={'Measurement Type*'}
            placeholder={'Measurement Type'}
            value={this.state.mis_type}
            onChangeText={this.onChangeText}
          />
        )}
        {formId === 3 && (
          <CustomInputField
            isBottomSpacing
            valueKey={'mis_value'}
            label={'Measurement Value*'}
            placeholder={'Measurement Value'}
            value={this.state.mis_value}
            keyboardType={'numeric'}
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
        {formId === 4 && (
          <View>
            <Text style={styles.labelStyle}>{'Upload Image*'}</Text>
            <IconButton
              name={'camera'}
              type={ICON_TYPES.Entypo}
              size={moderateScale(20)}
              onPress={this.showLoadImageBottomSheet}
            />
          </View>
        )}
        {formId === 4 && this.state.isLoadImage && (
          <Image
            style={styles.operationImageStyle}
            source={this.state.uploadedImage}
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
  operationImageStyle: {
    resizeMode: 'cover',
    width: '100%',
    height: moderateScale(300),
    borderRadius: moderateScale(6),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
  },
  labelStyle: {
    fontSize: moderateScale(15),
  },
});
