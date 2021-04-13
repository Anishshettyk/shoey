import React from 'react';
import { GlobalStyle } from './styles';
import AuthProvider from './context/AuthContext';
import { SignUp, Navbar, Home } from './components';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { theme } from './styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const { colors } = theme;

const themes = createMuiTheme({
  palette: {
    primary: {
      main: colors.blue,
    },
    secondary: {
      main: colors.red,
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={themes}>
      <Router>
        <GlobalStyle />
        <Navbar />
        <AuthProvider>
          <Switch>
            <Route component={SignUp} path="/signup" />
            <Route component={Home} path="/" />
          </Switch>
        </AuthProvider>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
