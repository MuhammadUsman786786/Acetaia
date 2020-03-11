import {
  createBarrel,
  createBattery,
  createOperation,
  deleteBarrel,
  deleteBattery,
  deleteOperation,
  editBarrel,
  getBarrel,
  getBarrels,
  getBatteries,
  getOperations,
} from './Api';
import * as _ from 'lodash';
import {showToast} from '../Utils/UiUtils';
import {printLogs} from '../Config/ReactotronConfig';

// batteries
export const fetchBatteriesHandler = () =>
  new Promise(function(resolve, reject) {
    getBatteries()
      .then(response => {
        const {data = []} = response || {};
        resolve(data || []);
      })
      .catch(() => {
        reject();
      });
  });

export const deleteBatteryHandler = data =>
  new Promise(function(resolve, reject) {
    deleteBattery(data)
      .then(response => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });

export const createBatteryHandler = data =>
  new Promise(function(resolve, reject) {
    createBattery(data)
      .then(response => {
        showToast('Created Successfully');
        resolve();
      })
      .catch(error => {
        showErrorMessage(error);
        reject();
      });
  });

//barrels
export const createBarrelHandler = data =>
  new Promise(function(resolve, reject) {
    createBarrel(data)
      .then(response => {
        showToast('Created Successfully');
        resolve();
      })
      .catch(error => {
        showErrorMessage(error);
        reject();
      });
  });

export const editBarrelHandler = (
  data,
  oldId,
  message = 'Edited Successfully',
) =>
  new Promise(function(resolve, reject) {
    editBarrel(data, oldId)
      .then(response => {
        if (!_.isEmpty(message)) {
          showToast(message);
        }
        resolve();
      })
      .catch(error => {
        showErrorMessage(error);
        reject();
      });
  });

export const fetchBarrelsHandler = () =>
  new Promise(function(resolve, reject) {
    getBarrels()
      .then(response => {
        const {data = []} = response || {};
        resolve(data || []);
      })
      .catch(() => {
        reject();
      });
  });

export const fetchBarrelHandler = params =>
  new Promise(function(resolve, reject) {
    getBarrel(params)
      .then(response => {
        const {data = []} = response || {};
        resolve(data || []);
      })
      .catch(() => {
        reject();
      });
  });

export const deleteBarrelHandler = params =>
  new Promise(function(resolve, reject) {
    deleteBarrel(params)
      .then(response => {
        const {data = []} = response || {};
        resolve(data || []);
      })
      .catch(() => {
        reject();
      });
  });

//operations
export const createOperationHandler = data =>
  new Promise(function(resolve, reject) {
    createOperation(data)
      .then(response => {
        showToast('Created Successfully');
        resolve();
      })
      .catch(error => {
        showErrorMessage(error);
        reject();
      });
  });

export const fetchOperationsHandler = data =>
  new Promise(function(resolve, reject) {
    getOperations()
      .then(response => {
        const {data = []} = response || {};
        resolve(data || []);
      })
      .catch(error => {
        showErrorMessage(error);
        reject();
      });
  });

export const deleteOperationHandler = data =>
  new Promise(function(resolve, reject) {
    deleteOperation(data)
      .then(response => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });

//error handler
const showErrorMessage = errorObj => {
  const {message} = errorObj || {};
  if (message === 'Network Error') {
    showToast('Network error is found');
    return;
  }
  const {response: {data = []} = {}} = errorObj || {};
  const errorKeys = _.keys(data);
  const errorMessage = _.get(data, `${errorKeys[0]}[0]`);

  if (!_.isEmpty(errorMessage)) {
    showToast(errorMessage);
  }
};
