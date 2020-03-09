import * as _ from 'lodash';

export const getParams = props => {
  return _.get(props, 'route.params', {});
};

export const filterByKey = (dataList, filterKey, filterValue) => {
  return _.filter(dataList, item => item[filterKey] !== filterValue);
};
