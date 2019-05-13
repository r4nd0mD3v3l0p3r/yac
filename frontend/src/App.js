import React from 'react'
import './App.css'
import configureStore from './configureStore'
import { Provider } from 'react-redux'

const store = configureStore()

function App() {

  return (
    <Provider store={store}>

    </Provider>
  )
}

export default App;
