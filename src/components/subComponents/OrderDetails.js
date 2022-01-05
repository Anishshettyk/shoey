import React from "react";
import styled from "styled-components";
import { theme, mixins } from "../../styles";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import { Icon } from "../index";

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
  }
`;

const OrderDetailsContent = styled.div``;

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
      padding: 3px 8px;
      border-radius: 5px;
    }
  }
`;

const OrderDetails = ({ orderDetails }) => {
  return (
    <div>
      {orderDetails ? (
        <>
          {orderDetails?.map((order, i) => (
            <OrderContainer key={i}>
              <OrderDetailsHeader>
                <h6>{moment(order.date).format("Do MMM YYYY")}</h6>
                <Tooltip title='Cancel order'>
                  <div className='delete__icon'>
                    <Icon name='delete' />
                  </div>
                </Tooltip>
              </OrderDetailsHeader>
              <OrderDetailsContent>
                {order?.orders?.map((product) => (
                  <Product key={product.id}>
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
            </OrderContainer>
          ))}
        </>
      ) : (
        <p>no details</p>
      )}
    </div>
  );
};

export default OrderDetails;
