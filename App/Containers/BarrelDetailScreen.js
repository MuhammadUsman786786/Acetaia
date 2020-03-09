import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import IconButton from '../Components/IconButton';
import {BARREL_DETAIL_ITEM_KEYS, ICON_TYPES} from '../Utilities/Constants';
import {moderateScale, scale} from 'react-native-size-matters';
import {getParams} from '../Utils/Transform';
import {
  deleteBarrelHandler,
  deleteOperationHandler,
  fetchBarrelHandler,
  fetchOperationsHandler,
} from '../Services/ApiCaller';
import {showAlert} from '../Utils/UiUtils';
import {Colors} from '../Theme';
import moment from 'moment';
import * as _ from 'lodash';
import {printLogs} from '../Config/ReactotronConfig';

class BarrelDetailScreen extends Component {
  constructor(props) {
    super(props);
    const {id} = getParams(props);
    this.state = {
      id,
      operationsList: [],
    };
  }

  componentDidMount() {
    this.fetchDataHandler();
    this.fetchOperationsHandler();
  }

  fetchDataHandler = async () => {
    try {
      const barrelInfo = await fetchBarrelHandler({id: this.state.id});
      this.setState({...barrelInfo});
    } catch (e) {}
  };

  fetchOperationsHandler = async () => {
    try {
      const operationsList = await fetchOperationsHandler();
      this.setState({
        operationsList: _.filter(
          operationsList,
          item => item.barrel_or === this.state.id,
        ),
      });
    } catch (e) {}
  };

  renderInfoItem = ({key, title, isDivider} = {}) => {
    return (
      <View
        style={[styles.infoItemContainer, isDivider && styles.dividerStyle]}>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.infoStyle}>{this.state[key]}</Text>
      </View>
    );
  };

  onDeleteBarrel = () => {
    const {id} = this.state;
    showAlert({
      title: 'Delete',
      message: `Sei sicuro di voler eliminare il barile con ID ${id}`,
      okPressHandler: async () => {
        await deleteBarrelHandler({id});
        this.props.navigation.goBack();
      },
    });
  };

  deleteOperation = id => {
    const {operationsList} = this.state;
    this.setState({
      operationsList: _.filter(operationsList, item => item.id !== id),
    });
    try {
      deleteOperationHandler({id});
    } catch (e) {}
  };
  
  renderOperationHeader = () => {
    return (
      <View style={[styles.operationRowItem, styles.dividerStyle]}>
        <Text
          style={[
            styles.operationTitleStyle,
            {width: scale(30), fontWeight: 'bold'},
          ]}>
          #
        </Text>
        <Text
          style={[
            styles.operationInfoStyle,
            {width: '40%', fontWeight: 'bold'},
          ]}>
          Data
        </Text>
        <Text
          style={[
            styles.operationInfoStyle,
            {width: '30%', fontWeight: 'bold'},
          ]}>
          Tipo operatore
        </Text>
        <Text
          style={[
            styles.operationInfoStyle,
            {textAlign: 'right', fontWeight: 'bold'},
          ]}>
          Elimina
        </Text>
      </View>
    );
  };

  renderOperationItem = (item, index) => {
    const {id, op_type} = item || {};
    return (
      <View style={[styles.operationRowItem, styles.dividerStyle]}>
        <Text style={[styles.operationTitleStyle, {width: scale(30)}]}>
          {index}
        </Text>
        <Text style={[styles.operationInfoStyle, {width: '40%'}]}>
          {moment().format('DD MMM, YYYY')}
        </Text>
        <Text style={[styles.operationInfoStyle, {width: '30%'}]}>
          {op_type}
        </Text>
        <IconButton
          name={'delete'}
          type={ICON_TYPES.AntDesign}
          size={moderateScale(20)}
          onPress={() => this.deleteOperation(id)}
        />
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.timeStyle}>
            {moment().format('MMMM DD, YYYY')}
          </Text>
          <View style={styles.actionButtonContainer}>
            <IconButton
              name={'edit'}
              type={ICON_TYPES.Entypo}
              size={moderateScale(24)}
              color={Colors.black}
            />
            <IconButton
              name={'delete'}
              type={ICON_TYPES.AntDesign}
              size={moderateScale(24)}
              color={Colors.black}
              onPress={this.onDeleteBarrel}
            />
          </View>
          <View style={styles.dividerStyle} />
          {_.map(BARREL_DETAIL_ITEM_KEYS, item => this.renderInfoItem(item))}
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.headerTitleStyle}>Operazioni</Text>
          {this.renderOperationHeader()}
          {_.map(this.state.operationsList, (item, index) =>
            this.renderOperationItem(item, index),
          )}
        </View>
      </ScrollView>
    );
  }
}

export default BarrelDetailScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: moderateScale(14),
    paddingHorizontal: scale(10),
  },
  topContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: scale(20),
    paddingVertical: moderateScale(16),
    borderRadius: moderateScale(6),
  },
  actionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
    marginTop: moderateScale(10),
  },
  timeStyle: {
    fontSize: moderateScale(15),
  },
  //top container item
  infoItemContainer: {
    flexDirection: 'row',
    paddingVertical: moderateScale(12),
  },
  titleStyle: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    flex: 1,
  },
  infoStyle: {
    flex: 1,
    fontSize: moderateScale(17),
  },
  dividerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  //bottom container
  headerTitleStyle: {
    flex: 1,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  bottomContainer: {
    width: '100%',
    marginTop: moderateScale(10),
    backgroundColor: Colors.white,
    paddingHorizontal: scale(20),
    paddingVertical: moderateScale(16),
    borderRadius: moderateScale(6),
  },
  operationRowItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(12),
  },
  operationTitleStyle: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
  },
  operationInfoStyle: {
    fontSize: moderateScale(17),
  },
});
