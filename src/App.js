import React from 'react';
import { GlobalStyle } from './styles';
import { SignUp, Layout, Home, SignIn, BlockedRoute, UserRoute, Profile, ResetPassword, MainCategory } from './components';
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
                <BlockedRoute component={SignIn} path="/signin" exact />
                <BlockedRoute component={ResetPassword} path="/reset-password" exact />
                <Route component={Home} path="/" exact />
                <Route component={MainCategory} exact={true} path={['/men', '/women', '/kids']} />
                <UserRoute component={Profile} path="/profile" exact />
              </Switch>
            </Layout>
          </Router>
        </MuiThemeProvider>
      </StylesProvider>
    </Provider>
  );
}

export default App;
