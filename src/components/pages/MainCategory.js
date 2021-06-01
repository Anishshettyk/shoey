import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Breadcrumbs, Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Link, useLocation } from 'react-router-dom';
import { theme, mixins, media } from '../../styles';
import commerce from '../../lib/commerce';
import { SameSkeleton } from '../index';
import { valueChopper } from '../../utils/';
import Slider from 'react-slick';

const { colors } = theme;

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,

    '& .MuiFormControlLabel-label': {
      fontSize: 14,
      color: colors.textColor,
    },
    '& .MuiIconButton-root': {
      padding: 3,
    },
  },
}));

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
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-gap: 10px;
  ${media.tabletL`
  display:block;
  `}
`;
const FilterContainer = styled.section`
  box-shadow: ${mixins.shadow};
  border-radius: 10px;
  min-width: 200px;
  .filter__heading {
    text-align: center;
    text-transform: uppercase;
    margin: 0;
    padding: 10px 0px;
    color: ${colors.textColor};
    font-size: 1rem;
  }
  .filter__content__container {
    margin-bottom: 15px;
    .filter__content__heading {
      padding: 5px 0px 10px 10px;
      color: ${colors.blue};
      font-weight: 600;
      letter-spacing: 1px;
      border-top: 0.5px solid ${colors.grey1};
    }
  }
  ${media.tabletL`
 display:none;
  `}
`;

const ProductContainer = styled.section`
  box-shadow: ${mixins.shadow};
  border-radius: 10px;
  .product__banner {
  }
  ${media.tabletL`
  box-shadow:none;
  `}
`;
const ProductContentContainer = styled.div`
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  ${media.giant`
  grid-template-columns: repeat(4, 1fr);
  `}
  ${media.desktop`
  grid-template-columns: repeat(3, 1fr);
  `}
  ${media.tabletL`
  grid-template-columns: repeat(2, 1fr);
  `}
  ${media.phablet`
  grid-template-columns: repeat(1, 1fr);
  margin:0px;
  `}
  

  .product__card {
    border-radius: 10px;
    width: 100%;
    overflow: hidden;

    .product__image__container {
      min-height: 200px;
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
  const [priceFilters, setPriceFilters] = useState([]);
  const [initialProducts, setInitialProducts] = useState(null);

  const sliderRef = useRef([]);
  const timerRef = useRef(null);
  const path = useLocation();
  const pathName = path.pathname.split('/')[1];
  const classes = useStyles();

  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const findRequiredCategory = async (mainCategoryName) => {
      const allCategories = await commerce.categories.list();
      const requiredCategories = allCategories.data.filter((category) => category.name.split(' ')[0] === mainCategoryName);
      const modifiedCategories = requiredCategories.map((category) => ({ ...category, checked: false }));
      setCategories(modifiedCategories);
    };

    const retriveAllCategoryProducts = async () => {
      const response = await commerce.products.list();
      const filteredResponse = response?.data.filter((product) => product?.sku === pathName);
      setProducts(filteredResponse);
      setInitialProducts(filteredResponse);
    };

    findRequiredCategory(pathName);
    retriveAllCategoryProducts();
  }, [pathName]);

  useEffect(() => {
    if (initialProducts?.length > 0) {
      const res = computeFilterPrice(initialProducts, 2500);
      setPriceFilters(res);
    }
  }, [initialProducts]);

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
      let index = 0;
      while (stepFinalValue <= maxProductPrice) {
        //pushing min max max step value to array
        filteredValues.push({ minValue: stepFinalValue, maxValue: stepFinalValue + stepValue, checked: false, index: index });
        //incrementing step value with step
        stepFinalValue = stepFinalValue + stepValue;
        index = index + 1;
      }
      return filteredValues;
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
  const handlePriceFilter = (index) => {
    setProducts(initialProducts);
    const clearChecked = priceFilters.map((price) => (price.index !== index ? { ...price, checked: false } : price));
    const newArray = clearChecked.map((price) => (price.index === index ? { ...price, checked: !price.checked } : price));
    setPriceFilters(newArray);
    const selectedPriceFilter = newArray.filter((price) => price.checked === true);
    if (selectedPriceFilter.length > 0) {
      const reducedProducts = initialProducts.filter(
        (product) => product.price.raw >= selectedPriceFilter[0].minValue && product.price.raw <= selectedPriceFilter[0].maxValue
      );
      setProducts(reducedProducts);
    }
  };

  const handleCategoryFilter = (categorySelected) => {
    setProducts(initialProducts);
    const clearCategory = categories.map((category) => (category.id !== categorySelected.id ? { ...category, checked: false } : category));
    const newCategory = clearCategory.map((category) =>
      category.id === categorySelected.id ? { ...category, checked: !category.checked } : category
    );
    setCategories(newCategory);
    const selectedCategoryFilter = newCategory.filter((category) => category.checked === true);
    if (selectedCategoryFilter.length > 0) {
      const reducedProducts = initialProducts.filter((product) => product.categories[0].id === selectedCategoryFilter[0].id);
      setProducts(reducedProducts);
    }
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
                <FormControlLabel
                  className={classes.root}
                  key={category.id}
                  control={
                    <Checkbox
                      checked={category.checked}
                      onChange={() => handleCategoryFilter(category)}
                      name={`${category.name.split('men')[1]}`}
                      color="primary"
                    />
                  }
                  label={`${category.name.split('men')[1]} (${category.products})`}
                />
              ))}
            </div>
          ) : (
            <SameSkeleton variant="rect" width="90%" height="30px" limit={5} margin="10px" />
          )}
          {products ? (
            <div className="filter__content__container">
              <h4 className="slim__heading filter__content__heading">Price</h4>

              {priceFilters?.map((price) => (
                <FormControlLabel
                  className={classes.root}
                  key={price.index}
                  control={
                    <Checkbox
                      checked={price.checked}
                      onChange={() => handlePriceFilter(price.index)}
                      name={`checked${price.index}`}
                      color="primary"
                    />
                  }
                  label={`Rs. ${price.minValue} to Rs. ${price.maxValue}`}
                />
              ))}
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
                    <Link className="product__button" to={`/${pathName}/${product.id}`}>
                      View Product
                    </Link>
                    <p contentEditable="false" dangerouslySetInnerHTML={{ __html: valueChopper(product.description, 60) }} />
                    <h6 className="slim__heading">Rs. {product.price.formatted}</h6>
                  </div>
                </div>
              ))
            ) : (
              <SameSkeleton limit={20} variant="rect" width="100%" height="300px" margin="0px" />
            )}
          </ProductContentContainer>
        </ProductContainer>
      </ContentContainer>
    </StyledMainContainer>
  );
};

export default MainCategory;
