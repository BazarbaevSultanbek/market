import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { filterCategory, searchCountry, setUpStates } from '../../store/Reducers/Reducer';
import { Button, Card, Group, Image, Modal, Pagination, Text, Avatar, Stack } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Input } from 'antd';
import { ExportOutlined, MoonOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import './MainPage.scss';
import { useDisclosure } from '@mantine/hooks';
import { IconAt } from '@tabler/icons-react';

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

    // Getting products and categories
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://api.escuelajs.co/api/v1/products');
            const res = await axios.get('https://api.escuelajs.co/api/v1/categories');
            dispatch(setUpStates({ products: response.data, categories: res.data }));
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

    return (
        <div className='MainPage'>
            <Modal opened={opened} onClose={close} title="Profile">
                <Stack align='center'>
                    <div className="Modal-flex-comp">
                        <Avatar src={selectedUser.avatar} size={50} radius="xl" />
                        <Text>Name: {selectedUser.name}</Text>
                    </div>
                    <div>                        
                        <div className='Modal-flex-comp'>
                            <Text>Email: </Text>
                            <Input placeholder="Your email" leftSection={<IconAt size={16} />} value={selectedUser.email} />
                        </div>
                        <div className='Modal-flex-comp'>
                            <Text>Password:</Text>
                            <Input placeholder="Your password" value={selectedUser.password} />
                        </div>

                        <Text>Role: {selectedUser.role}</Text>
                        <Text>Created At: {new Date(selectedUser.creationAt).toLocaleDateString()}</Text>
                        <Text>Updated At: {new Date(selectedUser.updatedAt).toLocaleDateString()}</Text>
                    </div>
                </Stack>
            </Modal>
            <div className="MainPage-header-navi">
                <div className='MainPage-header-navi-logo'>
                    <h2>CIO Market</h2>
                </div>
                <div className='MainPage-header-navi-search'>
                    <Search placeholder="Search products" enterButton="Search" size="large" onSearch={handleSearch} />
                    <div><ul><li>Home</li><li>Store</li><li><span>Cart</span><ShoppingCartOutlined /></li></ul></div>
                </div>
                <div className='MainPage-header-navi-profile'>
                    <button onClick={open}><UserOutlined /></button>
                    <button><MoonOutlined /></button>
                </div>
            </div>
            <div className="container">
                <div className="MainPage-block">
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
                                        <Group justify="space-around" mt="30" mb="xs">
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
