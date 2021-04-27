import React from 'react';
import { GlobalStyle } from './styles';
import { SignUp, Layout, Home, SignIn, PrivateRoute } from './components';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { MuiThemes } from './styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={MuiThemes}>
          <Router>
            <GlobalStyle />
            <Layout>
              <Switch>
                <PrivateRoute component={SignUp} path="/signup" />
                <Route component={Home} path="/" exact />
                <PrivateRoute component={SignIn} path="/signin" />
              </Switch>
            </Layout>
          </Router>
        </MuiThemeProvider>
      </StylesProvider>
    </Provider>
  );
}

export default App;
