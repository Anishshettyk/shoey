import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Breadcrumbs } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Link, useLocation } from 'react-router-dom';
import { theme, mixins } from '../../styles';
import commerce from '../../lib/commerce';
import { Icon, SameSkeleton } from '../index';

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
    h4 {
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
  }
`;
const ProductContainer = styled.section`
  box-shadow: ${mixins.shadow};
  border-radius: 10px;
`;

const MainCategory = () => {
  const [categories, setCategories] = useState(null);
  const path = useLocation();
  const pathName = path.pathname.split('/')[1];
  useEffect(() => {
    findRequiredCategory(pathName);
  }, [pathName]);

  const findRequiredCategory = async (mainCategoryName) => {
    const allCategories = await commerce.categories.list();
    const requiredCategories = allCategories.data.filter((category) => category.name.split(' ')[0] === mainCategoryName);
    setCategories(requiredCategories);
  };

  const computeTotalProducts = (categories) => {
    const totalSumInACategory = categories
      ?.map((category) => category?.products)
      .reduce((prev, current) => {
        return prev + current;
      }, 0);
    return totalSumInACategory;
  };
  console.log(categories);
  return (
    <StyledMainContainer>
      <StyledBreadcrumbs aria-label="breadcrumb">
        <Link to="/">HOME</Link>
        <h4>{pathName}</h4>
      </StyledBreadcrumbs>
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
              <h4 className="slim__heading">Categories</h4>
              {categories?.map((category) => (
                <Link key={category.id} to={category.slug} className="category__link">
                  <p>
                    <Icon name="right triangle" /> {category.name.split('men')[1]} <span>({category.products})</span>
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <SameSkeleton variant="react" width="90%" height="30px" limit={5} margin="10px" />
          )}
        </FilterContainer>
        <ProductContainer></ProductContainer>
      </ContentContainer>
    </StyledMainContainer>
  );
};

export default MainCategory;
