import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Breadcrumbs } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '../../styles';
import commerce from '../../lib/commerce';

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
    </StyledMainContainer>
  );
};

export default MainCategory;
