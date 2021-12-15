import React, { useState } from "react";
import styled from "styled-components";
import { theme, mixins } from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Kawaii, BackdropMaker } from "../index";
import commerce from "../../lib/commerce";
import {
  storeToCart,
  storeCartToken,
  makeNotification,
  setPaymentPending,
  setProfileTab,
} from "../../redux";
import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const { colors } = theme;
const CartContainer = styled.section`
  min-height: 87vh;
  margin: 30px 7%;

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
`;
const CartProductsContainer = styled.div`
  margin: 0px 2%;
  .cart__products__heading__container {
    margin: 30px 0px 20px;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
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
    .cart__product__inside {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
      margin-bottom: 20px;
      align-items: center;
      padding: 10px 20px;
      ${mixins.shadow};
      border-radius: 10px;
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
          display: flex;
          justify-content: space-around;
          flex-direction: column;
          .cart__product__varient {
            color: ${colors.darkBlue};
            text-transform: uppercase;
            font-size: 12px;
            font-weight: bold;
          }
        }
      }
      .cart__products__quantity {
        display: flex;
        justify-content: center;
        align-items: center;

        button {
          cursor: pointer;
          border: none;
          background: transparent;
          font-size: 20px;
          transition: all 0.3s ease-out 0s;
          svg {
            color: ${colors.black};
            font-weight: bold;
          }
          &:hover {
            transform: scale(1.2);
            color: ${colors.darkBlue};
          }
        }
        span {
          font-size: 20px;
          margin: 0px 8px;
          padding: 2px 8px;
          font-weight: bold;
          color: ${colors.blue};
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
      .cart__product__remove {
        border: none;
        background-color: transparent;
        font-weight: 500;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
  .cart__actions__button__container {
    display: flex;
    float: right;
    align-items: center;
    justify-content: flex-end;
    .cart__action__button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${colors.black};
      color: ${colors.white};
      padding: 0px 17px;
      font-size: 12px;
      border-radius: 20px;
      svg {
        margin-right: 10px;
      }
      &:hover {
        ${mixins.shadowSpreadHigh};
      }
    }
    .empty__cart__button {
      background-color: ${colors.red};
      margin-left: 10px;
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

const CartSummary = styled.section`
  margin: 90px auto 0px;
  ${mixins.flexCenter};
  ${mixins.shadow}
  max-width:400px;
  h1 {
    text-align: center;
    font-size: 22px;
  }
  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    flex-direction: column;
    min-width: 300px;
    li {
      margin-bottom: 13px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-weight: 500;

        &:first-child {
          color: ${colors.darkGrey};
        }
      }
      .total__summary {
        font-size: 22px;
        font-weight: bold;
        color: ${colors.blue};
      }
    }
  }
  .pay__button {
    width: 100%;
    margin: 20px 0px;
  }
`;

const Cart = () => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [backdropMessage, setbackdropMessage] = useState(
    "We are working on it..."
  );
  const [backdropMood, setBackdropMood] = useState("blissful");

  const { cartDetails } = useSelector((state) => state.cart);
  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const backdropOpen = () => {
    setOpenBackdrop(!openBackdrop);
  };
  const backdropClose = () => {
    setOpenBackdrop(false);
  };

  const removeFromCart = async (cartItemId) => {
    try {
      setbackdropMessage("Removing from cart...");
      setBackdropMood("ko");
      backdropOpen();
      if (cartItemId) {
        const response = await commerce.cart.remove(cartItemId);
        if (response?.success) {
          dispatch(storeToCart(response?.cart));
        }
      }
      backdropClose();
    } catch (error) {
      if (error) {
        backdropClose();
        dispatch(
          makeNotification({
            message: `Unexpected error occured. Please try again.`,
            variant: "error",
            duration: 2000,
          })
        );
      }
    }
  };

  const incrementCartItem = async (cartItemId, quantity) => {
    try {
      setbackdropMessage("Please wait");
      setBackdropMood("happy");
      backdropOpen();
      if (cartItemId) {
        const response = await commerce.cart.update(cartItemId, {
          quantity: quantity + 1,
        });
        if (response?.success) {
          dispatch(storeToCart(response?.cart));
        }
      }
      backdropClose();
    } catch (error) {
      if (error) {
        backdropClose();
        dispatch(
          makeNotification({
            message: `Unexpected error occured. Please try again.`,
            variant: "error",
            duration: 2000,
          })
        );
      }
    }
  };

  const decrementCartItem = async (cartItemId, quantity) => {
    try {
      setbackdropMessage("Please wait");
      setBackdropMood("happy");
      backdropOpen();
      if (cartItemId) {
        const response = await commerce.cart.update(cartItemId, {
          quantity: quantity - 1,
        });
        if (response?.success) {
          dispatch(storeToCart(response?.cart));
        }
      }
      backdropClose();
    } catch (error) {
      if (error) {
        backdropClose();
        dispatch(
          makeNotification({
            message: `Unexpected error occured. Please try again.`,
            variant: "error",
            duration: 2000,
          })
        );
      }
    }
  };
  const refreshCart = async () => {
    try {
      setbackdropMessage("refreshing cart...");
      backdropOpen();
      const response = await commerce.cart.retrieve();
      if (response?.hasOwnProperty("id")) {
        dispatch(storeToCart(response));
      }
      backdropClose();
    } catch (error) {
      if (error) {
        backdropClose();
        dispatch(
          makeNotification({
            message: `Unexpected error occured. Please try again.`,
            variant: "error",
            duration: 2000,
          })
        );
      }
    }
  };

  const emptyCart = async () => {
    try {
      setbackdropMessage("Emptying cart...");
      setBackdropMood("ko");
      backdropOpen();
      const response = await commerce.cart.empty();

      if (response?.success) {
        dispatch(storeToCart(response?.cart));
      }
      backdropClose();
    } catch (error) {
      if (error) {
        backdropClose();
        dispatch(
          makeNotification({
            message: `Unexpected error occured. Please try again.`,
            variant: "error",
            duration: 2000,
          })
        );
      }
    }
  };

  const actionOnPayment = async () => {
    if (!userDetails?.shippingAddress?.length > 0) {
      //make notification to add shipping addShipping address
      dispatch(
        makeNotification({
          message: "Please add shipping address",
          variant: "info",
          duration: 3000,
        })
      );
      //set pending payment
      dispatch(setPaymentPending(true));
      // set tab value to shipping address
      dispatch(setProfileTab(1));
      //push user to shipping address page
      history.push("/profile");
    } else {
      try {
        const token = await commerce.checkout.generateToken(cartDetails.id, {
          type: "cart",
        });

        if (token?.id) {
          dispatch(storeCartToken(token));
        }
      } catch {
        dispatch(
          makeNotification({
            message: "Unexpected error occured. Please try again.",
            variant: "error",
            duration: 2000,
          })
        );
      }
    }
  };

  return (
    <CartContainer>
      {cartDetails.total_items === 0 ? (
        <EmptyWishlist>
          <Kawaii name='ghost' mood='blissful' message='Your cart is empty!' />
          <Link to='/men'>Shop for men</Link>
        </EmptyWishlist>
      ) : (
        <>
          <div className='cart__products__headings'>
            <h1 className='slim__heading'>Shopping Cart</h1>
            <h3 className='slim__heading'>{cartDetails?.total_items} items</h3>
          </div>

          <CartProductsContainer>
            <div className='cart__products__heading__container'>
              <span className='cart__product__sub__heading product__details'>
                Product Details
              </span>
              <span className='cart__product__sub__heading'>Quantity</span>
              <span className='cart__product__sub__heading'>Price</span>
              <span className='cart__product__sub__heading'>Total</span>
              <span className='cart__product__sub__heading'>Remove</span>
            </div>
            <div className='cart__product'>
              {cartDetails?.line_items.map((product) => (
                <div className='cart__product__inside' key={product?.id}>
                  <div className='cart__products__info'>
                    <div className='cart__product__photo'>
                      <img
                        src={product?.variant?.assets[0]?.url}
                        alt={product?.variant?.assets[0]?.fileName}
                      />
                    </div>
                    <div className='cart__product__details'>
                      <h5 className='slim__heading'>{product?.name}</h5>
                      <p className='cart__product__varient'>
                        {product?.selected_options[0]?.group_name} -{" "}
                        {product?.selected_options[0]?.option_name} /{" "}
                        {product?.selected_options[1]?.group_name} -{" "}
                        {product?.selected_options[1]?.option_name}
                      </p>
                    </div>
                  </div>
                  <div className='cart__products__quantity'>
                    <button
                      onClick={() =>
                        incrementCartItem(product?.id, product?.quantity)
                      }
                    >
                      <Icon name='plus' />
                    </button>
                    <span>{product?.quantity}</span>
                    <button
                      onClick={() =>
                        decrementCartItem(product?.id, product?.quantity)
                      }
                    >
                      <Icon name='minus' />
                    </button>
                  </div>
                  <div className='cart__products__price'>
                    <span>{product?.price?.formatted_with_symbol}</span>
                  </div>
                  <div className='cart__products__total'>
                    <span>{product?.line_total?.formatted_with_symbol}</span>
                  </div>
                  <Tooltip
                    title='Remove from cart'
                    aria-label='Remove from cart'
                  >
                    <button
                      className='cart__product__remove'
                      onClick={() => removeFromCart(product?.id)}
                    >
                      <Icon name='close' />
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
            <div className='cart__actions__button__container'>
              <Tooltip
                title="Can't see what you are looking for"
                aria-label='refresh cart'
              >
                <div className='cart__action__button ' onClick={refreshCart}>
                  <Icon name='refresh' />
                  <p>Refresh cart</p>
                </div>
              </Tooltip>
              <Tooltip
                title="Can't see what you are looking for"
                aria-label='refresh cart'
              >
                <div
                  className='cart__action__button empty__cart__button'
                  onClick={() => emptyCart()}
                >
                  <Icon name='delete' />
                  <p>Empty cart</p>
                </div>
              </Tooltip>
            </div>
          </CartProductsContainer>
          <CartSummary>
            <div className='cart__summary__heading'>
              <h1>Summary</h1>
              <ul>
                <li>
                  <span>Subtotal</span>
                  <span>{cartDetails?.subtotal?.formatted_with_symbol}</span>
                </li>
                <li>
                  <span>Shipping cost</span>
                  <span>₹0.00</span>
                </li>
                <li>
                  <span>Total</span>
                  <span className='total__summary'>
                    {cartDetails?.subtotal?.formatted_with_symbol}
                  </span>
                </li>
              </ul>
              <Button
                variant='contained'
                color='primary'
                className='pay__button'
                onClick={actionOnPayment}
              >
                {" "}
                Pay {cartDetails?.subtotal?.formatted_with_symbol}
              </Button>
            </div>
          </CartSummary>
        </>
      )}

      <BackdropMaker open={openBackdrop}>
        <Kawaii name='folder' mood={backdropMood} message={backdropMessage} />
      </BackdropMaker>
    </CartContainer>
  );
};

export default Cart;
