import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Breadcrumbs, Checkbox } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Link, useLocation } from 'react-router-dom';
import { theme, mixins } from '../../styles';
import commerce from '../../lib/commerce';
import { Icon, SameSkeleton, ProductOverview } from '../index';
import { valueChopper } from '../../utils/';
import Slider from 'react-slick';

const { colors } = theme;
const StyledMainContainer = styled.div`
  margin: 10px 20px;
  .main__heading {
    margin-top: -5px;
    color: ${colors.textColor};
    span {
      opacity: 0.5;
    }
  }
`;
const StyledBreadcrumbs = styled(Breadcrumbs)`
  font-size: 12px;
  a {
    color: ${colors.textColor};
  }
  h4 {
    color: ${colors.black};
    text-transform: uppercase;
  }
`;
const ContentContainer = styled.div`
  margin-top: 10px;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-gap: 10px;
`;
const FilterContainer = styled.section`
  box-shadow: ${mixins.shadow};
  border-radius: 10px;
  .filter__heading {
    text-align: center;
    text-transform: uppercase;
    margin: 0;
    padding: 10px 0px;
    color: ${colors.textColor};
    font-size: 1rem;
  }
  .filter__content__container {
    .filter__content__heading {
      padding: 5px 0px 10px 10px;
      color: ${colors.blue};
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      border-bottom: 1px dashed ${colors.grey1};
      border-top: 1px dashed ${colors.grey1};
    }
    .category__link {
      color: ${colors.black};
      font-size: 14px;
      &:hover {
        p {
          opacity: 0.5;
        }
      }
      p {
        margin-left: 10px;
        span {
          opacity: 0.6;
          font-weight: bold;
        }
        svg {
          color: ${colors.blue};
        }
      }
    }
    .filter__price__container {
      p {
        font-size: 13px;
        margin: 0px;
        color: ${colors.textColor};
        padding: 5px 10px;
        span {
          padding: 0;
        }
      }
    }
  }
`;

const ProductContainer = styled.section`
  box-shadow: ${mixins.shadow};
  border-radius: 10px;
  .product__banner {
  }
`;
const ProductContentContainer = styled.div`
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;

  .product__card {
    border-radius: 10px;
    width: 100%;
    overflow: hidden;

    .product__image__container {
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

    .product__content__container {
      padding: 10px;
      h3 {
        display: block;
        font-size: 15px;
        font-weight: 500;
        padding: 7px 0px;
      }
      h6 {
        font-size: 14px;
        font-weight: 500;
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
  }
`;
const StyledSlider = styled(Slider)`
  .slick-dots {
    display: none !important;
    margin-bottom: 13px;
  }
`;

const MainCategory = () => {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);

  const sliderRef = useRef([]);
  const timerRef = useRef(null);
  const path = useLocation();
  const pathName = path.pathname.split('/')[1];

  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log(products);

  useEffect(() => {
    const findRequiredCategory = async (mainCategoryName) => {
      const allCategories = await commerce.categories.list();
      const requiredCategories = allCategories.data.filter((category) => category.name.split(' ')[0] === mainCategoryName);
      setCategories(requiredCategories);
    };

    const retriveAllCategoryProducts = async () => {
      const response = await commerce.products.list();
      const filteredResponse = response?.data.filter((product) => product?.sku === pathName);
      setProducts(filteredResponse);
    };

    findRequiredCategory(pathName);
    retriveAllCategoryProducts();
  }, [pathName]);

  const computeTotalProducts = (categories) => {
    const totalSumInACategory = categories
      ?.map((category) => category?.products)
      .reduce((prev, current) => {
        return prev + current;
      }, 0);
    return totalSumInACategory;
  };

  const computeFilterPrice = (products, stepValue) => {
    let filteredValues = [];
    if (products?.length > 0) {
      //finding min product value
      const maxProductPrice = products
        ?.map((product) => product.price.raw)
        ?.reduce((prev, current) => {
          return prev > current ? prev : current;
        });

      //finding max product value
      const minProductPrice = products
        ?.map((product) => product.price.raw)
        ?.reduce((prev, current) => {
          return prev < current ? prev : current;
        });

      //setting initial step value to min value
      let stepFinalValue = minProductPrice;
      while (stepFinalValue <= maxProductPrice) {
        //pushing min max max step value to array
        filteredValues.push({ minValue: stepFinalValue, maxValue: stepFinalValue + stepValue });
        //incrementing step value with step
        stepFinalValue = stepFinalValue + stepValue;
      }
      return filteredValues.map((filteredValue, i) => (
        <p key={i}>
          <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} color="primary" /> Rs. {filteredValue.minValue} to Rs.{' '}
          {filteredValue.maxValue}
        </p>
      ));
    }
  };
  const sliderOnMouseEnter = (i) => {
    timerRef.current = setInterval(() => {
      sliderRef?.current[i]?.slickNext();
    }, 1200);
  };

  const sliderOnMouseLeave = (i) => {
    sliderRef?.current[i]?.slickGoTo(0);
    clearInterval(timerRef.current);
  };

  return (
    <StyledMainContainer>
      {categories ? (
        <StyledBreadcrumbs aria-label="breadcrumb">
          <Link to="/">HOME</Link>
          <h4>{pathName}</h4>
        </StyledBreadcrumbs>
      ) : (
        <Skeleton variant="rect" width="20%" height={20} style={{ marginBottom: '10px' }} />
      )}

      {categories ? (
        <h4 className="main__heading">
          {pathName} footware - <span>{computeTotalProducts(categories)} items</span>
        </h4>
      ) : (
        <Skeleton variant="rect" width="30%" height={20} animation="wave" />
      )}
      <ContentContainer>
        <FilterContainer>
          <h5 className="filter__heading">Filters</h5>
          {categories ? (
            <div className="filter__content__container">
              <h4 className="slim__heading filter__content__heading">Categories</h4>
              {categories?.map((category) => (
                <Link key={category.id} to={category.slug} className="category__link">
                  <p>
                    <Icon name="right triangle" /> {category.name.split('men')[1]} <span>({category.products})</span>
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <SameSkeleton variant="rect" width="90%" height="30px" limit={5} margin="10px" />
          )}
          {products ? (
            <div className="filter__content__container">
              <h4 className="slim__heading filter__content__heading">Price</h4>
              <div className="filter__price__container">{computeFilterPrice(products, 2500)}</div>
            </div>
          ) : (
            <SameSkeleton variant="rect" width="90%" height="30px" limit={5} margin="10px" />
          )}
        </FilterContainer>
        <ProductContainer>
          <div className="product__banner"></div>

          <ProductContentContainer>
            {products ? (
              products?.map((product, i) => (
                <div
                  key={product.id}
                  className="product__card"
                  onMouseEnter={() => sliderOnMouseEnter(i)}
                  onMouseLeave={() => sliderOnMouseLeave(i)}
                >
                  <StyledSlider {...settings} ref={(element) => (sliderRef.current[i] = element)}>
                    {product.assets.map(({ url, id, filename }) => (
                      <div className="product__image__container" key={id}>
                        <img src={url} alt={filename} />
                      </div>
                    ))}
                  </StyledSlider>
                  <div className="product__content__container">
                    <h3 className="slim__heading">{valueChopper(product.name, 23)}</h3>
                    <Link className="product__button" to={'/'}>
                      View Product
                    </Link>
                    <p contentEditable="true" dangerouslySetInnerHTML={{ __html: valueChopper(product.description, 30) }} />
                    <h6 className="slim__heading">Rs. {product.price.formatted}</h6>
                  </div>
                </div>
              ))
            ) : (
              <ProductOverview limit={20} />
            )}
          </ProductContentContainer>
        </ProductContainer>
      </ContentContainer>
    </StyledMainContainer>
  );
};

export default MainCategory;
