import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Colors} from '../Theme';
import {moderateScale, scale} from 'react-native-size-matters';
import IconButton from './IconButton';
import {ICON_TYPES} from '../Utilities/Constants';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import moment from 'moment';
import {withNavigation} from '@react-navigation/compat';
import {printLogs} from '../Config/ReactotronConfig';
import {isBarrelDeleteable} from '../Utils/Transform';

const BarrelsList = withNavigation(props => {
  const {barrelsList = []} = props || {};
  return _.map(barrelsList, barrelItem => {
    const {id, barrier_id, date_posted} = barrelItem || {};
    return (
      <TouchableOpacity
        style={styles.barrelItemContainer}
        onPress={() => props.navigation.navigate('BarrelDetailScreen', {id})}>
        <Image
          source={require('../Images/barile.jpg')}
          style={styles.imageStyle}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.barrelItemTimeStyle}>
            {moment(date_posted).format('MMMM DD, YYYY')}
          </Text>
          <Text style={styles.barrelItemTitleStyle}>Id del Barile:{id}</Text>
          <Text style={styles.barrelItemTitleStyle}>
            Id Batteria:{barrier_id}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });
});

const BatteryItem = props => {
  const {id, user, currentUserId, barrelsList = []} = props || {};
  const isBarrelDelete = isBarrelDeleteable(user, barrelsList, currentUserId);
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.titleStyle}>Batteria ID: {id}</Text>
        {isBarrelDelete && (
          <IconButton
            name={'delete'}
            type={ICON_TYPES.AntDesign}
            size={moderateScale(20)}
            onPress={() => props.deleteHandler({id: id})}
          />
        )}
      </View>
      {!_.isEmpty(barrelsList) && <BarrelsList {...props} />}
    </View>
  );
};

export default BatteryItem;

BatteryItem.propTypes = {
  title: PropTypes.string,
  deleteHandler: PropTypes.func,
};

BatteryItem.defaultProps = {
  title: '',
  deleteHandler: () => {},
};

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(10),
    backgroundColor: Colors.white,
    paddingHorizontal: scale(10),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(6),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: moderateScale(15),
    color: Colors.black,
  },
  //barrels
  barrelItemContainer: {
    borderTopWidth: 1,
    flexDirection: 'row',
    borderTopColor: 'rgba(0,0,0,0.1)',
    marginTop: moderateScale(5),
    paddingTop: moderateScale(10),
  },
  imageStyle: {
    width: moderateScale(60),
    height: moderateScale(60),
    resizeMode: 'contain',
  },
  rightContainer: {
    flex: 1,
    paddingLeft: scale(12),
  },
  dividerStyle: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  barrelItemTimeStyle: {
    fontSize: moderateScale(15),
    paddingBottom: moderateScale(4),
  },
  barrelItemTitleStyle: {
    fontWeight: 'bold',
    fontSize: moderateScale(17),
    paddingVertical: moderateScale(4),
  },
});
