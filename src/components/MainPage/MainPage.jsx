import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { filterCategory, searchCountry, setTheme, setUpStates } from '../../store/Reducers/Reducer';
import { Button, Card, Group, Image, Modal, Pagination, Text, Avatar, Stack } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Input } from 'antd';
import { ExportOutlined, MoonOutlined, RadiusSettingOutlined, ShoppingCartOutlined, SunOutlined, UserOutlined } from '@ant-design/icons';
import './MainPage.scss';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';

function MainPage({ selectedUser }) {
    const { Search } = Input;
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const categories = useSelector((state) => state.products.categories);

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(9);
    const [active, setActive] = useState('All');
    const [opened, { open, close }] = useDisclosure(false);

    // For pagination
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = products.slice(indexOfFirst, indexOfLast);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const mode = useSelector(state => state.products.isDarkMode)

    // Getting products and categories
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://api.escuelajs.co/api/v1/products');
            const res = await axios.get('https://api.escuelajs.co/api/v1/categories');
            const users = await axios.get('https://api.escuelajs.co/api/v1/users?limit=10')
            dispatch(setUpStates({ products: response.data, categories: res.data, users: users.data }));
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
            key={item.label}
            onClick={(e) => { e.preventDefault(); handleCategoryClick(item.label); }}
        >
            <span>{item.label}</span>
        </a>
    )));

    // Search functions in dispatch
    const handleSearch = (value) => {
        dispatch(searchCountry({ text: value }));
    };



    const ChangeDarkMode = () => {
        dispatch(setTheme({ mode: !mode }));
    };


    return (
        <div className='MainPage'>



            <Modal opened={opened} onClose={close} title="Profile" id={mode ? 'Dark_Modal' : 'Light_Modal'}>
                <Stack align='center'>
                    <div className="Modal-flex-comp">
                        <Avatar src={selectedUser.avatar} size={50} radius="xl" />
                    </div>
                    <div>
                        <Text>Name: {selectedUser.name}</Text>
                        <div className='Modal-flex-comp'>
                            <Text>Email: {selectedUser.email}</Text>
                        </div>
                        <div className='Modal-flex-comp'>
                            <Text>Password: {selectedUser.password}</Text>
                        </div>

                        <Text>Role: {selectedUser.role}</Text>
                        <Text>Created At: {new Date(selectedUser.creationAt).toLocaleDateString()}</Text>
                        <Text>Updated At: {new Date(selectedUser.updatedAt).toLocaleDateString()}</Text>
                    </div>
                </Stack>
            </Modal>




            <div className={mode ? "MainPage-header-navi" : 'MainPage-header-navi-light'}>
                <div className='MainPage-header-navi-logo'>
                    <h2>CIO Market</h2>
                </div>
                <div className='MainPage-header-navi-search'>
                    <Search placeholder="Search products" enterButton="Search" size="large" onSearch={handleSearch} />
                    <div><ul><li>Home</li><li>Store</li><li><span>Cart</span><ShoppingCartOutlined /></li></ul></div>
                </div>
                <div className='MainPage-header-navi-profile'>
                    <button onClick={open}><UserOutlined /></button>
                    <button onClick={() => ChangeDarkMode()}>{mode ? <SunOutlined /> : <MoonOutlined />}</button>
                    <Link to={'/settings'}><button><RadiusSettingOutlined /></button></Link>
                </div>
            </div>



            <div className="container">
                <div className={mode ? "MainPage-block" : "MainPage-block-light"}>

                    <div className="MainPage-block-menu">
                        <br />
                        <br />
                        <nav className={'navbar'}>
                            <div className={'navbarMain'}>
                                <Group className={'navbarheader'} justify="space-between">
                                </Group>
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
                                            <Button variant="filled" style={{ textTransform: 'none', display: 'flex', gap: '10px' }}><ShoppingCartOutlined style={{ fontSize: '20px' }} /> Add to Cart</Button>
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
    );
}

export default MainPage;
