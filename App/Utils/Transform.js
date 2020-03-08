import * as _ from 'lodash';

const getParams = props => {
  return _.get(props, 'navigation.state.params', {});
};
