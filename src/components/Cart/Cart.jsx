import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Cart.scss'
import { Button, Flex, Image, Title } from '@mantine/core';
import { resetCart, updateQuantityPro } from '../../store/Reducers/Reducer';
import { useNavigate } from 'react-router';

function Cart() {
    const cart = useSelector(state => state?.products.cart)
    const mode = useSelector(state => state?.products.isDarkMode)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className={mode ? 'Cart' : 'Cart-light'}>
            <div className="container">
                <div className="Cart-block" style={{ color: mode ? 'white' : 'black' }}>
                    <div className="Cart-header">
                        <Title order={1} style={{ color: mode ? 'white' : 'black' }}>Shopping Cart</Title>
                    </div>
                    {cart.length > 0 ? (
                        <Flex
                            mih={50}
                            gap="xl"
                            justify="center"
                            align="flex-start"
                            direction="column"
                            wrap="wrap"
                        >
                            {cart.map((product) => (
                                <div className='Cart-flex-product' key={product.product.id} style={{ background: mode ? '#2e2e2e' : 'white', border: mode ? 'none' : '1px solid grey' }}>
                                    <Image
                                        radius="md"
                                        h={200}
                                        w="auto"
                                        fit="contain"
                                        src={product?.product.images[0]}
                                    />
                                    <div className='Cart-flex-product-info'>
                                        <p>{product.product.title}</p>
                                        <p className='cart-desc'>{product.product.description}</p>
                                        <p>Price: {product.product.price}$</p>
                                    </div>
                                    <div className="Cart-flex-product-navi">
                                        <Button variant="filled" color="red" onClick={() => dispatch(updateQuantityPro({
                                            id: product.product.id,
                                            status: 'minus'
                                        }))}>-</Button>
                                        <p>{product.quantity}</p>
                                        <Button variant="filled" color="blue" onClick={() => dispatch(updateQuantityPro({
                                            id: product.product.id,
                                            status: 'plus'
                                        }))}>+</Button>
                                    </div>
                                </div>
                            ))}
                            <Button color='green' onClick={() => { alert('Congratulations!! You have paid successfully'); navigate('/'); dispatch(resetCart()) }}>Checkout</Button>
                        </Flex>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cart;
