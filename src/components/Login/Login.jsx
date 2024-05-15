import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Login.scss';

function Login({ setSelectedUser }) {
    const { control, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await axios.get('https://api.escuelajs.co/api/v1/users?limit=50');
            setUsers(response.data)
            setLoading(false);
        };
        fetchData();
    }, []);



    const onSubmit = (data) => {
        users.map(user => {
            if (user.email === data.email && user.password === data.password) {
                navigate('/main');
                setSelectedUser(user)
            }
            else {
                return user
            }
        })
    };

    if (loading) {
        return <h1 className='loading'>Loading...</h1>
    }

    return (
        <div className='Login'>
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
                        <Button type="primary" htmlType="submit">Login</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
