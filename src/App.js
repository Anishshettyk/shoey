import React from 'react';
import { GlobalStyle } from './styles';
import { SignUp, Layout, Home, SignIn, BlockedRoute } from './components';
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
                <BlockedRoute component={SignUp} path="/signup" exact />
                <Route component={Home} path="/" exact />
                <BlockedRoute component={SignIn} path="/signin" exact />
              </Switch>
            </Layout>
          </Router>
        </MuiThemeProvider>
      </StylesProvider>
    </Provider>
  );
}

export default App;
