import {
  ACCOUNT_INFO,
  SESSION_EXPIRED,
} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const accountInfo = data => {
  return {type: ACCOUNT_INFO, data: data};
};

export const sessionExpired = status => {
  return {type: SESSION_EXPIRED, data: status};
};

export const logout = () => {
  const data = {
    jwt: null,
    userEmail: null,
    userMobile: null,
    firstName: null,
  };

  return async dispatch => {
    dispatch(sessionExpired(true));
    dispatch(accountInfo(data));
    deleteDataFromStorage('userData');
  };
};

const deleteDataFromStorage = key => {
  AsyncStorage.removeItem(key);
};

