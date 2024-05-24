import { useDispatch, useSelector } from 'react-redux';
import { searchCountry, setTheme, } from '../../store/Reducers/Reducer';
import { Modal, Text, Avatar, Stack } from '@mantine/core';
import '@mantine/carousel/styles.css';
import { Input } from 'antd';
import { MoonOutlined, RadiusSettingOutlined, ShoppingCartOutlined, SunOutlined, UserOutlined } from '@ant-design/icons';
import './MainPage.scss';
import { useDisclosure } from '@mantine/hooks';
import { Link, useLocation } from 'react-router-dom';
import Cart from '../Cart/Cart';
import Store from '../Store/Store';
import Login from '../Login/Login';
import Settings from '../Settings/Settings';

function MainPage({ selectedUser }) {
    const { Search } = Input;
    const mode = useSelector(state => state.products.isDarkMode);
    const currentUser = useSelector(state => state.products.currentUser);
    const dispatch = useDispatch();
    const [opened, { open, close }] = useDisclosure(false);
    const location = useLocation()



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
                        <Avatar src={currentUser?.avatar} size={50} radius="xl" />
                    </div>
                    <div>
                        <Text>Name: {currentUser?.name}</Text>
                        <div className='Modal-flex-comp'>
                            <Text>Email: {currentUser?.email}</Text>
                        </div>
                        <div className='Modal-flex-comp'>
                            <Text>Role: {currentUser?.role}</Text>
                        </div>
                    </div>
                </Stack>
            </Modal>



            <div className={mode ? "MainPage-header-navi" : 'MainPage-header-navi-light'}>
                <div className='MainPage-header-navi-logo'>
                    <h2>CIO Market</h2>
                </div>
                <div className='MainPage-header-navi-search'>
                    <Search placeholder="Search products" enterButton="Search" size="large" onSearch={handleSearch} />
                    <div>
                        <ul>
                            <li>Home</li>
                            <Link to={'/'}><li>Store</li></Link>
                            <Link to={'/Cart'}> <li><span>Cart</span><ShoppingCartOutlined /></li></Link>
                        </ul>
                    </div>
                </div>
                <div className='MainPage-header-navi-profile'>

                    {currentUser ? (
                        <>
                            <Avatar src={currentUser?.avatar} size={30} radius="xl" onClick={open} />
                        </>
                    ) : (
                        <Link to={'/login'}><button className='login-btn'>Sign in</button></Link>
                    )}
                    <button onClick={() => ChangeDarkMode()} className='theme-btn'>{mode ? <SunOutlined /> : <MoonOutlined />}</button>
                    <Link to={'/settings'}><button className='settings-btn'><RadiusSettingOutlined /></button></Link>
                </div>
            </div>

            {location.pathname === '/Cart' && <Cart />}
            {location.pathname === '/login' && <Login />}           
            {location.pathname === '/' && <Store />}

        </div>
    );
}

export default MainPage;
