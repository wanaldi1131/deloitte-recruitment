import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import rootReducer from "../reducers/reducers";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const persistConfig = {key: "INVOICE", storage};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const storeApp = () => {
	const store = createStore(
		persistedReducer,
		composeWithDevTools(applyMiddleware(thunk))
	);
	const persist = persistStore(store);

	return {store, persist};
};

export default storeApp;
