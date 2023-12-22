import apiService from './apiService';
import queryService from './queryService';
import {Alert, Platform} from 'react-native';
import errorService from './errorService';
import axios from 'axios';
var fetchService = {
  login: async function (email, password) {
    let API = apiService.login;
    try {
      let params = {
        email,
        password,
        FCMToken,
      };
      //  console.log('login', params,API);
      let queryParams = queryService.preareQueryParams(params);
      // console.log(queryParams);
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: queryParams,
      });

      const resData = await response.text();
      //   console.log('res', resData);
      if (!resData.success) {
        // alert(resData.message);
      }
      if (!resData.success) {
        const message = resData.msg;
        const errorRes = {
          status: false,
          data: message,
          code: resData.success,
          msg: message,
        };
      }
      return {status: true, data: resData.data};
    } catch (e) {
      var res = errorService.checkErrors(e);
      if (
        res &&
        typeof res === 'object' &&
        res.constructor === Object &&
        res.hasOwnProperty('status')
      ) {
        return res;
      }
      throw e;
    }
  },

  login2: async function (username, password) {
    // const {username, password} = values;
    const params = {
      username,
      password,
    };
    const parsedparams = JSON.stringify(params);
    const API = apiService.login;
    const tempprops = {
      username: 'aashish',
      password: 'aashish',
    };
    // console.log('parsedparams', API, params, tempprops);
    try {
      const response = await axios.post(API, params);
      let newdata = response.data;
      const resData = await newdata;
      if (response?.status === 201 || response?.status === 200) {
        return {status: true, data: resData};
      } else {
        console.log('newdata', newdata?.response?.data);
        return {status: false, data: 'An error has occurred'};
      }
    } catch (error) {
      const mainError = error?.response?.data?.detail;
      if (error.response) {
        // client received an error response (5xx, 4xx)
        // alert('An error has occurred');
        return {status: false, data: mainError};
      } else if (error.request) {
        // alert('An error has occurred with connection');
        return {status: false, data: 'An error has occurred with connection'};
        // client never received a response, or request never left
      } else {
        return {
          status: false,
          data: 'An error has occurred while logging in ,Please try again after some time',
        };
      }
    }
  },
  getProfile: async function (token) {
    const API = apiService.currentuser;

    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    let params = null;
    // console.log('parsedparams', API, token);
    try {
      const response = await axios.get(API, config);
      let newdata = response.data;
      console.log('user response', response);
      const resData = await newdata;
      if (response?.status === 201 || response?.status === 200) {
        return {status: true, data: resData};
      } else {
        console.log('newdata', newdata?.response?.data);
        return {status: false, data: 'An error has occurred'};
      }
    } catch (error) {
      const mainError = error?.response?.data?.detail;
      if (error.response) {
        // client received an error response (5xx, 4xx)
        // alert('An error has occurred');
        return {status: false, data: mainError};
      } else if (error.request) {
        // alert('An error has occurred with connection');
        return {status: false, data: 'An error has occurred with connection'};
        // client never received a response, or request never left
      } else {
        return {
          status: false,
          data: 'An error has occurred while logging in ,Please try again after some time',
        };
      }
    }
  },

  register: async function (
    FirstName,
    UserName,
    LastName,
    EmailId,
    PWord,
    ProfileImage,
    CountryCode,
    ContactNumber,
    ZipCode,
    Gender,
  ) {
    let API = apiService.register;
    try {
      let params = {
        FirstName,
        UserName,
        LastName,
        EmailId,
        PWord,
        ProfileImage,
        CountryCode,
        ContactNumber,
        ZipCode,
        Gender,
      };
      let queryParams = queryService.preareQueryParams(params);
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: queryParams,
      });
      const resData = await response.json();
      if (!resData.success) {
        // alert(resData.message);
      }
      if (!resData.success) {
        const message = resData.msg;
        const errorRes = {
          status: false,
          data: message,
          code: resData.success,
          msg: message,
        };
      }
      return {status: true, data: resData.data};
    } catch (e) {
      var res = errorService.checkErrors(e);

      if (
        res &&
        typeof res === 'object' &&
        res.constructor === Object &&
        res.hasOwnProperty('status')
      ) {
        return res;
      }
      throw e;
    }
  },
};

export default fetchService;
