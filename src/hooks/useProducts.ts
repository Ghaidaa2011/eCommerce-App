import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  cleanUpProductsRecords,
} from "@store/products/productsSlice";
const useProducts = () => {
  const params = useParams();
  const productPrefix = params.prefix;
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishListItemsId.includes(el.id),
  }));

  useEffect(() => {
    //Instead of using Type Guarding(by if ()) use Type Custing
    const promise =  dispatch(actGetProductsByCatPrefix(params.prefix as string));
    // when i leave this page (unamount)
    return () => {
      promise.abort();
      dispatch(cleanUpProductsRecords());
    };
  }, [dispatch, params]);
  return {loading, error, productsFullInfo, productPrefix}
}
export default useProducts