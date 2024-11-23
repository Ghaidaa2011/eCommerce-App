import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosErrorHandler } from "@utils";
import { TProduct } from "@types";
import { RootState } from "@store/index";

type TResponse = TProduct[];

const actGetAllProducts = createAsyncThunk(
  "products/actGetAllProducts",
  async (_, thunkAPI) => {
    const { getState, rejectWithValue, signal } = thunkAPI;
    const { products } = getState() as RootState;
    try {
      const { data } = await axios.get<TResponse>(
        `/products?_page=${products.page}&_sort=${products.sortBy}&_order=${products.order}&cat_prefix_like=${products.prefix}`, { signal }
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);

export default actGetAllProducts;