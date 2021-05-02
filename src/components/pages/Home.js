import React from 'react';
import styled from 'styled-components';
import hero__background from '../../images/pngs/hero__background.png';
import { theme, mixins, media } from '../../styles';

const { colors } = theme;
const HeroSection = styled.section`
  width: 100%;
  height: 70vh;
  background: url(${hero__background}) right;
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &:before {
    content: '';
    background: rgba(255, 255, 255, 0.2);
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    ${media.tabletL`
    background: rgba(255, 255, 255, 0.5);
    `}
  }
  .content {
    position: relative;
    margin-left: 50px;
    h1 {
      margin: 0;
      font-size: 48px;
      font-weight: 700;
      line-height: 56px;
      color: ${colors.textColor};
      span {
        color: ${colors.blue};
      }
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
      }
      .aboutus__button {
        ${mixins.outlinedButton}
      }
    }
  }
`;

const CategoryContainer = styled.section`
  margin: 0px 30px;
  h1 {
    font-size: 30px;
    position: relative;
    z-index: 1;
    &:before {
      position: absolute;
      height: 3px;
      width: 50%;
      left: 20px;
      top: 100%;
      content: '';
      opacity: 0.4;
      background-color: red;
      z-index: -1;
      border-radius: 10px;
    }
  }
`;

const Home = () => {
  return (
    <div>
      <HeroSection>
        <div className="content">
          <h1>
            A central hub to
            <br /> find a perfect sole.
          </h1>
          <h4>Find best in class sneakers for men with all variants and sizes</h4>
          <div className="button__container">
            <button className="shop__button">shop now</button>
            <button className="aboutus__button">about us</button>
          </div>
        </div>
      </HeroSection>
      <CategoryContainer>{/* <h1>Categories</h1> */}</CategoryContainer>
    </div>
  );
};

export default Home;
