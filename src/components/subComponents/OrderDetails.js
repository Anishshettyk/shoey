import React, { useState } from "react";
import styled from "styled-components";
import { theme, mixins } from "../../styles";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import { Icon } from "../index";
import { deleteOrderDetails, getUserData } from "../../lib/firestore/userData";
import { useSelector, useDispatch } from "react-redux";
import { Kawaii, BackdropMaker } from "../index";
import { setUser, makeNotification } from "../../redux";
import { Link } from "react-router-dom";

const { colors } = theme;

const OrderContainer = styled.div`
  background-color: ${colors.grey3};
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const OrderDetailsHeader = styled.div`
  ${mixins.spaceBetween};
  align-items: center;
  h6 {
    color: ${colors.white};
    background-color: ${colors.darkBlue};
    padding: 3px 8px;
    border-radius: 5px;
  }
  .delete__icon {
    padding: 6px;
    border: 1px solid ${colors.darkBlue};
    ${mixins.flexCenter}
    color: red;
    border-radius: 50%;
    font-weight: bold;
    font-size: 1.2rem;
    transition: all 0.1s ease-in-out;
    &:hover {
      background-color: ${colors.darkBlue};
      transform: scale(1.2);
    }
  }
`;

const OrderDetailsContent = styled.div``;

const OrderDetailsSummary = styled.div`
  border-top: 1px solid ${colors.grey2};
  ${mixins.spaceBetween}
  h5 {
    color: ${colors.darkBlue};
  }
  .payment__summary {
    p {
      margin-top: -10px;
      padding: 4px 10px;
      text-align: center;
      border: 2px dashed ${colors.darkBlue};
      border-radius: 5px;
      font-size: 13px;
    }
  }
  .total__summary {
    p {
      margin-top: -10px;
      font-size: 1.6rem;
      text-align: center;
      font-weight: bold;
      opacity: 0.8;
    }
  }
`;

const Product = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  margin-bottom: 20px;
  .product__details {
    display: flex;
    img {
      width: 100px;
    }
    .details {
      margin-left: 20px;
      .details__additional {
        font-size: 12px;
        span {
          margin: 3px;
          padding: 3px 8px;
          color: ${colors.black};
          border-radius: 5px;
          border: 1px dashed ${colors.darkBlue};
          font-weight: 400;
        }
      }
    }
  }
  .product__status {
    ${mixins.flexCenter};
    p {
      text-align: center;
      font-size: 13px;
      color: ${colors.black};
      font-weight: bold;
      background-color: ${colors.green};
      padding: 5px 8px;
      border-radius: 5px;
    }
  }
`;

const NoOrders = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  a {
    margin-top: 10px;
    padding: 10px 20px;
    border-radius: 20px;
    background-color: ${colors.darkBlue};
    color: ${colors.white};
  }
`;

const OrderDetails = ({ orderDetails }) => {
  const [backdrop, setBackdrop] = useState(false);

  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);
  const deleteOrder = async (date) => {
    setBackdrop(true);
    const currentOrder = orderDetails.filter(
      (orderDetails) => orderDetails.date === date
    );
    const response = await deleteOrderDetails(
      userDetails.email,
      currentOrder[0]
    );
    if (response.status === "success") {
      const userDetailsResponse = await getUserData(userDetails);
      dispatch(setUser(userDetailsResponse));
      setBackdrop(false);
      dispatch(
        makeNotification({
          message: response.message,
          variant: "success",
          duration: 3000,
        })
      );
    } else {
      setBackdrop(false);
      dispatch(
        makeNotification({
          message: response?.error,
          variant: "error",
          duration: 2000,
        })
      );
    }
  };

  return (
    <div>
      {orderDetails?.length > 0 ? (
        <>
          {orderDetails?.map((order, i) => (
            <OrderContainer key={i}>
              <OrderDetailsHeader>
                <h6>{moment(order.date).format("Do MMM YYYY")}</h6>
                <Tooltip title='Cancel order'>
                  <button
                    className='delete__icon'
                    onClick={() => deleteOrder(order.date)}
                    value={order.date}
                  >
                    <Icon name='delete' />
                  </button>
                </Tooltip>
              </OrderDetailsHeader>
              <OrderDetailsContent>
                {order?.orders?.map((product, i) => (
                  <Product key={i}>
                    <div className='product__details'>
                      <img src={product.imageurl} alt={product.name} />
                      <div className='details'>
                        <h5>{product.name}</h5>
                        <div className='details__additional'>
                          <span>
                            {product.quantity} unit X {product.price}
                          </span>
                          <span>size {product.size}</span>
                          <span>color {product.color}</span>
                        </div>
                      </div>
                    </div>
                    <div className='product__status'>
                      <p>order received</p>
                    </div>
                  </Product>
                ))}
              </OrderDetailsContent>
              <OrderDetailsSummary>
                <div className='payment__summary'>
                  <h5>Payment successful</h5>
                  <p>With card XX4242</p>
                </div>
                <div className='total__summary'>
                  <h5>Order total</h5>
                  <p>{order.total}</p>
                </div>
              </OrderDetailsSummary>
            </OrderContainer>
          ))}
        </>
      ) : (
        <NoOrders>
          <Kawaii
            name='ghost'
            mood='blissful'
            message="You don't have any orders"
          />
          <Link to='/men'>Shop for men</Link>
        </NoOrders>
      )}
      <BackdropMaker open={backdrop}>
        <Kawaii name='file' mood='blissful' message='Processing your request' />
      </BackdropMaker>
    </div>
  );
};

export default OrderDetails;
