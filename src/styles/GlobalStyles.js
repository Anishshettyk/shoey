import { createGlobalStyle } from 'styled-components';
import theme from './theme';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
.error_message{
    color: ${colors.red};
}
.company__info {
    position: absolute;
    top: 5%;
    left: 10%;
    img {
      max-width: 130px;
    }
    p {
      margin: 0;
      color: ${colors.grey2}
    }
}
.auth__message{
    text-transform: uppercase;
    color: ${colors.grey2};
    font-weight: bold;
}
.auth__heading {
    color: ${colors.textColor};
    font-weight: bold;
    font-size: 40px;
    margin: 0;
}
.fixed__navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin:-2px 0px;
  }
.slim__heading{
    margin:0;
}

`;

export default GlobalStyle;
