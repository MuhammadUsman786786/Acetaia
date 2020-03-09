import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import CheckBox from '../Library/CustomCheckbox';
import {moderateScale, scale} from 'react-native-size-matters';
import OperatoinsForm from '../Components/OperationsForm';
import InputScrollView from 'react-native-input-scroll-view';
const FORM_LABELS=[
  'Aggiunta',
  'Prelievo',
  'Rabbocco',
  'Misurazione',
  'Degustazione',
]
class OperationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFormIndex: 0,
    };
  }

  renderCheckBox = (index, rightText) => {
    return (
      <CheckBox
        style={{marginLeft: scale(6)}}
        checkboxStyle={styles.checkboxStyle}
        onClick={() => this.setState({currentFormIndex: index})}
        isChecked={this.state.currentFormIndex === index}
        rightText={rightText}
        rightTextStyle={styles.rightTextStyle}
      />
    );
  };

  render() {
    const {currentFormIndex}=this.state
    return (
      <InputScrollView>
        <View style={styles.container}>
          {this.renderCheckBox(0, FORM_LABELS[0])}
          {this.renderCheckBox(1, FORM_LABELS[1])}
          {this.renderCheckBox(2, FORM_LABELS[2])}
          {this.renderCheckBox(3, FORM_LABELS[3])}
          {this.renderCheckBox(4, FORM_LABELS[4])}
          <OperatoinsForm formId={currentFormIndex} formLabel={FORM_LABELS[currentFormIndex]}/>
        </View>
      </InputScrollView>
    );
  }
}

export default OperationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(6),
  },
  checkboxStyle: {
    width: moderateScale(35),
    height: moderateScale(35),
  },
  rightTextStyle: {
    fontSize: moderateScale(20),
  },
});
