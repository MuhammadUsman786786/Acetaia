import React, {useState} from 'react';
import moment from 'moment';
import IconButton from './IconButton';
import {ICON_TYPES} from '../Utilities/Constants';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import * as _ from 'lodash';

const CollapseableItem = (props = {}) => {
  const {title, value, isDivider} = props || {};
  return (
    <View style={[styles.infoItemContainer, isDivider && styles.dividerStyle]}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={styles.infoStyle}>{value}</Text>
    </View>
  );
};
const OperationListItem = props => {
  const {index, currentUserId, item} = props || {};
  const {onPress} = props || {};
  const {
    date,
    id,
    op_type,
    vinegar_type,
    barrel_or,
    barrel_dest,
    operator,
    description,
    mis_type,
    mis_value,
  } = item || {};
  const [isCollapsable, setCollapseAble] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={[styles.operationRowItem, styles.dividerStyle]}
        onPress={() => setCollapseAble(!isCollapsable)}>
        <Text style={[styles.operationTitleStyle, {width: scale(30)}]}>
          {index}
        </Text>
        <Text style={[styles.operationInfoStyle, {width: '40%'}]}>
          {moment(date).format('DD MMM, YYYY')}
        </Text>
        <Text style={[styles.operationInfoStyle, {width: '30%'}]}>
          {op_type}
        </Text>
        {_.toString(operator) === currentUserId && (
          <IconButton
            name={'delete'}
            type={ICON_TYPES.AntDesign}
            size={moderateScale(20)}
            onPress={() => onPress(id)}
          />
        )}
      </TouchableOpacity>
      {isCollapsable && (
        <View style={styles.collapseableContainer}>
          {!_.isEmpty(op_type) && (
            <CollapseableItem title={'Op Type'} value={op_type} isDivider />
          )}
          {!_.isEmpty(vinegar_type) && (
            <CollapseableItem
              title={'Vinegar Type'}
              value={'vinegar_type'}
              isDivider
            />
          )}
          {!_.isEmpty(_.toString(barrel_or)) && (
            <CollapseableItem
              title={'Barrel Of Origin'}
              value={barrel_or}
              isDivider
            />
          )}
          {!_.isEmpty(_.toString(barrel_dest)) && (
            <CollapseableItem
              title={'Barrel Of Destination'}
              value={barrel_dest}
              isDivider
            />
          )}
          {!_.isEmpty(_.toString(operator)) && (
            <CollapseableItem title={'Operator'} value={operator} isDivider />
          )}
          {!_.isEmpty(description) && (
            <CollapseableItem
              title={'Description'}
              value={description}
              isDivider
            />
          )}
          {!_.isEmpty(mis_type) && (
            <CollapseableItem
              title={'Measurement Type'}
              value={mis_type}
              isDivider
            />
          )}
          {!_.isEmpty(_.toString(mis_value)) && (
            <CollapseableItem
              title={'Measurement Value'}
              value={mis_value}
              isDivider
            />
          )}
        </View>
      )}
    </View>
  );
};

export default OperationListItem;

OperationListItem.propTypes = {};

OperationListItem.defaultProps = {};

const styles = StyleSheet.create({
  operationRowItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(12),
  },
  dividerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  operationTitleStyle: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
  },
  operationInfoStyle: {
    fontSize: moderateScale(17),
  },
  collapseableContainer: {
    backgroundColor: 'lightgrey',
    paddingHorizontal: scale(10),
  },
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
});
