
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import authReducer from '../reducer/authReducer';
const rootReducer = combineReducers({
  auth: authReducer,
});

const configureStore = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default configureStore;
