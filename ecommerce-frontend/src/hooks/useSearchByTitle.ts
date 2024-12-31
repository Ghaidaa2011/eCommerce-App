import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetSearchProducts,
  cleanUpProductsRecords,
} from "@store/products/productsSlice";

const useSearchByTitle = (title: string) => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  const [debouncedTitle, setDebouncedTitle] = useState(title);

  // Debounce title updates
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitle(title);
    }, 800); // Debounce delay of 1 second

    return () => clearTimeout(handler);
  }, [title]);

  // Fetch products based on the debounced title
  useEffect(() => {
    if (debouncedTitle.trim() === "") {
      dispatch(cleanUpProductsRecords());
      return;
    }

    const promise = dispatch(actGetSearchProducts(debouncedTitle));

    return () => {
      promise.abort();
      dispatch(cleanUpProductsRecords());
    };
  }, [dispatch, debouncedTitle]);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishListItemsId.includes(el.id),
    isAuthenticated: !!userAccessToken,
  }));

  return { loading, error, productsFullInfo };
};

export default useSearchByTitle;
