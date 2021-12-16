import React from 'react';
import styled from 'styled-components';
import { theme, mixins, media } from '../../styles';
import hero__background from '../../images/pngs/hero__background.png';
import { Link } from 'react-router-dom';

const { colors } = theme;
const HeroSectionContainer = styled.section`
  width: 100%;
  height: 70vh;
  background: url(${hero__background}) right;
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  ${mixins.flexCenter};
  justify-content: flex-start;
  ${media.tablet`
    justify-content: center;
  `}
  &:before {
    content: '';
    background: rgba(255, 255, 255, 0.2);
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    ${media.tabletL`
    background: rgba(255, 255, 255, 0.8);
    `}
  }
  .content {
    position: relative;
    margin-left: 50px;
    ${media.tablet`
    margin-left:25px;
    `}
    h1 {
      margin: 0;
      font-size: 48px;
      font-weight: 700;
      line-height: 56px;
      color: ${colors.textColor};
      ${media.tablet`
      font-size: 40px;
    `}
    }
    h4 {
      color: ${colors.darkBlue};
    }
    .button__container {
      display: flex;
      align-items: center;
      margin-top: 50px;
      .shop__button {
        ${mixins.simpleButton}
        margin-right:30px;
        ${media.tablet`
        margin-right:15px;
        `}
      }
      .aboutus__button {
        ${mixins.outlinedButton}
      }
      ${media.tablet`
      margin-top: 40px;
    `}
    }
  }
`;

const heroSection = () => {
  return (
    <HeroSectionContainer>
      <div className="content">
        <h1>
          A central hub to
          <br /> find a perfect sole.
        </h1>
        <h4>Find best in class sneakers for men with all variants and sizes</h4>
        <div className="button__container">
          <Link to="/men" className="shop__button">
            shop now
          </Link>
          <Link to="/about" className="aboutus__button">
            about us
          </Link>
        </div>
      </div>
    </HeroSectionContainer>
  );
};

export default heroSection;
