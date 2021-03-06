import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "../../components";
import { theme } from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Kawaii, BackdropMaker } from "../index";
import {
  makeNotification,
  setProfileTab,
  setUser,
  storeToCart,
} from "../../redux";
import { useHistory } from "react-router-dom";
import { addOrderDetails, getUserData } from "../../lib/firestore/userData";
import commerce from "../../lib/commerce";

import payment__stock__image from "../../images/pngs/payment__stock.jpg";

const { colors } = theme;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "30px 80px",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  wrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "10px",
    width: "100%",
  },
  button: {
    maxWidth: "50%",
    margin: "20px auto",
    padding: "20px",
  },
}));

const PaymentContainer = styled.section`
  height: 87vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1.3fr 2fr;
  position: relative;
`;
const PaymentImageContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  img {
    height: 100%;
    width: 100%;
    background-size: contain;
  }
  .overlap__content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    a {
      position: absolute;
      top: 20px;
      left: 10px;
      display: flex;
      align-items: center;
      color: ${colors.grey3};
      svg {
        font-size: 1.5rem;
      }
    }
    .content__headings {
      position: absolute;
      bottom: 30px;
      left: 10px;
      h1 {
        font-size: 5rem;
        color: ${colors.grey3};
        font-weight: 900;
      }
      h3 {
        font-size: 2.5rem;
        font-weight: 900;
      }
    }
  }
`;

const PaymentDetails = styled.div`
  .cart__summary__container {
    background-color: ${colors.lightBlue};
    padding: 30px;
    h6 {
      font-size: 0.8rem;
      text-transform: uppercase;
      opacity: 0.5;
    }
    .cart__summary {
      .cart__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: ${colors.black};

        h6 {
          opacity: 1;
          font-size: 0.6rem;
          text-transform: normal;
        }
        p {
          font-size: 0.6rem;
        }
      }
    }
  }

  .button__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expires, setExpires] = useState("");
  const [cvv, setCvv] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const { cartDetails } = useSelector((state) => state.cart);
  const { userDetails } = useSelector((state) => state.user);
  const classes = useStyles();

  useEffect(() => {
    setDisabled(true);
    if (
      cardNumber.length === 16 &&
      cardName.length > 0 &&
      expires > 0 &&
      expires < 36 &&
      cvv.length === 3
    ) {
      setDisabled(false);
    }
  }, [cardNumber, cardName, expires, cvv]);

  useEffect(() => {
    const qurateCartDetails = (cartDetails) => {
      const modifiedDetails = cartDetails?.line_items?.map((lineItem) => {
        const objectToStore = {
          name: lineItem?.name,
          quantity: lineItem?.quantity,
          price: lineItem?.line_total?.formatted_with_symbol,
          id: lineItem?.product_id,
          imageurl: lineItem?.image?.url,
          size: lineItem?.selected_options[0]?.option_name,
          color: lineItem?.selected_options[1]?.option_name,
          category: lineItem?.sku,
        };
        return objectToStore;
      });

      setOrderDetails({
        date: Date.now(),
        orders: modifiedDetails,
        total: cartDetails?.subtotal?.formatted_with_symbol,
      });
    };

    qurateCartDetails(cartDetails);
  }, [cartDetails]);

  const handlePayment = async () => {
    setOpenBackdrop(true);

    //start loader
    //if card details are valid then process payment
    if (cardNumber === "4242424242424242" && cvv === "311") {
      const response = await addOrderDetails(userDetails.email, orderDetails);
      const userDetailsResponse = await getUserData(userDetails);
      const cartResponse = await commerce.cart.empty();

      if (
        response.status === "success" &&
        userDetailsResponse &&
        cartResponse?.success
      ) {
        dispatch(setUser(userDetailsResponse));

        dispatch(storeToCart(cartResponse?.cart));
        setOpenBackdrop(false);
        dispatch(
          makeNotification({
            message: `payment successful`,
            variant: "success",
            duration: 2000,
          })
        );
        dispatch(setProfileTab(2));
        setTimeout(() => {
          dispatch(
            makeNotification({
              message: `You can view your order now`,
              variant: "info",
              duration: 2000,
            })
          );
          history.push("/profile");
        }, 2000);
      } else {
        setOpenBackdrop(false);
        dispatch(
          makeNotification({
            message: `Error occured in payment. please try again`,
            variant: "error",
            duration: 2000,
          })
        );
      }
      setOpenBackdrop(false);
    } else {
      setTimeout(() => {
        setOpenBackdrop(false);
        dispatch(
          makeNotification({
            message: `card details are invalid`,
            variant: "error",
            duration: 2000,
          })
        );
      }, 3000);
    }
    //else show error message and keep user in same page
    //end loader
  };

  return (
    <>
      <PaymentContainer>
        <PaymentImageContainer>
          <img src={payment__stock__image} alt='upright shoe' />
          <div className='overlap__content'>
            <Link to='/cart'>
              <Icon name='arrowBackSmall' />
              <span>Back to cart</span>
            </Link>
            <div className='content__headings'>
              <h1>
                Shoey <br /> payment
              </h1>
              <h3>{cartDetails.subtotal.formatted_with_symbol}</h3>
            </div>
          </div>
        </PaymentImageContainer>
        <PaymentDetails>
          <div className='cart__summary__container'>
            <h6>checkout summary</h6>
            <div className='cart__summary'>
              {cartDetails?.line_items.map((item) => (
                <div className='cart__item' key={item?.id}>
                  <h6>{item?.name}</h6>
                  <p>
                    {item?.price?.formatted_with_symbol} X {item?.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className={classes.root}>
            <TextField
              value={cardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
              fullWidth
              variant='outlined'
              label='card number'
              type='number'
            />
            <TextField
              value={cardName}
              onChange={(event) => setCardName(event.target.value)}
              fullWidth
              variant='outlined'
              label='card holder name'
              type='text'
            />
            <div className={classes.wrapper}>
              <TextField
                value={expires}
                onChange={(event) => setExpires(event.target.value)}
                fullWidth
                variant='outlined'
                label='Expires in (months)'
                type='number'
              />
              <TextField
                value={cvv}
                onChange={(event) => setCvv(event.target.value)}
                fullWidth
                variant='outlined'
                label='cvv'
                type='number'
              />
            </div>
            <div className='button__wrapper'>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.button}
                disabled={disabled}
                onClick={handlePayment}
              >
                Pay {cartDetails.subtotal.formatted_with_symbol}
              </Button>
            </div>
          </div>
        </PaymentDetails>
      </PaymentContainer>
      <BackdropMaker open={openBackdrop}>
        <Kawaii
          name='folder'
          mood='blissful'
          message='processing your payment'
        />
      </BackdropMaker>
    </>
  );
};

export default Payment;
