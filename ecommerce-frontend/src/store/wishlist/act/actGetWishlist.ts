import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosErrorHandler} from "@utils";
import { TProduct } from "@types";
import { RootState } from "@store/index";

type TDataType = "productsFullInfo" | "ProductIds";
type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (DataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState} = thunkAPI;
    const {auth} = getState() as RootState;

    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`, {signal}
      );

      if (!userWishlist.data.length) {
        return {data: [], dataType: "empty"};
      }

      if(DataType==="ProductIds"){
        const concatenatedItemsId = userWishlist.data.map((el) => el.productId);
        return {data: concatenatedItemsId, dataType: "ProductIds"};
      }else{
        const concatenatedItemsId = userWishlist.data
        .map((el) => `id=${el.productId}`)
        .join("&");

      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`
      );
      return {data: response.data, dataType: "productsFullInfo"};
      }
      
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;