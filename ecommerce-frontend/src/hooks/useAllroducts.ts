import { ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetAllProducts,
  cleanUpProductsRecords,
  setOrder,
  setPage,
  setPrefix,
  setSortBy,
} from "@store/products/productsSlice";
const useAllProducts = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records, page, sortBy, order, prefix } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId);
  const userAccessToken = useAppSelector(state => state.auth.accessToken)

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishListItemsId.includes(el.id),
    isAuthenticated: userAccessToken ? true : false
  }));
  //Pagination
  const clickPrev = () => dispatch(setPage(page - 1));
  const clickNext = () => dispatch(setPage(page + 1));
  //Selector
  const onChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const [sort, ord] = e.target.value.split("-");
    dispatch(setSortBy(sort));
    dispatch(setOrder(ord));
  };
  //Checkbox
  const handleChangeCheck = (category: string, isChecked: boolean) => {
    if (isChecked) {
      dispatch(setPrefix(category));
    } else {
      dispatch(setPrefix(""));
    }
  };
  useEffect(() => {
    const promise = dispatch(actGetAllProducts());
    return () => {
      promise.abort();
      dispatch(cleanUpProductsRecords());
    };
  }, [dispatch, page, sortBy, order, prefix]);
  return { loading, error, productsFullInfo, clickPrev, clickNext, page, records, onChangeSort, sortBy, order, prefix, dispatch, handleChangeCheck }
}
export default useAllProducts;