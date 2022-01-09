import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenSearch } from "../../redux";
import { mixins, theme } from "../../styles";
import { Icon } from "../index";
import { category, shuffleArray, valueChopper } from "../../utils";
import { Link } from "react-router-dom";

const { colors } = theme;

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "13%",
    bottom: "3%",
    left: "50%",
    right: "50%",
    transform: "translate(-50%, 0%)",
    width: 600,
    backgroundColor: colors.grey3,
    borderRadius: "10px",
    boxShadow: mixins.shadowSpreadHigh,
    padding: "25px",
    overflowY: "scroll",
  },
}));

const StyledSearchBar = styled.div`
  padding: 5px;
  border-radius: 5px;
  border-bottom: 3px solid ${colors.blue};
  background-color: ${colors.white};
  box-shadow: ${mixins.shadowSpread};
  display: flex;
  align-items: center;
  input {
    margin-left: 10px;
    width: 100%;
    outline: none;
    padding: 8px 0px;
    border: none;
    font-size: 16px;
    color: ${colors.darkBlue};
    font-weight: 500;
  }
  svg {
    color: ${colors.darkBlue};
    font-size: 1.1rem;
    margin-left: 3px;
  }
`;

const BeforeSearchCategory = styled.div`
  h4 {
    margin: 20px 0px 10px;
  }
  .category__wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    a {
      ${mixins.flexCenter};
      align-items: center;
      flex-direction: column;
      box-shadow: ${mixins.shadowSpread};
      background-color: ${colors.white};
      border-radius: 7px;
      padding: 10px;
      transition: 0.3s;

      img {
        width: 50px;
      }
      h6 {
        margin: 10px 0px 0px;
        color: ${colors.black};
        text-transform: uppercase;
      }
      &:hover {
        box-shadow: ${mixins.shadowSpreadHigh};
      }
    }
  }
`;

const BeforeSearchRecommendations = styled.div`
  h4 {
    margin: 30px 0px 10px;
  }
  .recommendations__wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    a {
      box-shadow: ${mixins.shadowSpread};
      ${mixins.flexCenter};
      flex-direction: column;
      padding: 10px;
      border-radius: 7px;
      background-color: ${colors.white};
      border: 1px solid ${colors.grey1};

      img {
        width: 64px;
        height: 64px;
      }
      h6 {
        margin: 4px 0px;
        color: ${colors.darkBlue};
      }
      &:hover {
        box-shadow: ${mixins.shadowSpreadHigh};
      }
    }
  }
`;
const SearchResults = styled.div`
  .result__container {
    a {
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: ${colors.white};
      box-shadow: ${mixins.shadowSpread};
      margin-bottom: 15px;
      border-radius: 7px;
      transition: 0.3s;
      .result__content {
        display: flex;
        align-items: center;

        img {
          width: 64px;
          height: 64px;
        }
        .content {
          margin-left: 20px;
          h6 {
            margin: 0px 0px 10px 0px;
            font-size: 0.9rem;
            color: ${colors.darkBlue};
          }
          span {
            font-size: 10px;
            padding: 4px 8px;
            border-radius: 5px;
            background-color: ${colors.blue};
            color: ${colors.white};
          }
        }
      }
      .result__price {
        span {
          color: ${colors.darkBlue};
        }
      }
      &:hover {
        box-shadow: ${mixins.shadowSpreadHigh};
        transform: translateY(-5px);
      }
    }
  }
  .no_results {
    ${mixins.flexCenter};
    flex-direction: column;
    margin-top: 20px;
    h5 {
      margin: 10px 0px;
      font-size: 1.2rem;
      font-weight: 500;
      span {
        font-weight: 800;
        color: ${colors.blue};
      }
    }
    svg {
      font-size: 2rem;
      opacity: 0.8;
    }
    p {
      text-align: center;
    }
  }
`;

const Search = () => {
  const [products, setProducts] = useState([]);
  const [matchedProduct, setMatchedProduct] = useState([]);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();
  const { openSearch } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    if (allProducts.length > 0 && openSearch) {
      //openSearch includes because of new recommendation on each click on search
      setProducts(shuffleArray(allProducts));
    }
  }, [allProducts, openSearch]);

  const handleModalClose = () => {
    dispatch(setOpenSearch(false));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);

    setMatchedProduct(
      allProducts.filter((product) =>
        product.name
          .toLowerCase()
          .split(" ")
          .join("")
          .split("'")
          .join("")
          .includes(e.target.value.split(" ").join(""))
      )
    );
  };
  //   console.log(matchedProduct);

  const Recommendations = (
    <BeforeSearchRecommendations>
      <h4>Recommendations.</h4>
      <div className='recommendations__wrapper'>
        {products.slice(0, 6).map((item, i) => (
          <Link
            to={`/${item.sku}/${item.id}`}
            key={i}
            onClick={handleModalClose}
          >
            <img src={item.media.source} alt={item.name} />
            <h6>{valueChopper(item.name, 18)}</h6>
          </Link>
        ))}
      </div>
    </BeforeSearchRecommendations>
  );

  const body = (
    <div className={classes.paper}>
      <StyledSearchBar>
        <Icon name='Search' />
        <input
          type='text'
          placeholder='Type here to search product by name'
          value={search}
          onChange={(event) => handleSearch(event)}
        />
      </StyledSearchBar>
      {search.length === 0 && (
        <BeforeSearchCategory>
          <h4>Our categories.</h4>
          <div className='category__wrapper'>
            {category.map((item, i) => (
              <Link to={item.link} key={i} onClick={handleModalClose}>
                <Icon name={item.name} />
                <h6>{item.name}</h6>
              </Link>
            ))}
          </div>
        </BeforeSearchCategory>
      )}

      {products.length > 0 && search.length === 0 && Recommendations}
      {search.length > 0 && (
        <SearchResults>
          {matchedProduct.length > 0 ? (
            <div className='result__container'>
              <h4>{`${matchedProduct.length} Results on ${search}`}.</h4>
              {matchedProduct.map((item, i) => (
                <Link
                  to={`/${item.sku}/${item.id}`}
                  key={i}
                  onClick={handleModalClose}
                >
                  <div className='result__content'>
                    <img src={item.media.source} alt={item.name} />
                    <div className='content'>
                      <h6>{valueChopper(item.name, 33)}</h6>
                      <span>{`For ${item.sku.toUpperCase()}`}</span>
                    </div>
                  </div>
                  <div className='result__price'>
                    <span>{item.price.formatted_with_symbol}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <>
              <div className='no_results'>
                <Icon name='Flag' />
                <h5>
                  No results found for <span>"{search}"</span>
                </h5>
                <p>
                  Please make sure your words are spelled correctly or use less
                  or different words.
                </p>
              </div>
              {Recommendations}
            </>
          )}
        </SearchResults>
      )}
    </div>
  );

  return (
    <Modal
      open={openSearch}
      onClose={handleModalClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      {body}
    </Modal>
  );
};

export default Search;
