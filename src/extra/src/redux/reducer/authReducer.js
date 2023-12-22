import { SESSION_EXPIRED, UPDATE_CUSTOMER_DATA, UPDATE_CUSTOMER_TOKEN } from '../constants';

const initialDetails = {
  email: '',
  familyName: '',
  givenName: '',
  id: '',
  name: '',
};

const authReducer = (state = initialDetails, action) => {
  switch (action.type) {
    case UPDATE_CUSTOMER_DATA:
      return {
        ...state,
        email: action.data.email,
        familyName: action.data.familyName,
        givenName: action.data.givenName,
        id: action.data.id,
        photo: action.data.photo,
        name: action.data.name,
      };
    case UPDATE_CUSTOMER_TOKEN:
      return {
        ...state,
        access: action.data.access,
        user: action.data.user,
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