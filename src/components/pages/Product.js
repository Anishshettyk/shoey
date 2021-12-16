import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useHistory } from "react-router-dom";
import commerce from "../../lib/commerce";
import styled from "styled-components";
import { theme, mixins } from "../../styles";
import { Icon, Kawaii, BackdropMaker } from "../index";
import { Helmet } from "react-helmet";
import {
  addWishedProducts,
  getUserData,
  removeWishedProducts,
} from "../../lib/firestore/userData";
import { useSelector, useDispatch } from "react-redux";
import { makeNotification, setUser, storeToCart } from "../../redux";
import { Skeleton } from "@material-ui/lab";
import { FindYouMayAlsoLike } from "../../functions";

const { colors } = theme;
const ProductContainer = styled.section`
  margin: 20px 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;
const ProductActionContainer = styled.div`
  .product__action__image__container {
    width: 100%;
    height: 70vh;
    overflow: hidden;
    img {
      width: 100%;
      object-fit: contain;

      height: 100%;
    }
  }

  .product__button__container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
    margin: 20px 50px;
    button {
      padding: 15px 0px;
      border: none;
      outline: none;
      font-size: 16px;
      letter-spacing: 0.4px;
      font-weight: 600;
      border-radius: 5px;
      svg {
        margin-right: 10px;
      }
    }
    .product__wishlist__button {
      border: 1px solid ${colors.grey1};
      background-color: transparent;
      color: ${colors.textColor};
      letter-spacing: 0.7px;
      &:hover {
        border: 1px solid ${colors.textColor};
        opacity: 0.9;
      }
    }
    .product__cart__button {
      background-color: ${colors.blue};
      color: ${colors.white};
      border: 2px solid ${colors.blue};
      &:hover {
        opacity: 0.9;
      }
    }
  }
`;
const ProductDetailsContainer = styled.div`
  .product__back__link {
    color: ${colors.blue};
    padding: 10px 20px;
    background-color: ${colors.grey3};
    border-radius: 30px;
    font-size: 13px;
    svg {
      margin-right: 10px;
    }
    &:hover {
      opacity: 0.8;
    }
  }
  .product__section__heading {
    font-size: 16px;
    margin: 30px 0;
    padding-bottom: 5px;
    border-bottom: 1px solid ${colors.grey1};
    color: ${colors.textColor};
    letter-spacing: 1.5px;
    svg {
      margin-right: 10px;
      font-size: 25px;
    }
    span {
      opacity: 0.6;
    }
  }
  .product__title {
    color: ${colors.textColor};
    font-size: 1.5rem;
  }
  .product__price {
    color: ${colors.grey2};
    font-weight: 900;
  }
  .product__tax {
    color: ${colors.green};
    font-weight: bold;
    margin-top: -15px;
    font-size: 13px;
  }
  .product__images {
    margin-top: 20px;
    display: grid;
    grid-auto-rows: auto;
    grid-auto-columns: max-content;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-gap: 20px;

    .product__image__container {
      max-width: 150px;
      overflow: hidden;
      border: 1px solid ${colors.grey3};
      box-shadow: ${mixins.shadowSpread};
      transition: all 0.3s ease-out 0s;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.3s ease-out 0s;
      }

      .product__image__banner {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-align: center;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.4);
        display: none;
        p {
          color: ${colors.white};
          padding: 4px 8px;
          background-color: ${colors.textColor};
          border-radius: 20px;
          font-size: 12px;
        }
      }
      &:hover {
        transform: translateY(-5px);
        img {
          transform: scale(1.15);
        }
        .product__image__banner {
          display: flex;
        }
      }
    }
    .color__checked {
      .product__image__banner {
        display: flex;
        p {
          background-color: ${colors.blue};
          font-weight: 500;
        }
      }
    }
  }
  .product__description {
    font-size: 15px;
    color: ${colors.textColor};
    opacity: 0.8;
  }
  .product__sizes {
    display: grid;
    grid-auto-rows: auto;
    grid-auto-columns: max-content;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    text-align: center;
    grid-gap: 20px;
    .product__size {
      padding: 12px;
      border: 1px solid ${colors.grey1};
      color: ${colors.textColor};
      border-radius: 5px;
      box-shadow: ${mixins.shadow};
      cursor: pointer;
      &:hover {
        border-color: ${colors.textColor};
      }
    }
    .size__checked {
      background-color: ${colors.blue};
      color: ${colors.white};
      border: none;
    }
  }
`;

const Product = () => {
  const [product, setProduct] = useState(null);
  const [productSizes, setProductSizes] = useState(null);
  const [productColors, setProductColors] = useState(null);
  const [imageToShow, setImageToShow] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [backdropMessage, setbackdropMessage] = useState(
    "We are working on it..."
  );
  const [wishlistedProduct, setWishlistedProduct] = useState(false);

  const path = useParams();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);
  const { email, uid, wishlist } = userDetails;

  const backdropOpen = () => {
    setOpenBackdrop(!openBackdrop);
  };
  const backdropClose = () => {
    setOpenBackdrop(false);
  };

  useEffect(() => {
    if (path) {
      fetchProductDeatils(path.product_id);
      FindYouMayAlsoLike(path.product_id);
    }
  }, [path]);

  useEffect(() => {
    if (path.product_id && allProducts?.length > 0) {
      const res = FindYouMayAlsoLike(path.product_id);
      console.log(res);
    }
  }, [path, allProducts]);

  useEffect(() => {
    if (path) {
      const checkWishlistHasProduct = (productId) => {
        const filteredWishlist = wishlist?.filter(
          (wishedProductId) => wishedProductId !== productId
        );
        if (filteredWishlist?.length === wishlist?.length) {
          setWishlistedProduct(false);
        } else {
          setWishlistedProduct(true);
        }
      };
      checkWishlistHasProduct(path.product_id);
    }
  }, [path, wishlist]);

  const fetchProductDeatils = async (productID) => {
    const response = await commerce.products.retrieve(productID);
    if (response) {
      setProduct(response);
      setImageToShow(response?.assets[0].url);
      const requiredSizes = response?.variant_groups?.filter(
        (variantGroup) => variantGroup.name === "size"
      )[0];
      const requiredColors = response?.variant_groups?.filter(
        (variantGroup) => variantGroup.name === "color"
      )[0];

      const modifiedSizes = requiredSizes?.options.map((size) => ({
        ...size,
        checked: false,
      }));

      const modifiedColors = requiredColors?.options?.map((option) => {
        const productPic = response?.assets?.find(
          (asset) => asset.id === option.assets.find((asset) => asset)
        );
        return { ...option, productPic, checked: false };
      });

      setProductColors(modifiedColors);
      setProductSizes(modifiedSizes);
    }
  };
  const selectColor = (selectedProduct) => {
    setImageToShow(selectedProduct?.productPic?.url);
    const clearSizes = productColors.map((product) =>
      product.id !== selectedProduct.id
        ? { ...product, checked: false }
        : product
    );
    setProductColors(
      clearSizes.map((product) =>
        product.id === selectedProduct.id
          ? { ...product, checked: !selectedProduct.checked }
          : product
      )
    );
  };

  const selectSize = (selectedSize) => {
    const clearSizes = productSizes.map((individualSize) =>
      individualSize.id !== selectedSize.id
        ? { ...individualSize, checked: false }
        : individualSize
    );

    setProductSizes(
      clearSizes.map((individualSize) =>
        individualSize.id === selectedSize.id
          ? { ...individualSize, checked: !individualSize.checked }
          : individualSize
      )
    );
  };

  const manageProductWishlist = async (email, productId) => {
    //if user is present then only add product to wishlist
    if (uid) {
      let response;
      if (wishlistedProduct) {
        setbackdropMessage("Removing from wishlist...");
        backdropOpen();
        response = await removeWishedProducts(email, productId);
      } else {
        setbackdropMessage("Adding to wishlist...");
        backdropOpen();
        response = await addWishedProducts(email, productId);
      }
      //retrive user details back
      const userDataRes = await getUserData(userDetails);
      dispatch(setUser(userDataRes));
      backdropClose();
      if (response.status === "error") {
        dispatch(
          makeNotification({
            message: response.message,
            variant: response.status,
            duration: 1500,
          })
        );
      }
      //otherwise push to signup page
    } else {
      dispatch(
        makeNotification({
          message: "Please sign in before adding product to wishlist",
          variant: "info",
          duration: 3000,
        })
      );
      history.push("/signin");
    }
  };

  const manageProductCart = async (productId) => {
    const initialQuantity = 1;
    if (uid) {
      setbackdropMessage("Adding to cart...");
      backdropOpen();
      const selectedSize = productSizes?.filter(
        (size) => size?.checked === true
      );
      const selectedColor = productColors?.filter(
        (size) => size?.checked === true
      );

      if (selectedSize?.length !== 0 && selectedColor?.length !== 0) {
        const sizeVarient = product?.variant_groups?.filter(
          (variantGroup) => variantGroup.name === "size"
        )[0];
        const colorVarient = product?.variant_groups?.filter(
          (variantGroup) => variantGroup.name === "color"
        )[0];

        const res = await commerce.cart.add(productId, initialQuantity, {
          [sizeVarient?.id]: selectedSize[0]?.id,
          [colorVarient?.id]: selectedColor[0]?.id,
        });
        dispatch(storeToCart(res?.cart));
      } else {
        if (selectedSize.length === 0) {
          dispatch(
            makeNotification({
              message: "Please select desired size",
              variant: "warning",
              duration: 2000,
            })
          );
        } else {
          dispatch(
            makeNotification({
              message: "Please select desired color",
              variant: "warning",
              duration: 2000,
            })
          );
        }
      }

      // const res = await commerce.cart.empty();
      backdropClose();
    } else {
      dispatch(
        makeNotification({
          message: "Please sign in before adding product to cart",
          variant: "info",
          duration: 3000,
        })
      );
      history.push("/signin");
    }
  };

  return (
    <ProductContainer>
      <Helmet>
        <title>{`Shoey - ${
          product === null ? "View product" : product.name
        }`}</title>
      </Helmet>
      <ProductActionContainer>
        <div className='product__action__image__container'>
          {imageToShow === null ? (
            <Skeleton width='100%' height='100%' />
          ) : (
            <img src={imageToShow} alt='product display' />
          )}
        </div>

        <div className='product__button__container'>
          {product === null ? (
            <Skeleton width='100%' height='70px' />
          ) : (
            <button
              className='product__wishlist__button'
              onClick={() => manageProductWishlist(email, product.id)}
            >
              <Icon name='heart' />
              {wishlistedProduct ? "Remove from wishlist" : "Add to wishlist"}
            </button>
          )}
          {product === null ? (
            <Skeleton width='100%' height='70px' />
          ) : (
            <button
              className='product__cart__button'
              onClick={() => manageProductCart(product.id)}
            >
              <Icon name='Cart' />
              Add to cart
            </button>
          )}
        </div>
      </ProductActionContainer>
      <ProductDetailsContainer>
        {product ? (
          <>
            <Link
              to={`/${location.pathname.split("/")[1]}`}
              className='product__back__link'
            >
              <Icon name='arrowBack' />
              Back to shopping list
            </Link>

            <h1 className='product__title'>{product.name}</h1>
            <h2 className='product__price'>Rs. {product.price.formatted}</h2>
            <p className='product__tax'>inclusive of all taxes</p>
            <h5 className='product__section__heading'>
              <Icon name='gallery' />
              Select color{" "}
              <span>({productColors ? productColors?.length : "0"})</span>
            </h5>
            <div className='product__images'>
              {productColors?.map((product, i) => (
                <div
                  className={`product__image__container ${
                    product.checked === true ? "color__checked" : ""
                  }`}
                  key={i}
                  onClick={() => selectColor(product)}
                >
                  <img
                    src={product.productPic.url}
                    alt={product.productPic.filename}
                  />
                  <div className='product__image__banner'>
                    <p>{product.checked ? `Selected` : "Cick to select"}</p>
                  </div>
                </div>
              ))}
            </div>
            <h5 className='product__section__heading'>
              <Icon name='size' />
              Select size{" "}
              <span>({productSizes ? productSizes.length : "0"})</span>
            </h5>
            <div className='product__sizes'>
              {productSizes
                ? productSizes.map((size) => (
                    <div
                      className={`product__size ${
                        size.checked === true ? "size__checked" : ""
                      }`}
                      key={size.id}
                      onClick={() => selectSize(size)}
                    >
                      <p>{size.name}</p>
                    </div>
                  ))
                : null}
            </div>
            <h5 className='product__section__heading'>
              <Icon name='description' />
              Product description
            </h5>
            <p
              className='product__description'
              contentEditable='false'
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </>
        ) : null}
      </ProductDetailsContainer>
      <BackdropMaker open={openBackdrop}>
        <Kawaii name='folder' mood='blissful' message={backdropMessage} />
      </BackdropMaker>
    </ProductContainer>
  );
};

export default Product;
