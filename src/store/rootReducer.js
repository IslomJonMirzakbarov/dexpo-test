import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import { alertReducer } from "./alert/alert.slice";
import { authReducer } from "./auth/auth.slice";
import storage from "redux-persist/lib/storage";
import { constructorTableReducer } from "./constructorTable/constructorTable.slice";
import { walletReducer } from "./wallet/wallet.slice";
import { nftReducer } from "./nft/nft.slice";
import { artistReducer } from "./artist/artist.slice";

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

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  wallet: persistReducer(walletPersistConfig, walletReducer),
  constructorTable: persistReducer(
    constructorTablePersistConfig,
    constructorTableReducer
  ),
  nft: persistReducer(nftPersistConfig, nftReducer),
  artist: persistReducer(artistPersistConfig, artistReducer),
  alert: alertReducer,
});

export default rootReducer;
