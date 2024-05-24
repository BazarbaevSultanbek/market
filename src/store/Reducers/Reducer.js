import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        currentUser: null,
        users: [],
        allProducts: [],
        products: [],
        categories: [],
        isDarkMode: false,
        cart: []
    },
    reducers: {
        setUpStates(state, action) {
            state.allProducts = action.payload.products;
            state.products = action.payload.products;
            state.categories = action.payload.categories;
            state.users = action.payload.users;
        },
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },

        searchCountry(state, action) {
            const filteredProducts = state.allProducts.filter((item) =>
                item.title.toLowerCase().includes(action.payload.text.toLowerCase())
            );
            state.products = filteredProducts;
        },
        setTheme(state, action) {
            state.isDarkMode = action.payload.mode;
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

        /// cart functions 

        addToCart(state, action) {
            return {
                ...state,
                cart: [
                    ...state.cart,
                    {
                        product: action.payload.product,
                        quantity: action.payload.quantity,
                    }
                ]
            }
        },
        updateQuantityPro(state, action) {
            const item = state.cart.find(item => item.product.id === action.payload.id);
            if (action.payload.status === 'plus') {
                item.quantity++;
            } else if (action.payload.status === 'minus') {
                item.quantity--;
                if (item.quantity <= 0) {
                    state.cart = state.cart.filter(cartItem => cartItem.product.id !== action.payload.id);
                }
            }
        },
        resetCart(state, action) {
            state.cart = [];
        },




        //// User controlling

        addUser(state, action) {
            return {
                ...state,
                users: [
                    ...state.users,
                    {
                        id: action.payload.user.id, // Ensure the correct field from API response
                        name: action.payload.user.name,
                        email: action.payload.user.email,
                        password: action.payload.user.password,
                        role: action.payload.user.role,
                        avatar: action.payload.user.avatar
                    }
                ]
            };
        },
        deleteUser(state, action) {
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload.id),
            }
        },

        /// end code


        //// Category controlling

        addCategory(state, action) {
            return {
                ...state,
                categories: [
                    ...state.categories,
                    {
                        id: action.payload.newCategory.id, // Ensure the correct field from API response
                        name: action.payload.newCategory.name,
                        image: action.payload.user.image
                    }
                ]
            };
        },


        deleteCategory(state, action) {
            return {
                ...state,
                categories: state.categories.filter((category) => category.id !== action.payload.id),
            }
        },
        /// end code

        /// Product controlling

        addProduct(state, action) {
            state.products.push(action.payload.newProduct);
        },

        deleteProduct(state, action) {
            return {
                ...state,
                products: state.products.filter((product) => product.id !== action.payload.id),
            }
        },


    },
});







export const { setUpStates,setCurrentUser, searchCountry, addProduct, filterCategory, setTheme, addToCart, resetCart, deleteUser, updateQuantityPro, addUser, addCategory, deleteCategory, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
