import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme, media } from '../../styles';
import commerce from '../../lib/commerce';
import { useSelector } from 'react-redux';

const { colors } = theme;

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
    color: ${colors.darkGrey};
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

const Wishlist = () => {
  const [wishlistedProducts, setWishlistedProducts] = useState(null);

  const { userDetails } = useSelector((state) => state.user);
  const { wishlist } = userDetails;

  useEffect(() => {
    const fetchWishlistedProduct = async () => {
      const res = await commerce.products.retrieve([...wishlist]);
      setWishlistedProducts(res);
    };
    fetchWishlistedProduct();
  }, [wishlist]);

  console.log(wishlistedProducts);
  return (
    <WishlistContainer>
      <h1 className="slim__tag wishlist__heading">
        Your wishlist <span>({wishlist?.length > 0 ? wishlist?.length : '0'})</span>
      </h1>
      <p className="slim__tag wishlist__discription">View your wishlisted product here...</p>
    </WishlistContainer>
  );
};

export default Wishlist;
