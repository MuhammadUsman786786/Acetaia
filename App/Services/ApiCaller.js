import {
  BASE_URL,
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
  login,
  setAuthToken,
  signUp,
} from './Api';
import * as _ from 'lodash';
import {showToast} from '../Utils/UiUtils';
import {
  getAsyncStorageItem,
  setStorageItem,
  STORAGE_KEYS,
} from '../Utils/storage';
import {NavigationService} from './NavigatorServices';

//user
export const loginHandler = data =>
  new Promise(async (resolve, reject) => {
    try {
      const apiResponse = await login(data);
      const {data: responseData = {}} = apiResponse || {};
      const {token, user} = responseData || {};
      if (_.isEmpty(token)) {
        showToast('Error is found');
        reject();
      }
      setAuthToken(token);
      await setStorageItem(STORAGE_KEYS.TOKEN, token);
      await setStorageItem(STORAGE_KEYS.USER_ID, _.toString(user));
      NavigationService.resetAndNavigate('Acetaia');
      resolve();
    } catch (error) {
      showErrorMessage(error);
      reject(error);
    }
  });

export const logoutHandler = data =>
  new Promise(async (resolve, reject) => {
    try {
      setAuthToken('');
      await setStorageItem(STORAGE_KEYS.TOKEN, '');
      await setStorageItem(STORAGE_KEYS.USER_ID, '');
      NavigationService.resetAndNavigate('SignInScreen');
      resolve();
    } catch (error) {
      showErrorMessage(error);
    }
  });

export const signUpHandler = data =>
  new Promise(async (resolve, reject) => {
    try {
      const apiResponse = await signUp(data);
      const {data: responseData = {}} = apiResponse || {};
      showToast('Signup Successfully');
      NavigationService.goBack();
      resolve();
    } catch (error) {
      showErrorMessage(error);
      reject(error);
    }
  });

// batteries
export const fetchBatteriesHandler = () =>
  new Promise(function(resolve, reject) {
    getBatteries()
      .then(response => {
        const {data = []} = response || {};
        resolve(data || []);
      })
      .catch(error => {
        showErrorMessage(error);
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
  new Promise(async function(resolve, reject) {
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
  new Promise(async function(resolve, reject) {
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
      .catch(error => {
        showErrorMessage(error);
        reject();
      });
  });

export const fetchBarrelHandler = params =>
  new Promise(async function(resolve, reject) {
    // eslint-disable-next-line no-undef
    const myHeaders = new Headers();
    const token = await getAsyncStorageItem(STORAGE_KEYS.TOKEN);
    myHeaders.append('Authorization', `token ${token}`);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(`${BASE_URL}/barili/api/${params.id}/`, requestOptions)
      .then(resp => resp.json())
      .then(response => {
        resolve(response);
      })
      .then(result => reject());
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
const showErrorMessage = async errorObj => {
  const {message} = errorObj || {};
  if (message === 'Network Error') {
    showToast('Network error is found');
    return;
  }
  const {response: {data = [], status} = {}} = errorObj || {};
  if (status === '401' || status === 401 || status === 403) {
    NavigationService.resetAndNavigate('SignInScreen');
    await setStorageItem(STORAGE_KEYS.TOKEN, '');
    await setStorageItem(STORAGE_KEYS.USER_ID, '');
  }
  if (_.isObject(data)) {
    const errorMessage = _.get(data, 'detail', '');
    if (_.isString(errorMessage) && !_.isEmpty(errorMessage)) {
      showToast(errorMessage);
      return;
    }
  }
  const errorKeys = _.keys(data);
  const errorMessage = _.get(data, `${errorKeys[0]}[0]`);

  if (!_.isEmpty(errorMessage)) {
    showToast(errorMessage);
  }
};
