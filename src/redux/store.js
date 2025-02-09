import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import reduxStorage from './Storage';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist"
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whieList: ['game'],
};

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
        reducer:persistedReducer,
        middleware: getDefaultMiddleware => 
            getDefaultMiddleware({
                serializableCheck:{
                    ignoreActions:[FLUSH,REGISTER,REHYDRATE,PAUSE,PURGE,PERSIST]
                }
            })
})

export const persistor = persistStore(store)