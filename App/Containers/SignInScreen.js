import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import * as _ from 'lodash';
import {Colors} from '../Theme';
import {CustomButton, CustomInputField} from '../Components';
import {moderateScale, scale} from 'react-native-size-matters';
import {showToast} from '../Utils/UiUtils';
import InputScrollView from 'react-native-input-scroll-view';
import {loginHandler} from '../Services/ApiCaller';

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'test20test20',
      password: 'test20test20',
      isLoading: false,
      isCurrentScreen: true,
    };
  }

  componentDidMount = async () => {};

  showLoading = () => {
    this.setState({isLoading: true});
  };

  hideLoading = () => {
    this.setState({isLoading: false});
  };

  onSignInPress = async () => {
    const {username, password} = this.state;
    if (_.isEmpty(username) || _.isEmpty(password)) {
      showToast('All fields are required');
      return;
    }
    this.showLoading();
    try {
      await loginHandler({username, password});
    } catch (e) {
    } finally {
      this.hideLoading();
    }
  };

  changeText = ({valueKey, value}) => {
    this.setState({[valueKey]: value});
  };

  navigateToSignUp = () => {
    this.props.navigation.navigate('SignUpScreen');
  };

  render() {
    return (
      <InputScrollView style={[styles.container]}>
        <StatusBar hidden />
        <View style={styles.innerContianer}>
          <View>
            <Text style={styles.titleStyle}>Acetaia</Text>
          </View>
          <View style={[styles.formContainer]}>
            <CustomInputField
              value={this.state.username}
              valueKey={'username'}
              label={'Email*'}
              placeholder={'Email'}
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
            <CustomButton
              title={'Sign in'}
              onPress={this.onSignInPress}
              titleColor={Colors.white}
              isLoading={this.state.isLoading}
              disabled={this.state.isLoading}
              loadingIndicatorColor={Colors.white}
              isBottomSpacing
            />
            <CustomButton
              title={'Sign Up'}
              onPress={this.navigateToSignUp}
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

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '10%',
  },
  innerContianer: {
    flex: 1,
    paddingTop: moderateScale(60),
  },
  titleStyle: {
    fontSize: moderateScale(30),
    color: Colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: moderateScale(50),
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
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 6,
    alignSelf: 'center',
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(20),
  },
  buttonContainer: {
    marginTop: moderateScale(20),
  },
});
