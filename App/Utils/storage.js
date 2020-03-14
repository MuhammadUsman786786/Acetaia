import {AsyncStorage} from 'react-native';

export const getAsyncStorageItem = async (key = '') => {
  if (!key) {
    return null;
  }
  const value = AsyncStorage.getItem(key);
  return value;
};

export const setStorageItem = (key, value) => {
  try {
    return AsyncStorage.setItem(key, value);
  } catch (e) {}
};

export const setUserName = async user => {
  await setStorageItem(STORAGE_KEYS.USER_NAME, user);
};

export const getUserName = async user => {
  return getAsyncStorageItem(STORAGE_KEYS.USER_NAME);
};

export const STORAGE_KEYS = {
  TOKEN: 'TOKEN',
  ID: 'ID',
  USER_ID: 'USER_ID',
};
