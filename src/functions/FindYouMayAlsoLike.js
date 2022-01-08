import { store } from "../redux";
import { shuffleArray } from "../utils";

const FindYouMayAlsoLike = (currentProductId, category, limit = 10) => {
  const state = store.getState();

  const allProducts = state.products.allProducts;
  const productToShuffle = allProducts.filter(
    (product) => product.id !== currentProductId && product.sku === category
  );
  const shuffledArray = shuffleArray(productToShuffle);

  return shuffledArray.slice(0, limit);
};

export default FindYouMayAlsoLike;
