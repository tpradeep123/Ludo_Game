import { View, Text } from 'react-native'
import React from 'react'
import LudoBoardScreen from './src/screens/LudoBoardScreen'
import {Provider} from "react-redux"
import { persistor, store } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Navigation from './src/navigaion/Navigation'
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation/>
        </PersistGate>
    </Provider>
  )
}

export default App