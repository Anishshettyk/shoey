import { createMuiTheme } from '@material-ui/core';
import { theme } from './index';

const { colors } = theme;

const MuiThemes = createMuiTheme({
  palette: {
    primary: {
      main: colors.blue,
    },
    secondary: {
      main: colors.red,
    },
  },
});

export default MuiThemes;
