import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pagination from '../../Pagination'
import Search from 'antd/es/transfer/search'
import { Input, Menu, Switch } from 'antd'
import { Button } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch';
import { AppstoreOutlined, AudioOutlined, ExportOutlined, LinkOutlined, MailOutlined, MoonOutlined, RadiusSettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'

import './MainPage.scss'
import { useDispatch } from 'react-redux'
import { searchCountry } from '../../store/Reducers/Reducer'



function MainPage({ selectedUser }) {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(9)
    const [categories, setCategories] = useState([])
    const [current, setCurrent] = useState('1');
    const { Search } = Input;
    const dispatch = useDispatch()


    const handleSearch = (e) => {
        dispatch(searchCountry({ text: e.target.value }));
    };

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1677ff',
            }}
        />
    );

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://api.escuelajs.co/api/v1/products')
            const res = await axios.get('https://api.escuelajs.co/api/v1/categories')
            setCategories(res.data)
            setProducts(response.data)
        }
        fetchData()
    }, [])


    const items = [
        {
            key: 'sub1',
            label: 'Categories',
            icon: <MailOutlined />,
            children: categories.map(item => ({
                key: item.id,
                label: item.name,
            }))
        },
    ];

    const indexOfLast = currentPage * productsPerPage
    const indexOfFirst = indexOfLast - productsPerPage
    const currentProducts = products.slice(indexOfFirst, indexOfLast)


    const paginate = (pageNumber) => { setCurrentPage(pageNumber) }



    return (
        <div className='MainPage'>
            <div className="MainPage-header-navi">
                <div className='MainPage-header-navi-logo'>
                    <h2>CIO Market</h2>
                </div>
                <div className='MainPage-header-navi-search'>
                    <Search
                        placeholder="Search products"
                        enterButton="Search"
                        size="large"
                        suffix={suffix}
                        onSearch={handleSearch}
                    />
                    <div>
                        <ul>
                            <li>Home</li>
                            <li>Store</li>
                            <li><span>Cart</span><ShoppingCartOutlined /></li>
                        </ul>
                    </div>
                </div>
                <div className='MainPage-header-navi-profile'>
                    <button><UserOutlined /></button>
                    <button><MoonOutlined /></button>
                </div>
            </div>
            <div className="container">
                <div className="MainPage-block">
                    <div className="MainPage-block-menu">
                        <br />
                        <br />
                        <Menu
                            theme={'#2e2e2e'}
                            style={{
                                width: 256,
                                color: 'white'
                            }}
                            defaultOpenKeys={['sub1']}
                            selectedKeys={[current]}
                            mode="inline"
                            items={items}
                            onClick={(e) => setCurrent(e.key)}
                        />
                    </div>
                    <div className="MainPage-block-products">
                        <div className='MainPage-block-products-items'>
                            {
                                currentProducts.map(product => {
                                    return <div key={product.id}>
                                        <img src={Array.isArray(product.images) ? product.images[0] : ''} alt="" />
                                        <div>
                                            <h4>{product.title}</h4>
                                            <span id='categories'>Category: {product.category.name}</span>
                                            <p className='description'>{product.description}</p>
                                            <nav id='productNavi'>
                                                <p className='price'>{product.price}$</p>
                                                <Button type="primary" style={{ minWidth: '40px' }}><ExportOutlined /></Button>
                                                <Button variant="contained" style={{ textTransform: 'none', display: 'flex', gap: '10px' }}><ShoppingCartOutlined style={{ fontSize: '20px' }} /> Add to Cart</Button>
                                            </nav>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        <Pagination PostsPerPage={productsPerPage} totalPosts={products.length} paginate={paginate} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage