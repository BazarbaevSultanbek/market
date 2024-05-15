import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {


        searchCountry(state, action) {
            return state.filter((item) =>
                item.name.common.toLowerCase().startsWith(action.payload.text.toLowerCase())
            );
        },
    },
});

export const { setProducts, searchCountry } = productsSlice.actions;
export default productsSlice.reducer;