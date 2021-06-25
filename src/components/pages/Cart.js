import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Kawaii, BackdropMaker } from '../index';
import commerce from '../../lib/commerce';
import { storeToCart } from '../../redux';

const { colors } = theme;
const CartContainer = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr;
  min-height: 87vh;
`;
const CartProductsContainer = styled.div`
  padding-top: 50px;
  margin: 0px 50px;
  .cart__products__headings {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 0.5px solid ${colors.grey1};
    h1 {
      font-size: 22px;
      font-weight: 600;
    }
  }
  .cart__products__heading__container {
    margin-top: 30px;
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    grid-gap: 10px;
    .cart__product__sub__heading {
      color: ${colors.darkGrey};
      font-weight: bold;
      text-transform: uppercase;
      font-size: 13px;
      text-align: center;
    }
    .product__details {
      text-align: left;
    }
  }
  .cart__product {
    margin-top: 20px;
    .cart__product__inside {
      display: grid;
      grid-template-columns: 3fr 1fr 1fr 1fr;
      grid-gap: 10px;
      margin-bottom: 10px;
      .cart__products__info {
        display: flex;
        .cart__product__photo {
          width: 100px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .cart__product__details {
          margin-left: 10px;
          align-items: flex-start;
          justify-content: space-around;
          display: flex;
          flex-direction: column;
          .cart__product__varient {
            color: ${colors.darkBlue};
            text-transform: uppercase;
            font-size: 12px;
            font-weight: bold;
          }
          .cart__product__remove {
            border: none;
            padding: 2px 10px;
            font-size: 13px;
            color: ${colors.blue};
            background-color: transparent;
            font-weight: 500;
            cursor: pointer;
            &:hover {
              opacity: 0.7;
            }
          }
        }
      }
      .cart__products__quantity {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        button {
          border: none;
          background: transparent;
          font-size: 20px;
          svg {
            color: ${colors.black};
            font-weight: bold;
          }
          &:hover {
            background-color: ${colors.grey3};
          }
        }
        span {
          margin: 0px 4px;
          padding: 0px 7px;
          border: 1px solid ${colors.grey2};
          color: ${colors.darkGrey};
        }
      }
      .cart__products__price {
        text-align: center;
        span {
          color: ${colors.black};
          font-weight: bold;
        }
      }
      .cart__products__total {
        text-align: center;
        span {
          color: ${colors.black};
          font-weight: bold;
        }
      }
    }
  }
`;
const CartSummaryContainer = styled.div`
  background-color: ${colors.grey3};
  padding: 50px 20px 0px 20px;

  h1 {
    padding-bottom: 20px;
    border-bottom: 0.5px solid ${colors.grey1};
  }
`;

const Cart = () => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [backdropMessage, setbackdropMessage] = useState('We are working on it...');
  const [backdropMood, setBackdropMood] = useState('blissful');

  const { cartDetails } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const backdropOpen = () => {
    setOpenBackdrop(!openBackdrop);
  };
  const backdropClose = () => {
    setOpenBackdrop(false);
  };

  const removeFromCart = async (cartItemId) => {
    setbackdropMessage('Removing from cart...');
    setBackdropMood('ko');
    backdropOpen();
    if (cartItemId) {
      const response = await commerce.cart.remove(cartItemId);
      if (response.success) {
        dispatch(storeToCart(response?.cart));
      }
    }
    backdropClose();
  };

  const incrementCartItem = async (cartItemId, quantity) => {
    setbackdropMessage('Please wait');
    setBackdropMood('happy');
    backdropOpen();
    if (cartItemId) {
      const response = await commerce.cart.update(cartItemId, { quantity: quantity + 1 });
      console.log(response);
      if (response.success) {
        dispatch(storeToCart(response?.cart));
      }
    }
    backdropClose();
  };

  const decrementCartItem = async (cartItemId, quantity) => {
    setbackdropMessage('Please wait');
    setBackdropMood('happy');
    backdropOpen();
    if (cartItemId) {
      const response = await commerce.cart.update(cartItemId, { quantity: quantity - 1 });
      if (response.success) {
        dispatch(storeToCart(response?.cart));
      }
    }
    backdropClose();
  };
  return (
    <CartContainer>
      <CartProductsContainer>
        <div className="cart__products__headings">
          <h1 className="slim__heading">Shopping Cart</h1>
          <h3 className="slim__heading">{cartDetails?.total_items} items</h3>
        </div>
        <div className="cart__products__heading__container">
          <span className="cart__product__sub__heading product__details">Product Details</span>
          <span className="cart__product__sub__heading">Quantity</span>
          <span className="cart__product__sub__heading">Price</span>
          <span className="cart__product__sub__heading">Total</span>
        </div>
        <div className="cart__product">
          {cartDetails?.line_items.map((product) => (
            <div className="cart__product__inside" key={product?.id}>
              <div className="cart__products__info">
                <div className="cart__product__photo">
                  <img src={product?.variant?.assets[0]?.url} alt={product?.variant?.assets[0]?.fileName} />
                </div>
                <div className="cart__product__details">
                  <h5 className="slim__heading">{product?.name}</h5>
                  <p className="cart__product__varient">
                    {product?.selected_options[0]?.group_name} - {product?.selected_options[0]?.option_name} /{' '}
                    {product?.selected_options[1]?.group_name} - {product?.selected_options[1]?.option_name}
                  </p>
                  <button className="cart__product__remove" onClick={() => removeFromCart(product?.id)}>
                    Remove
                  </button>
                </div>
              </div>
              <div className="cart__products__quantity">
                <button onClick={() => incrementCartItem(product?.id, product?.quantity)}>
                  <Icon name="plus" />
                </button>
                <span>{product?.quantity}</span>
                <button onClick={() => decrementCartItem(product?.id, product?.quantity)}>
                  <Icon name="minus" />
                </button>
              </div>
              <div className="cart__products__price">
                <span>{product?.price?.formatted_with_symbol}</span>
              </div>
              <div className="cart__products__total">
                <span>{product?.line_total?.formatted_with_symbol}</span>
              </div>
            </div>
          ))}
        </div>
      </CartProductsContainer>
      <CartSummaryContainer>
        <h1 className="slim__heading">Order Summary</h1>
      </CartSummaryContainer>
      <BackdropMaker open={openBackdrop}>
        <Kawaii name="folder" mood={backdropMood} message={backdropMessage} />
      </BackdropMaker>
    </CartContainer>
  );
};

export default Cart;
