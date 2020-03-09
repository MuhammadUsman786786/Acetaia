import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  BarrelForm,
  CustomButton,
  CustomInputField,
  ToggleItem,
} from '../Components';
import {moderateScale, scale} from 'react-native-size-matters';
import {createBarrelIdValidation} from '../Utils/Validation';
import {createBatteryHandler} from '../Services/ApiCaller';
import InputScrollView from 'react-native-input-scroll-view';

const INITIAL_BARREL_ID_FORM = {
  barrelId1: '',
};

class BatteryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBarrelIdForm: false,
      isBarrelForm: true,
      ...INITIAL_BARREL_ID_FORM,
    };
  }

  toggleIdBarrelForm = () => {
    this.setState({
      isBarrelIdForm: !this.state.isBarrelIdForm,
      isBarrelForm: false,
    });
  };

  toggleBarrelForm = () => {
    this.setState({
      isBarrelForm: !this.state.isBarrelForm,
      isBarrelIdForm: false,
    });
  };

  onChangeText = ({valueKey, value}) => {
    this.setState({[valueKey]: value});
  };

  onCreateBarrelId = async () => {
    const {barrelId1} = this.state;
    if (!createBarrelIdValidation(this.state)) {
      return;
    }
    try {
      await createBatteryHandler({id: barrelId1});
      this.setState({...INITIAL_BARREL_ID_FORM});
    } catch (e) {}
  };

  renderBrrelIdForm = () => {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.titleStyle}>Crea Barriera</Text>
        <CustomInputField
          label={'Id*'}
          valueKey={'barrelId1'}
          placeholder={'Barriera id'}
          value={this.state.barrelId1}
          isBottomSpacing
          onChangeText={this.onChangeText}
        />
        <CustomButton title={'Crea'} onPress={this.onCreateBarrelId} />
      </View>
    );
  };

  render() {
    const {isBarrelIdForm, isBarrelForm} = this.state;
    return (
      <InputScrollView keyboardShouldPersistTaps={true}>
        <ToggleItem
          title={'Barriera'}
          isDivider
          onPress={this.toggleIdBarrelForm}
        />
        {isBarrelIdForm && this.renderBrrelIdForm()}
        <ToggleItem title={'Barile'} onPress={this.toggleBarrelForm} />
        {isBarrelForm && <BarrelForm />}
      </InputScrollView>
    );
  }
}

export default BatteryScreen;

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
