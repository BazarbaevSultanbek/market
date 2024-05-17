import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './Reducers/Reducer';

const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});

export default store;
