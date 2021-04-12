import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const { colors } = theme;
const GlobalStyle = createGlobalStyle`
html {
    box-sizing: border-box;
}

*,
  *:before,
  *:after {
    box-sizing: inherit;
}

html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
    background:white;
    font-family: 'Lexend', sans-serif;
    color: ${colors.black},
}

h1,h2,h3,h4,h5,h6{
    font-family: 'Poppins', sans-serif;
    font-weight:600;
}
a{
    text-decoration:none;
    color:${colors.blue};
    font-weight:500;
    &:hover{
    color:${colors.darkBlue};
    }
}
.logo{
    color: ${colors.blue};
    font-weight:900;
    letter-spacing: 3px;
    font-size:35px;
    margin:0;
    position:relative;
}
.company_desc{
    color: ${colors.grey1};
    font-weight:200;
    font-size:16px;
}

`;

export default GlobalStyle;
