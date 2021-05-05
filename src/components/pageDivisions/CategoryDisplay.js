import React from 'react';
import styled from 'styled-components';
import { theme, media } from '../../styles';
import { Link } from 'react-router-dom';
import { category } from '../../utils';
import { LazyImage } from '../index';

const { colors } = theme;

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
      min-height: 300px;

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
const categoryDisplay = () => {
  return (
    <CategoryContainer>
      {category.map((cat, i) => (
        <Link to={cat.link} key={i} className="cat__item">
          <div className="cat__image">
            <LazyImage src={cat.imageUrl} alt={cat.name} />
          </div>
          <div className="cat__details">
            <h4>{cat.name}</h4>
            <span to={cat.link}>Shop now</span>
          </div>
        </Link>
      ))}
    </CategoryContainer>
  );
};

export default categoryDisplay;
