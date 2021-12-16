import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme, media, mixins } from '../../styles';
import { useSelector, useDispatch } from 'react-redux';
import { valueChopper } from '../../utils';
import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { Icon, Kawaii, BackdropMaker } from '../index';
import { removeWishedProducts, getUserData } from '../../lib/firestore/userData';
import { setUser, makeNotification } from '../../redux';
import { Link } from 'react-router-dom';

const { colors } = theme;

const useStyles = makeStyles(() => ({
  viewButton: {
    backgroundColor: colors.blue,
    color: colors.white,
    '&:hover': {
      opacity: 0.8,
      backgroundColor: colors.blue,
    },
  },
  deleteButton: {
    backgroundColor: colors.red,
    color: colors.white,
    '&:hover': {
      opacity: 0.8,
      backgroundColor: colors.red,
    },
  },
}));

const WishlistContainer = styled.section`
  min-height: 100vh;
  max-width: 50%;
  margin: 20px auto 0px;
  .wishlist__heading {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    span {
      opacity: 0.6;
    }
  }
  .wishlist__discription {
    margin-top: 10px;
    text-align: center;
    color: ${colors.darkBlue};
  }
  ${media.netbook`
    max-width:60%;
  `}
  ${media.tabletL`
  max-width:80%;
  `}
  ${media.tablet`
  max-width:90%;
  `}
`;
const WishlistedProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  .wishlisted__product {
    margin: 20px 0px;
    border-radius: 5px;
    ${mixins.shadowSpread};
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    .wishlisted__product__pic {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .wishlisted__product__info {
      margin-left: 10px;
      h3 {
        color: ${colors.grey2};
        font-weight: 900;
      }
      h4 {
        color: ${colors.blue};
      }
    }
    .wishlisted__product__action {
      ${mixins.flexCenter};
      justify-content: space-around;
    }
  }
`;
const EmptyWishlist = styled.div`
  ${mixins.flexColumn};
  ${mixins.flexCenter};
  ${mixins.shadowSpread};
  margin-top: 30px;
  padding: 20px 0px;
  border-radius: 10px;
  h1 {
    color: ${colors.red};
    font-weight: 900;
  }
  a {
    padding: 10px 20px;
    background-color: ${colors.lightBlue};
    border-radius: 30px;
    color: ${colors.blue};
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Wishlist = () => {
  const [wishlistedProducts, setWishlistedProducts] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);
  const { wishlist, email } = userDetails;

  const findWishlistedProducts = (allProducts, wishlist) => {
    const filteredProducts = allProducts?.filter((product) => wishlist?.includes(product?.id));
    setWishlistedProducts(filteredProducts);
  };

  useEffect(() => {
    findWishlistedProducts(allProducts, wishlist);
  }, [wishlist, allProducts]);

  const backdropOpen = () => {
    setOpenBackdrop(!openBackdrop);
  };
  const backdropClose = () => {
    setOpenBackdrop(false);
  };

  const removeFromWishlist = async (email, productId) => {
    backdropOpen();
    const response = await removeWishedProducts(email, productId);
    const userDataRes = await getUserData(userDetails);
    dispatch(setUser(userDataRes));
    if (response.status === 'error') {
      dispatch(makeNotification({ message: response.message, variant: response.status, duration: 1500 }));
    }
    backdropClose();
  };

  return (
    <WishlistContainer>
      <h1 className="slim__tag wishlist__heading">
        Your wishlist <span>{wishlist?.length > 0 ? `(${wishlist?.length})` : null}</span>
      </h1>
      <p className="slim__tag wishlist__discription">View your wishlisted product here...</p>
      <WishlistedProductsContainer>
        {wishlistedProducts?.map((wishlistedProduct) => (
          <div key={wishlistedProduct?.id} className="wishlisted__product">
            <div className="wishlisted__product__pic">
              <img src={wishlistedProduct?.assets[0]?.url} alt={wishlistedProduct?.assets[0]?.filename} />
            </div>
            <div className="wishlisted__product__info">
              <h4>{wishlistedProduct?.name}</h4>
              <h3>Rs. {wishlistedProduct?.price?.formatted}</h3>
              <p contentEditable="false" dangerouslySetInnerHTML={{ __html: valueChopper(wishlistedProduct?.description, 50) }} />
            </div>
            <div className="wishlisted__product__action">
              <Tooltip title="View product" aria-label="View product">
                <Link to={`/${wishlistedProduct?.sku}/${wishlistedProduct?.id}`}>
                  <IconButton className={classes.viewButton}>
                    <Icon name="eye" />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title="Remove from wishlist" aria-label="Remove from wishlist">
                <IconButton className={classes.deleteButton} onClick={() => removeFromWishlist(email, wishlistedProduct?.id)}>
                  <Icon name="delete" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))}
      </WishlistedProductsContainer>
      {wishlist.length === 0 ? (
        <EmptyWishlist>
          <Kawaii name="ghost" mood="blissful" message="Your wishlist is empty!" />
          <Link to="/men">Shop for men</Link>
        </EmptyWishlist>
      ) : (
        ''
      )}
      <BackdropMaker open={openBackdrop}>
        <Kawaii name="folder" mood="ko" message="Removing from wishlist" />
      </BackdropMaker>
    </WishlistContainer>
  );
};

export default Wishlist;
