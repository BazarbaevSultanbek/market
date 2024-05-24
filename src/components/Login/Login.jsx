import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../store/Reducers/Reducer';

function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mode = useSelector(state => state.products.isDarkMode);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await axios.get('https://api.escuelajs.co/api/v1/users?limit=50');
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
                email: data.email,
                password: data.password
            });

            if (response.status === 200 || response.status === 201) {
                const token = response.data.access_token;
                const profileResponse = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                dispatch(setCurrentUser(profileResponse.data));
                navigate('/');
            } else {
                alert(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error('Login Error:', error);
            if (error.response) {
                alert(`Login failed: ${error.response.data.message || 'Unknown error'}`);
            } else {
                alert('Login failed: Network or server error');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={mode ? 'Login' : 'Login-light'}>
            <div className="container">
                <div className="Login-block">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="Login-block-form">
                        <h1>Login</h1>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: 'Invalid email format'
                                }
                            }}
                            render={({ field }) => (
                                <>
                                    <Input
                                        {...field}
                                        placeholder="Email"
                                        className={errors.email ? "error-input" : ""}
                                        autoComplete="off"
                                    />
                                    <p className="error">{errors.email?.message}</p>
                                </>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required' }}
                            render={({ field }) => (
                                <>
                                    <Input.Password
                                        {...field}
                                        placeholder="Password"
                                        className={errors.password ? "error-input" : ""}
                                        autoComplete="off"
                                    />
                                    <p className="error">{errors.password?.message}</p>
                                </>
                            )}
                        />
                        <Button type="primary" htmlType="submit" disabled={loading}>Login</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
