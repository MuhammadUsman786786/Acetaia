import {
  createBarrel,
  createBattery, createOperation, deleteBarrel,
  deleteBattery,
  getBarrel,
  getBarrels,
  getBatteries,
} from './Api';
import * as _ from 'lodash';
import {showToast} from '../Utils/UiUtils';

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
