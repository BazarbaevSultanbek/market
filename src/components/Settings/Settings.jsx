import React, { useState } from 'react';
import { Group, Avatar, Text, Accordion, Button } from "@mantine/core";
import './Settings.scss';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { addUser, deleteUser } from '../../store/Reducers/Reducer';
import axios from 'axios';

function Settings() {
  return (
    <div className="Settings">
      <Users />
      <Categories />
      <Products />

    </div>
  )
}

export default Settings;




const Users = () => {
  const usersState = useSelector((state) => state.products.users);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showModule, setShowModule] = useState(false);
  const dispatch = useDispatch();


  const addUserInFetch = (user) => async (dispatch) => {
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/users', JSON.stringify(user));
      if (response.data) {
        dispatch(addUser({ user: response.data }));
        console.log(response.data);
      }
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };


  const deleteUserinFetch = (id) => async (dispatch) => {
    try {
      const response = await axios.delete(`https://api.escuelajs.co/api/v1/users/${id}`);
      if (response.data) {
        dispatch(deleteUser({ id }));
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleAddUser = () => {
    const newUser = {
      name: name,
      email: email,
      password: password,
      role: role,
      avatar: "string"
    };

    dispatch(addUserInFetch(newUser));
    setShowModule(false);
    setName('');
    setEmail('');
    setPassword('');
    setRole('');
  };

  return (
    <div className="Users">
      <div className="Users-modul" style={{ display: showModule ? 'block' : 'none' }}>
        <div className="Users-modul-block">
          <div className="Users-modul-block-inner">
            <h1>New Profile</h1>
            <input
              type="text"
              name="name"
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              name='role'
              placeholder='Role'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <div>
              <Button variant="filled" color="yellow" onClick={() => setShowModule(false)}>Cancel</Button>
              <Button variant="filled" color="grape" onClick={handleAddUser}>Add New</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="Users-block">
          <div className="Users-block-users">
            <h1>Users</h1>
            <div className="Users-block-users-navi">
              <button onClick={() => setShowModule(true)}>Add User</button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {usersState.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>
                      <button className="delete-button" onClick={() => dispatch(deleteUserinFetch(user.id))}>
                        <DeleteOutlined />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

}


const Categories = () => {
  const categoriesState = useSelector(state => state.products.categories)
  const [showModule, setShowModule] = useState()
  const [name, setName] = useState('')
  const [image, setImage] = useState()
  const dispatch = useDispatch()

  const addCategory = (newCategory) => async () => {
    const response = await axios.post(`https://api.escuelajs.co/api/v1/categories/`, JSON.stringify(newCategory))
    dispatch(addCategoryInFetch(response.data))
  }

  const handleAddCategory = () => {
    const newCategory = {
      name: name,
      image: image,
      id: Math.floor(Math.random() * 1000000),
    }
    console.log(newCategory);
    dispatch(addCategory(newCategory));
  }

  return (
    <div className='Categories'>
      <div className="Categories-modul" style={{ display: showModule ? 'block' : 'none' }}>
        <div className="Categories-modul-block">
          <div className="Categories-modul-block-inner">
            <h1>New Category</h1>
            <input type="text" name='name' placeholder='Name' onChange={(e) => setName(e.target.value)} />
            <input type="file" onChange={(e) => setImage(e.target.value)} />
            <div>
              <Button variant="filled" color="yellow" onClick={() => setShowModule(false)}>Cancel</Button>
              <Button variant="filled" color="grape" onClick={handleAddCategory}>Add New</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="Categories-block">
          <div className="Categories-block-users">
            <h1>Categories</h1>
            <div className="Categories-block-users-navi">
              <button onClick={() => setShowModule(true)}>Add Category</button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {categoriesState.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <button className="delete-button" >
                        <DeleteOutlined />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}



const Products = () => {
  const productsState = useSelector(state => state.products.products)

  console.log(productsState);

  return (
    <div className="Products">
      <div className="container">
        <div className="Products-block">
          <div className="Products-block-users">
            <h1>Products</h1>
            <div className="Products-block-users-navi">
              <button onClick={() => setShowModule(true)}>Add Products</button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {productsState.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    
                    <td>
                      <button className="delete-button" >
                        <DeleteOutlined />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}