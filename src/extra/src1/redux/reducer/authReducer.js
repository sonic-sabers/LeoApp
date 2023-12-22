// import { CUSTOMER_TYPE, UPDATE_CUSTOMER_DATA, UPDATE_SPLASH_SCREEN, UPDATE_ADMIN_INFO, SESSION_EXPIRED } from '../actions/auth';

import { SESSION_EXPIRED, UPDATE_CUSTOMER_DATA, UPDATE_CUSTOMER_TOKEN } from '../constants';

// import { UPDATE_CUSTOMER_DATA } from "../constants";

const initialState = {
  jwt: '',
  jwtRefresh: '',
  currentStatus: '',
  userMobile: null,
  userEmail: null,
  isVerified: '',
  firstName: '',
  lastName: '',
  gender: '',
  dematNo: '',
  userDob: '',
  active: '',
};


const initialDetails = {
  department: '',
  designation: '',
  email_address: '',
  employee_id: '',
  first_name: '',
  is_admin: false,
  last_name: '',
  mobile_number: '',
  school: '',
};
const authReducer = (state = initialDetails, action) => {
  switch (action.type) {
    case UPDATE_CUSTOMER_DATA:
      return {
        ...state,
        department: action.data.firstName,
        designation: action.data.firstName,
        email_address: action.data.firstName,
        employee_id: action.data.firstName,
        first_name: action.data.firstName,
        is_admin: false,
        last_name: action.data.firstName,
        mobile_number: action.data.firstName,
        school: action.data.firstName,
        sessionExpired: action.data.sessionExpired ? true : false,
      };
    case UPDATE_CUSTOMER_TOKEN:
      return {
        ...state,
        refresh: action.data.refresh,
        access: action.data.access,
        user: action.data.user,
        id: action.data.id,
        sessionExpired: action.data.sessionExpired ? true : false,
      };

    case SESSION_EXPIRED:
      return {
        ...state,
        sessionExpired: action.data,
      };

    default:
      return state;
  }
};
export default authReducer;