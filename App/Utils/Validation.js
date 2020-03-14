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
  printLogs(props);
  if (
    _.isEmpty(_.toString(id)) ||
    _.isEmpty(_.toString(capacity)) ||
    _.isEmpty(wood_type) ||
    _.isEmpty(vinegar_type) ||
    _.isEmpty(_.toString(barrier_id)) ||
    _.isEmpty(_.toString(quantity)) ||
    _.isEmpty(_.toString(author))
  ) {
    showToast('All fields are required');
    return;
  }
  if (_.toNumber(quantity) > _.toNumber(capacity)) {
    showToast('Quantity cannot be greater then capacity');
    return false;
  }
  return true;
};

const firstSecondOperationValidationHandler = (
  formData,
  formId,
  barrelsList,
) => {
  const {op_type, vinegar_type, barrel_or, quantity} = formData || {};
  if (
    _.isEmpty(op_type) ||
    _.isEmpty(vinegar_type) ||
    _.isEmpty(_.toString(barrel_or)) ||
    _.isEmpty(_.toString(quantity))
  ) {
    showToast('All fields are required');
    return {isValid: false};
  }
  const prevBarrelObject = _.find(barrelsList, {id: barrel_or});
  let {capacity: maxBarrelCapacity, quantity: currentBarrelQuantity} =
    prevBarrelObject || {};

  if (formId === 0) {
    const updatedBarrelQuantity =
      _.toNumber(currentBarrelQuantity) + _.toNumber(quantity);
    if (updatedBarrelQuantity > maxBarrelCapacity) {
      showToast('Quantity cannot be greater than capacity');
      return {isValid: false};
    } else {
      return {
        isValid: true,
        params: {op_type, vinegar_type, barrel_or, quantity},
        sourceBarrelObject: {
          ...prevBarrelObject,
          quantity: updatedBarrelQuantity,
        },
      };
    }
  } else {
    const updatedBarrelQuantity =
      _.toNumber(currentBarrelQuantity) - _.toNumber(quantity);
    if (updatedBarrelQuantity < 0) {
      showToast("You can't withdraw more quantity");
      return {isValid: false};
    } else {
      return {
        isValid: true,
        params: {op_type, vinegar_type, barrel_or, quantity},
        sourceBarrelObject: {
          ...prevBarrelObject,
          quantity: updatedBarrelQuantity,
        },
      };
    }
  }
  //temporary change
};

export const thirdOperationValidationHandler = (
  formData,
  formId,
  barrelsList,
) => {
  const {op_type, vinegar_type, barrel_or, barrel_dest, quantity} =
    formData || {};
  if (
    _.isEmpty(op_type) ||
    _.isEmpty(vinegar_type) ||
    _.isEmpty(_.toString(barrel_or)) ||
    _.isEmpty(_.toString(barrel_dest)) ||
    _.isEmpty(_.toString(quantity))
  ) {
    showToast('All fields are required');
    return {isValid: false};
  }

  const formattedQuantity = _.toNumber(quantity);
  const sourceBarrelObject = _.find(barrelsList, {id: barrel_or});
  const destinationBarrelObject = _.find(barrelsList, {id: barrel_dest});

  const sourceQuantity = _.toNumber(_.get(sourceBarrelObject, 'quantity', 0));
  const destinationQuantity = _.toNumber(
    _.get(destinationBarrelObject, 'quantity', 0),
  );
  const sourceCapacity = _.toNumber(_.get(sourceBarrelObject, 'capacity', 0));
  const destinationCapacity = _.toNumber(
    _.get(destinationBarrelObject, 'capacity', 0),
  );

  if (sourceQuantity < formattedQuantity) {
    showToast('Origin dont have quantity');
    return {isValid: false};
  }
  if (destinationQuantity + formattedQuantity > destinationCapacity) {
    showToast('Destination is full');
    return {isValid: false};
  }

  return {
    isValid: true,
    params: {
      op_type,
      vinegar_type,
      barrel_or,
      barrel_dest,
      quantity,
    },
    sourceBarrelObject: {
      ...sourceBarrelObject,
      quantity: sourceQuantity - formattedQuantity,
    },
    destinationBarrelObject: {
      ...destinationBarrelObject,
      quantity: destinationQuantity + formattedQuantity,
    },
  };
};

export const forthOperationValidationHandler = (
  formData,
  formId,
  barrelsList,
) => {
  const {op_type, vinegar_type, barrel_or, quantity, mis_type, mis_value} =
    formData || {};

  printLogs({
    op_type: _.isEmpty(op_type),
    vinegar_type: _.isEmpty(vinegar_type),
    barrel_or: _.isEmpty(_.toString(barrel_or)),
    mis_type: _.isEmpty(mis_type),
    mis_value: _.isEmpty(mis_value),
    quantity: _.isEmpty(_.toString(quantity)),
  });
  printLogs({
    op_type,
    vinegar_type,
    barrel_or,
    mis_type,
    mis_value,
    quantity,
  });
  if (
    _.isEmpty(op_type) ||
    _.isEmpty(vinegar_type) ||
    _.isEmpty(_.toString(barrel_or)) ||
    _.isEmpty(mis_type) ||
    _.isEmpty(mis_value)
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
      mis_type,
      mis_value,
    },
  };
};

const fifthOperationValidationHandler = (formData, formId, barrelsList) => {
  const {op_type, vinegar_type, barrel_or, description, isLoadImage} =
    formData || {};
  if (
    _.isEmpty(op_type) ||
    _.isEmpty(vinegar_type) ||
    _.isEmpty(_.toString(barrel_or)) ||
    _.isEmpty(_.toString(description))
  ) {
    showToast('All fields are required');
    return {isValid: false};
  }
  if (!isLoadImage) {
    showToast('Image is required');
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
};

export const createOperationValidation = (
  formData,
  formId,
  rawBarrelsList = [],
) => {
  let barrelsList = [...rawBarrelsList];
  barrelsList.shift();
  if (formId === 0 || formId === 1) {
    return firstSecondOperationValidationHandler(formData, formId, barrelsList);
  } else if (formId === 2) {
    return thirdOperationValidationHandler(formData, formId, barrelsList);
  } else if (formId === 3) {
    return forthOperationValidationHandler(formData, formId, barrelsList);
  } else if (formId === 4) {
    return fifthOperationValidationHandler(formData, formId, barrelsList);
  }
  return {isValid: false};
};

export const signUpValidation = props => {
  const {username, password, confirmPassword} = props || {};
  if (
    _.isEmpty(username) ||
    _.isEmpty(password) ||
    _.isEmpty(confirmPassword)
  ) {
    showToast('All fields are required');
    return false;
  }

  if (password !== confirmPassword) {
    showToast('Passwords not matches');
    return false;
  }

  if (_.size(password) < 8) {
    showToast('Password must be greater then 8 digits');
    return false;
  }
  return true;
};
