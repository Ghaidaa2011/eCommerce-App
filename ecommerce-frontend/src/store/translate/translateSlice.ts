import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TranslateState {
  language: string;
  direction: string;
  EnLang: boolean;
}

const initialState: TranslateState = {
  language: "en", // Default language is English
  direction: "ltr", // Default direction for English
  EnLang: true, // Default to English
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    changeLanguage(state, action: PayloadAction<{ lang: string }>) {
      const { lang } = action.payload;
      state.language = lang;
      state.direction = lang === "ar" ? "rtl" : "ltr";
      state.EnLang = !state.EnLang;

      // Update HTML attributes
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", state.direction);

    },
  },
});

export const { changeLanguage } = translateSlice.actions;
export default translateSlice.reducer;
