import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../Theme';
import {CustomButton, CustomInputField} from '../Components';
import {moderateScale, scale} from 'react-native-size-matters';
import InputScrollView from 'react-native-input-scroll-view';
import {signUpValidation} from '../Utils/Validation';
import {signUpHandler} from '../Services/ApiCaller';
import {ICON_TYPES} from '../Utilities/Constants';
import IconButton from '../Components/IconButton';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'test21test21',
      password: 'test21test21',
      confirmPassword: 'test21test21',
      isLoading: false,
    };
  }

  componentDidMount = async () => {};

  onSignUpPress = async () => {
    const {username, password} = this.state;
    if (!signUpValidation(this.state)) {
      return;
    }
    try {
      await signUpHandler({username, password});
    } catch (e) {}
  };

  changeText = ({valueKey, value}) => {
    this.setState({[valueKey]: value});
  };

  render() {
    return (
      <InputScrollView style={[styles.container]}>
        <View sytle={styles.innerContainer}>
          <IconButton
            color={Colors.primary}
            type={ICON_TYPES.IonIcons}
            name={'ios-arrow-round-back'}
            size={moderateScale(40)}
            style={{marginTop: moderateScale(40)}}
            onPress={() => this.props.navigation.goBack()}
          />
          <Text style={styles.titleStyle}>Acetaia</Text>
          <View style={[styles.formContainer]}>
            <CustomInputField
              value={this.state.username}
              valueKey={'username'}
              label={'User Name*'}
              placeholder={'User Name'}
              selectionColor={'blue'}
              style={styles.inputField}
              isBottomSpacing
              onChangeText={this.changeText}
            />
            <CustomInputField
              value={this.state.password}
              valueKey={'password'}
              label={'Password*'}
              placeholder={'Password'}
              selectionColor={'blue'}
              style={styles.inputField}
              secureTextEntry
              isBottomSpacing
              onChangeText={this.changeText}
            />
            <CustomInputField
              value={this.state.confirmPassword}
              valueKey={'confirmPassword'}
              label={'Confirm Password*'}
              placeholder={'Confirm Password'}
              selectionColor={'blue'}
              style={styles.inputField}
              secureTextEntry
              isBottomSpacing
              onChangeText={this.changeText}
            />
            <CustomButton
              title={'Sign Up'}
              onPress={this.onSignUpPress}
              titleColor={Colors.white}
              isLoading={this.state.isLoading}
              disabled={this.state.isLoading}
              isBottomSpacing
              loadingIndicatorColor={Colors.white}
              container={styles.buttonContainer}
            />
          </View>
        </View>
      </InputScrollView>
    );
  }
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '10%',
  },
  innerContainer: {
    // flex:1,
    // marginTop: moderateScale(180),
  },
  titleStyle: {
    fontSize: moderateScale(30),
    color: Colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: moderateScale(10),
  },
  rightContainer: {
    minHeight: '35%',
    paddingHorizontal: scale(15),
  },
  inputField: {
    borderBottomWidth: 2,
    borderColor: Colors.lightgrey,
    backgroundColor: 'white',
    height: moderateScale(35),
    fontSize: moderateScale(17),
    marginBottom: moderateScale(20),
    width: '100%',
  },
  labelStyle: {
    fontSize: moderateScale(10),
    color: Colors.grey,
    marginBottom: moderateScale(6),
  },
  formContainer: {
    width: '100%',
    borderRadius: 6,
    alignSelf: 'center',
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(20),
  },
});
