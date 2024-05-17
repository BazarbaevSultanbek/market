import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        allProducts: [],
        products: [],
        categories: [],
        users: []
    },
    reducers: {
        setUpStates(state, action) {
            state.allProducts = action.payload.products;
            state.products = action.payload.products;
            state.categories = action.payload.categories;
        },

        searchCountry(state, action) {
            const filteredProducts = state.allProducts.filter((item) =>
                item.title.toLowerCase().includes(action.payload.text.toLowerCase())
            );
            state.products = filteredProducts;
        },

        filterCategory(state, action) {
            const { category } = action.payload;
            if (category === 'All') {
                state.products = state.allProducts;
            } else {
                const filteredProducts = state.allProducts.filter((item) =>
                    item.category.name === category
                );
                state.products = filteredProducts;
            }
        },
    },
});

export const { setUpStates, searchCountry, filterCategory } = productsSlice.actions;
export default productsSlice.reducer;
