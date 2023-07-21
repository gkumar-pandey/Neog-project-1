import React from "react";
import "./ProductCard.css";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart
} from "react-icons/ai";
import { useWishlist } from "../../Context/WishlistContext/WishlistContext";
import { getProductById } from "../../Utils";
import { useAuth, useCart } from "../../Context";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const {
    productName,
    image,
    alt,
    description,
    price,
    oldPrice,
    discount,
    rating,
    inStock,
    _id
  } = props;

  const {
    addToWishlistHandler,
    removeFromWishlistHandler,
    wishlistProductState: { products }
  } = useWishlist();
  const { cartState, addToCartHandler } = useCart();
  const { isUserLoggedIn } = useAuth();

  const isProdAvailableInWishlist = getProductById(products, _id);
  const isProdAvailableInCart = getProductById(cartState.products, _id);

  return (
    <>
      <div className="product_card px-1 d-flex flex-col justify-between ">
        <Link to={`/product/${_id}`}>
          <div className="product_img_container relative  ">
            <img className="product_img" src={image} alt={alt} />
            <p className="product_card_rating ">{rating}</p>
          </div>
        </Link>

        <div className="product_info   ">
          <p className="product_name">{productName}</p>
          <p className="product_description">{description}</p>
          <p className="product_price">
            {price} <span className="product_old_price">{oldPrice}</span>
          </p>
        </div>
        {!inStock ? (
          <button className=" solid-btn btn-disable ">Out of stock</button>
        ) : isProdAvailableInCart ? (
          <Link to={"/cart"} className="link">
            <button className="product_btn d-flex items-center justify-center w-full solid-btn">
              Go to cart
            </button>
          </Link>
        ) : (
          <button
            onClick={() => addToCartHandler(props)}
            className="product_btn d-flex items-center justify-center w-full solid-btn"
          >
            <AiOutlineShoppingCart className="icon" />
            Add to cart
          </button>
        )}

        {isProdAvailableInWishlist && isUserLoggedIn ? (
          <AiFillHeart
            className="wishlist_icon heart_fill"
            onClick={() => removeFromWishlistHandler(props)}
          />
        ) : (
          <AiOutlineHeart
            className="wishlist_icon"
            onClick={() => addToWishlistHandler(props)}
          />
        )}

        {!inStock && (
          <div className="out_of_stock_label">
            <p>Out of Stock</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;
