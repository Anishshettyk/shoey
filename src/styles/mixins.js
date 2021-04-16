import { css } from 'styled-components/macro';
import theme from './theme';

const { colors, navHeight } = theme;

const mixins = {
  visibleLayout: css`
    width: 100%;
    height: calc(100vh - ${navHeight});
    margin-top: ${navHeight};
  `,
  divider: css`
    margin: 30px 0px 0px 0px;
    text-align: center;
    position: relative;
    overflow: hidden;
    &:before {
      position: absolute;
      width: 35%;
      height: 2px;
      top: 50%;
      left: 60%;
      background-color: ${colors.grey1};
      content: '';
    }
    &:after {
      position: absolute;
      width: 35%;
      height: 2px;
      top: 50%;
      right: 60%;
      background-color: ${colors.grey1};
      content: '';
    }
  `,
};

export default mixins;
