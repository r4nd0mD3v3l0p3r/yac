import React from 'react'
import './App.css'
import store from './store'
import { CookiesProvider } from 'react-cookie'
import { Route, Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Switch } from 'react-router'
import history from './components/History'
import Home from './components/Home'
import Login from './components/Login'
import { BrowserRouter } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  typography: {
    useNextVariants: true,
  }
})

function App() {
  return (
    <BrowserRouter basename='/'>
      <MuiThemeProvider theme={theme}>
        <CookiesProvider>
          <Provider store={store}>
            <Router history={history}>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </Router>
          </Provider>
        </CookiesProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  )
}

export default App;
