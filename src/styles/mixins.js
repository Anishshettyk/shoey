import { css } from 'styled-components/macro';
import theme from './theme';
import media from './media';

const { colors, navHeight, transitionTime } = theme;

const mixins = {
  flexColumn: css`
    display: flex;
    flex-direction: column;
  `,
  flexCenter: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  spaceAround: css`
    display: flex;
    justify-content: space-around;
  `,
  spaceBetween: css`
    display: flex;
    justify-content: space-between;
  `,
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
  simpleButton: css`
    padding: 15px 40px;
    background-color: ${colors.blue};
    color: ${colors.grey3};
    outline: none;
    border: none;
    text-transform: uppercase;
    border: 2px solid transparent;
    transition: ${transitionTime.t4};
    &:hover {
      border-color: ${colors.blue};
      background-color: transparent;
      color: ${colors.blue};
    }
    ${media.tablet`
    padding: 10px 30px;
    `}
  `,
  outlinedButton: css`
    padding: 15px 40px;
    background-color: transparent;
    color: ${colors.blue};
    outline: none;
    border: none;
    text-transform: uppercase;
    border: 2px solid ${colors.blue};
    transition: ${transitionTime.t4};
    &:hover {
      border-color: transparent;
      background-color: ${colors.blue};
      color: ${colors.grey3};
    }
    ${media.tablet`
    padding: 10px 30px;
    `}
  `,
};

export default mixins;
