import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import IconButton from '../Components/IconButton';
import {BARREL_DETAIL_ITEM_KEYS, ICON_TYPES} from '../Utilities/Constants';
import {moderateScale, scale} from 'react-native-size-matters';
import {getParams} from '../Utils/Transform';
import {deleteBarrelHandler, fetchBarrelHandler} from '../Services/ApiCaller';
import {showAlert} from '../Utils/UiUtils';
import {Colors} from '../Theme';
import moment from 'moment';
import * as _ from 'lodash';

class BarrelDetailScreen extends Component {
  constructor(props) {
    super(props);
    const {id} = getParams(props);
    this.state = {
      id: id,
    };
  }

  componentDidMount() {
    this.fetchBarrelHandler();
  }

  fetchBarrelHandler = async () => {
    try {
      const barrelInfo = await fetchBarrelHandler({id: this.state.id});
      this.setState({...barrelInfo});
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
    fontSize: moderateScale(17),
    flex: 1,
  },
  dividerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
});
