import React, { useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { theme, mixins } from "../../styles";
import { Icon } from "../index";
import { valueChopper } from "../../utils";
import { Link } from "react-router-dom";

const { colors } = theme;
const YouMayAlsoLikeContainer = styled.section`
  margin: 0px 40px 50px;
  .section__heading {
    display: flex;
    border-bottom: 3px dashed ${colors.darkBlue};
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    opacity: 0.8;
    h1 {
      color: ${colors.textColor};
      letter-spacing: 1.5px;
      font-size: 20px;
      margin: 0;
    }
    svg {
      font-size: 22px;
      margin-right: 10px;
    }
  }
`;
const Product = styled.div`
  padding: 10px;
  box-shadow: ${mixins.shadowSpread};
  border: 1px solid ${colors.grey1};
  border-radius: 5px;
  max-width: 250px;
  overflow: hidden;
  .image__container {
    max-width: 250px;
    height: 250px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .product__content__container {
    padding: 10px;
    h3 {
      display: block;
      font-size: 15px;
      font-weight: 500;
      padding: 7px 0px;
      margin: 0;
    }
    h6 {
      font-size: 14px;
      font-weight: 500;
      margin: 0;
    }
    P {
      font-size: 13px;
      color: ${colors.darkGrey};
      font-weight: 300;
      margin-top: 2px;
    }
    .product__button {
      display: none !important;
      max-width: 90%;
      margin: 0px auto;
      display: block;
      text-align: center;
      padding: 7px 0px;
      border: 1px solid ${colors.grey2};
      border-radius: 2px;
      color: ${colors.textColor};
      font-size: 15px;
      font-weight: 600;
      &:hover {
        border-color: ${colors.textColor};
      }
    }
  }
  &:hover {
    box-shadow: ${mixins.shadowSpread};
    .slick-dots {
      display: block !important;
    }
    .product__content__container {
      h3 {
        display: none;
      }
      .product__button {
        display: block !important;
      }
    }
  }
`;
const StyledSlider = styled(Slider)``;

const StyledSliderImage = styled(Slider)`
  .slick-dots {
    display: none !important;
    margin-bottom: 13px;
  }
`;

const YouMayAlsoLike = ({ recommendProduct }) => {
  const sliderRef = useRef([]);
  const timerRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  const imageSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const sliderOnMouseEnter = (i) => {
    if (sliderRef?.current[i]) {
      timerRef.current = setInterval(() => {
        sliderRef?.current[i]?.slickNext();
      }, 1200);
    }
  };

  const sliderOnMouseLeave = (i) => {
    sliderRef?.current[i]?.slickGoTo(0);
    clearInterval(timerRef.current);
  };

  return (
    <YouMayAlsoLikeContainer>
      <div className='section__heading'>
        <Icon name='analytics' />
        <h1>You may also like....</h1>
      </div>
      <StyledSlider {...settings}>
        {recommendProduct.map((product, i) => (
          <Product
            key={product.id}
            onMouseEnter={() => sliderOnMouseEnter(i)}
            onMouseLeave={() => sliderOnMouseLeave(i)}
          >
            <StyledSliderImage
              {...imageSettings}
              ref={(element) => (sliderRef.current[i] = element)}
            >
              {product.assets.map(({ url, id, filename }) => (
                <div className='image__container' key={id}>
                  <img src={url} alt={filename} />
                </div>
              ))}
            </StyledSliderImage>
            <div className='product__content__container'>
              <h3 className='slim__heading'>
                {valueChopper(product.name, 23)}
              </h3>
              <Link
                className='product__button'
                to={`/${product.sku}/${product.id}`}
              >
                View Product
              </Link>
              <p
                contentEditable='false'
                dangerouslySetInnerHTML={{
                  __html: valueChopper(product.description, 50),
                }}
              />
              <h6 className='slim__heading'>Rs. {product.price.formatted}</h6>
            </div>
          </Product>
        ))}
      </StyledSlider>
    </YouMayAlsoLikeContainer>
  );
};

export default YouMayAlsoLike;
