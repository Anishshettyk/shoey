import React from 'react';
import { GlobalStyle } from './styles';
import AuthProvider from './context/AuthContext';
import { SignUp, Navbar, Home, SignIn } from './components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiThemes } from './styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={MuiThemes}>
        <Router>
          <GlobalStyle />
          <Navbar />
          <AuthProvider>
            <Switch>
              <Route component={SignUp} path="/signup" />
              <Route component={Home} path="/" exact />
              <Route component={SignIn} path="/signin" />
            </Switch>
          </AuthProvider>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
