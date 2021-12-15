import { store } from "../redux";
import { shuffleArray } from "../utils";

const FindYouMayAlsoLike = (currentProductId, limit = 10) => {
  const state = store.getState();

  const allProducts = state.products.allProducts;
  const productToIgnore = allProducts.filter(
    (product) => product.id !== currentProductId
  );
  const shuffledArray = shuffleArray(productToIgnore);

  return shuffledArray.slice(0, limit);
};

export default FindYouMayAlsoLike;
