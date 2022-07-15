import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import { alertReducer } from './alert/alert.slice';
import { authReducer } from './auth/auth.slice';
import storage from 'redux-persist/lib/storage';
import { constructorTableReducer } from './constructorTable/constructorTable.slice';
import { walletReducer } from './wallet/wallet.slice';
import { popupReducer } from './popup/popup.slice';
import { nftReducer } from "./nft/nft.slice";
import { artistReducer } from "./artist/artist.slice";
import { collectionReducer } from './collection/collection.slice';

const authPersistConfig = {
  key: "auth",
  storage,
};

const walletPersistConfig = {
  key: "wallet",
  storage,
};

const constructorTablePersistConfig = {
  key: "constructorTable",
  storage,
};

const nftPersistConfig = {
  key: "nft",
  storage,
};

const artistPersistConfig = {
  key: "artist",
  storage,
};

const collectionPersistConfig = {
  key: "collection",
  storage,
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
  popup: persistReducer(popupPersistConfig, popupReducer),
  nft: persistReducer(nftPersistConfig, nftReducer),
  artist: persistReducer(artistPersistConfig, artistReducer),
  collection: persistReducer(collectionPersistConfig, collectionReducer),
  alert: alertReducer
});

export default rootReducer;
