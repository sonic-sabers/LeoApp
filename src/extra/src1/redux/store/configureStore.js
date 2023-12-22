// import {createStore, combineReducers} from 'redux';
// import countReducer from '../reducer/countReducers';
// const rootReducer = combineReducers({count: countReducer});
// const configureStore = () => {
//   return createStore(rootReducer);
// };
// export default configureStore;
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import countReducer from '../reducer/countReducers';
import authReducer from '../reducer/authReducer';
const rootReducer = combineReducers({
  count: countReducer,
  auth: authReducer,
});

const configureStore = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default configureStore;
