import { TDeck } from "../../../utils/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetDecks, fetchUpdateFlashCardFavorite, fetchUpdateFlashCardQA } from "../actions";

interface DecksState {
  decks: TDeck[],
  isLoading: boolean,
  error: string | null;
}

const initialState: DecksState = {
  decks: [],
  isLoading: false,
  error: null
}

const decksSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    toggleFavoriteDeck: (state, action: PayloadAction<string>) => {
      const selectedDeckIndex = state.decks.findIndex(deck => deck.id === action.payload);
      if (selectedDeckIndex !== -1) {
        state.decks[selectedDeckIndex].favorite = !state.decks[selectedDeckIndex].favorite;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetDecks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchGetDecks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Произошла ошибка во время загрузки модулей';
    });
    builder.addCase(fetchGetDecks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.decks = action.payload ?? [];
    });
    builder.addCase(fetchUpdateFlashCardQA.fulfilled, (state, action) => {
      const updatedDeck = action.payload;
      const index = state.decks.findIndex(deck => deck.id === updatedDeck.id);
      if(index !== -1){
        state.decks[index] = updatedDeck;
      }
    });
    builder.addCase(fetchUpdateFlashCardFavorite.fulfilled, (state, action) => {
      const updatedDeck = action.payload;
      const index = state.decks.findIndex(deck => deck.id === updatedDeck.id);
      if(index !== -1){
        state.decks[index] = updatedDeck;
      }
    });
  }
});

export const { toggleFavoriteDeck } = decksSlice.actions;
export default decksSlice.reducer;
