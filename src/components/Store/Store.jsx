import { ExportOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from '@mantine/carousel';
import { Button, Card, Group, Image, Pagination, Text } from '@mantine/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, filterCategory, setUpStates, updateQuantityPro } from '../../store/Reducers/Reducer';



function Store() {
    const products = useSelector((state) => state.products.products);
    const categories = useSelector((state) => state.products.categories);
    const mode = useSelector(state => state.products.isDarkMode);
    const cart = useSelector(state => state.products.cart)
    const dispatch = useDispatch();


    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(9);
    const [active, setActive] = useState('All');


    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = products.slice(indexOfFirst, indexOfLast);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchData = async () => {
            const answer = await axios.get('https://api.escuelajs.co/api/v1/users?limit=50')
            const response = await axios.get('https://api.escuelajs.co/api/v1/products');
            const res = await axios.get('https://api.escuelajs.co/api/v1/categories');
            dispatch(setUpStates({ users:answer.data,products: response.data, categories: res.data }));
        };
        fetchData();
    }, [dispatch]);

    const data = categories.map((item, index) => ({
        link: '',
        label: item.name,
        id: index,
    }));
    const handleCategoryClick = (categoryName) => {
        setActive(categoryName);
        dispatch(filterCategory({ category: categoryName }));
    };
    const links = [
        <a
            className={'link'}
            data-active={active === 'All' || undefined}
            href=""
            key="All"
            onClick={(e) => { e.preventDefault(); handleCategoryClick('All'); }}
        >
            <span>All</span>
        </a>
    ].concat(data.map((item) => (
        <a
            className={'link'}
            data-active={item.label === active || undefined}
            href=""
            key={item.id}
            onClick={(e) => { e.preventDefault(); handleCategoryClick(item.label); }}
        >
            <span>{item.label}</span>
        </a>
    )));


    const handleAddCart = (product) => {
        dispatch(addToCart({ product: product, quantity: 1 }));
    }
    return (
        <div className='Store'>
            <div className="container">
                <div className={mode ? "MainPage-block" : "MainPage-block-light"}>
                    <div className="MainPage-block-menu">
                        <br />
                        <br />
                        <nav className={'navbar'}>
                            <div className={'navbarMain'}>
                                <Group className={'navbarheader'} justify="space-between"></Group>
                                {links}
                            </div>
                        </nav>
                    </div>
                    <div className="MainPage-block-products">
                        <div className="MainPage-block-products-render">
                            {currentProducts.map(product => (
                                <Card shadow="sm" padding="lg" radius="md" style={{ width: "300px", height: '550px' }} key={product.id}>
                                    <Carousel
                                        withIndicators
                                        withControls={true}
                                        loop={true}
                                        height={250}
                                        slideGap="md"
                                        align="start"
                                    >
                                        {product.images.map((img, index) => (
                                            <Carousel.Slide key={index}>
                                                <Image
                                                    src={img}
                                                    height={250}
                                                    width={'300px !important'}
                                                    alt="product"
                                                />
                                            </Carousel.Slide>
                                        ))}
                                    </Carousel>

                                    <div className='MainPage-block-products-info'>
                                        <Text fw={500} color={'#abb5b9'} id="title">{product.title}</Text>
                                        <Text size="sm" c="dimmed" id='categories' mt={10} mb={10}>Category: {product.category.name}</Text>
                                        <Text size="sm" c="dimmed" id='description'>{product.description}</Text>
                                        <Group justify="center" mt="30" mb="xs">
                                            <p className='price'>{product.price}$</p>
                                            <Button variant="filled" color="cyan" style={{ minWidth: '40px' }}><ExportOutlined /></Button>
                                            {
                                                cart.some(item => item.product.id === product.id) ? (
                                                    <div className='navi-count'>
                                                        <Button variant="filled" onClick={() => dispatch(updateQuantityPro({
                                                            id: product.id,
                                                            status: 'minus'
                                                        }))}>-</Button>
                                                        <p style={{ color: mode ? 'white' : 'black' }}>{cart.find(item => item.product.id === product.id)?.quantity || 0}</p>
                                                        <Button variant="filled" onClick={() => dispatch(updateQuantityPro({
                                                            id: product.id,
                                                            status: 'plus'
                                                        }))}>+</Button>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        variant="filled"
                                                        style={{ textTransform: 'none', display: 'flex', gap: '10px' }}
                                                        onClick={() => handleAddCart(product)}
                                                    >
                                                        <ShoppingCartOutlined style={{ fontSize: '20px' }} /> Add to Cart
                                                    </Button>
                                                )
                                            }
                                        </Group>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <Pagination
                            total={Math.ceil(products.length / productsPerPage)}
                            page={currentPage}
                            onChange={paginate}
                            color="#1677ff"
                            size="lg"
                            radius="md"
                            className="pagination-control"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Store