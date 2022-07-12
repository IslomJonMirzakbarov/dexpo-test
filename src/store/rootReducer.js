import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import { alertReducer } from './alert/alert.slice';
import { authReducer } from './auth/auth.slice';
import storage from 'redux-persist/lib/storage';
import { constructorTableReducer } from './constructorTable/constructorTable.slice';
import { walletReducer } from './wallet/wallet.slice';
import { popupReducer } from './popup/popup.slice';

const authPersistConfig = {
  key: 'auth',
  storage
};

const walletPersistConfig = {
  key: 'wallet',
  storage
};

const constructorTablePersistConfig = {
  key: 'constructorTable',
  storage
};

const popupPersistConfig = {
  key: 'popup',
  storage
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  wallet: persistReducer(walletPersistConfig, walletReducer),
  constructorTable: persistReducer(
    constructorTablePersistConfig,
    constructorTableReducer
  ),
  alert: alertReducer,
  popup: persistReducer(popupPersistConfig, popupReducer)
});

export default rootReducer;
