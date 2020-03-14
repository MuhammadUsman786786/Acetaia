import * as _ from 'lodash';

export const getParams = props => {
  return _.get(props, 'route.params', {});
};

export const filterByKey = (dataList, filterKey, filterValue) => {
  return _.filter(dataList, item => item[filterKey] !== filterValue);
};

export const isBarrelDeleteable = (creatorId, barrelList, currentUserId) => {
  const formattedCreatorId = _.toString(creatorId);
  const formattedCurrentUserId = _.toString(currentUserId);
  if (formattedCreatorId !== formattedCurrentUserId) {
    return false;
  }
  let isDeleteAble = true;
  _.forEach(barrelList, barrelItem => {
    if (_.toString(barrelItem.author) !== formattedCurrentUserId) {
      isDeleteAble = false;
    }
  });
  return isDeleteAble;
};
