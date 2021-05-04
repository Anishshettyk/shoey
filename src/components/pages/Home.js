import React from 'react';
import styled from 'styled-components';
import hero__background from '../../images/pngs/hero__background.png';
import { theme, mixins, media } from '../../styles';
import { Link } from 'react-router-dom';
import { category } from '../../utils';

const { colors } = theme;
const HeroSection = styled.section`
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

const CategoryContainer = styled.section`
  min-height: 35vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0px 80px 20px;
  grid-gap: 35px;
  .cat__item {
    position: relative;
    margin-bottom: 20px;

    .cat__image {
      overflow: hidden;
      position: relative;
      z-index: 0;
      width: 100%;
      height: 100%;

      &:before {
        position: absolute;
        width: 100%;
        height: 40%;
        bottom: 0;
        content: '';
        z-index: 1;
        background: linear-gradient(to bottom, rgba(41, 38, 33, 0.1) 0%, ${colors.black} 70%);
      }
      img {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        transition: all 0.4s ease-out 0s;
      }
    }

    .cat__details {
      transition: all 0.4s ease-out 0s;
      position: absolute;
      left: 50%;
      top: 80%;
      text-align: center;
      transform: translate(-50%, -50%);
      h4 {
        color: ${colors.white};
        font-weight: 700;
        letter-spacing: 1px;
        font-size: 25px;
        text-transform: uppercase;
        padding: 5px 20px;
        border: 2px solid ${colors.white};
      }
      span {
        color: ${colors.white};
        font-weight: 900;
        border-bottom: 4px solid ${colors.blue};
        opacity: 0;
        visibility: hidden;
        text-transform: uppercase;
      }
    }
    &:hover {
      .cat__image {
        img {
          transform: scale(1.08);
        }
      }
      .cat__details {
        top: 60%;
        span {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
  ${media.tabletL`
  grid-template-columns: repeat(2, 1fr);
  margin: 0px 40px 20px;
  `}
  ${media.tablet`
  grid-template-columns: repeat(1, 1fr);
  margin: 0px 20px 20px;
  `}
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
            <Link to="/mens" className="shop__button">
              shop now
            </Link>
            <Link to="/about" className="aboutus__button">
              about us
            </Link>
          </div>
        </div>
      </HeroSection>
      <CategoryContainer>
        {category.map((cat, i) => (
          <Link to={cat.link} key={i} className="cat__item">
            <div className="cat__image">
              <img src={cat.imageUrl} alt={cat.name} />
            </div>
            <div className="cat__details">
              <h4>{cat.name}</h4>
              <span to={cat.link}>Shop now</span>
            </div>
          </Link>
        ))}
      </CategoryContainer>
    </div>
  );
};

export default Home;
