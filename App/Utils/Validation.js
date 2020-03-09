import * as _ from 'lodash';
import {showToast} from './UiUtils';
import {printLogs} from '../Config/ReactotronConfig';

export const createBarrelIdValidation = props => {
  const {barrelId1} = props || {};
  if (_.isEmpty(barrelId1)) {
    showToast('All fields are required');
    return false;
  }
  return true;
};

export const createBarrelValidation = props => {
  const {id, capacity, wood_type, vinegar_type, barrier_id, quantity, author} =
    props || {};
  if (
    _.isEmpty(id) ||
    _.isEmpty(capacity) ||
    _.isEmpty(wood_type) ||
    _.isEmpty(vinegar_type) ||
    _.isEmpty(barrier_id) ||
    _.isEmpty(quantity) ||
    _.isEmpty(author)
  ) {
    showToast('All fields are required');
    return;
  }
  return true;
};

export const createOperationValidation = (formData, formId) => {
  const {
    op_type,
    vinegar_type,
    barrel_or,
    barrel_dest,
    operator,
    quantity,
    measure_type,
    measured_value,
    description,
  } = formData || {};

  printLogs(formData)
  printLogs(formId)
  if (formId === 0 || formId === 1) {
    if (
      _.isEmpty(op_type) ||
      _.isEmpty(vinegar_type) ||
      _.isEmpty(_.toString(barrel_or)) ||
      _.isEmpty(operator) ||
      _.isEmpty(_.toString(quantity))
    ) {
      showToast('All fields are required');
      return {isValid: false};
    }
    return {
      isValid: true,
      params: {op_type, vinegar_type, barrel_or, operator, quantity},
    };
  } else if (formId === 2) {
    if (
      _.isEmpty(op_type) ||
      _.isEmpty(vinegar_type) ||
      _.isEmpty(_.toString(barrel_or)) ||
      _.isEmpty(_.toString(barrel_dest)) ||
      _.isEmpty(operator) ||
      _.isEmpty(_.toString(quantity))
    ) {
      showToast('All fields are required');
      return {isValid: false};
    }
    return {
      isValid: true,
      params: {
        op_type,
        vinegar_type,
        barrel_or,
        barrel_dest,
        operator,
        quantity,
      },
    };
  } else if (formId === 3) {
    if (
      _.isEmpty(op_type) ||
      _.isEmpty(vinegar_type) ||
      _.isEmpty(_.toString(barrel_or)) ||
      _.isEmpty(operator) ||
      _.isEmpty(measure_type) ||
      _.isEmpty(measured_value) ||
      _.isEmpty(_.toString(quantity))
    ) {
      showToast('All fields are required');
      return {isValid: false};
    }
    return {
      isValid: true,
      params: {
        op_type,
        vinegar_type,
        barrel_or,
        operator,
        quantity,
        measure_type,
        measured_value,
      },
    };
  } else if (formId === 4) {
    if (
      _.isEmpty(op_type) ||
      _.isEmpty(vinegar_type) ||
      _.isEmpty(_.toString(barrel_or)) ||
      _.isEmpty(_.toString(description))
    ) {
      showToast('All fields are required');
      return {isValid: false};
    }
    return {
      isValid: true,
      params: {
        op_type,
        vinegar_type,
        barrel_or,
        description,
      },
    };
  }
  return {isValid: false};
};
