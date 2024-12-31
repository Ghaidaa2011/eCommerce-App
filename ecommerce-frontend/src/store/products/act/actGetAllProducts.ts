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

    // Conditionally build the URL based on prefix
    const url = products.prefix && products.prefix !== "All"
      ? `/products?_page=${products.page}&_sort=${products.sortBy}&_order=${products.order}&cat_prefix=${products.prefix}`
      : `/products?_page=${products.page}&_sort=${products.sortBy}&_order=${products.order}`;

    try {
      const { data } = await axios.get<TResponse>(url, { signal });
      return data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);

export default actGetAllProducts;
