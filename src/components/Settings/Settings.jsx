import React, { useState } from 'react';
import { Group, Avatar, Text, Accordion, Button } from "@mantine/core";
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { addUser, deleteCategory, deleteUser } from '../../store/Reducers/Reducer';
import axios from 'axios';
import '@mantine/carousel/styles.css';
import './Settings.scss';

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
      if (response.status === 200) {
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
  const dispatch = useDispatch()
  const [showModule, setShowModule] = useState(false)
  const [name, setName] = useState('')
  const [image, setImage] = useState()


  /// Add Category
  const addCategoryinFetch = (newCategory) => async () => {
    const response = await axios.post(`https://api.escuelajs.co/api/v1/categories/`, JSON.stringify(newCategory))
    dispatch(addCategoryInFetch(response.data))
  }
  const handleAddCategory = () => {
    const newCategory = {
      name: name,
      image: image,
      id: Math.floor(Math.random() * 1000000),
    }
    dispatch(addCategoryinFetch(newCategory));
  }
  /// end code



  /// delete Category
  const delCategoryinFetch = (id) => async (dispatch) => {
    try {
      const response = await axios.delete(`https://api.escuelajs.co/api/v1/categories/${id}`);
      if (response.status === 200) {
        dispatch(deleteCategory({ id }));
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  }
  /// end Code

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
                      <button className="delete-button" onClick={() => delCategoryinFetch(item.id)}>
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
  const categories = useSelector(state => state.products.categories)
  const [showModule, setShowModule] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState()
  const [category, setCategory] = useState('')


  const deleteProductinFetch = (id) => async () => {
    try {
      const response = await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
      if (response.status === 200) {
        dispatch(deleteProduct({ id }));
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  }

  const addProductinFetch = () => async () => {

  }



  return (
    <div className="Products">



      <div className="Products-modul" style={{ display: showModule ? 'block' : 'none' }}>
        <div className="Products-modul-block">
          <div className="Products-modul-block-inner">
            <h1>New Product</h1>
            <input
              type="text"
              name="title"
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              name='description'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              name='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <select name="category" id="category" onChange={(e) => setCategory(e)}>
              {
                categories.map((category) => {
                  return <option value={category.id} key={category}>{category.name}</option>
                })
              }
            </select>
            <div>
              <Button variant="filled" color="yellow" onClick={() => setShowModule(false)}>Cancel</Button>
              <Button variant="filled" color="grape" >Add New</Button>
            </div>
          </div>
        </div>
      </div>



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
                  <th>Price</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Product ID</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {productsState.map(item => (
                  <tr key={item.id}>
                    <td><Text lineClamp={1} style={{ width: '200px' }}>{item.title}</Text></td>
                    <td>{item.price}$</td>
                    <td> <Text lineClamp={1} style={{ width: '250px' }}>{item.description}</Text></td>
                    <td>{item.category.name}</td>
                    <td>{item.id}</td>
                    <td>
                      <button className="delete-button" onClick={() => deleteProductinFetch(item.id)}>
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