
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/WebSite/HomePage';
import Login from './Pages/Auth/AuthOperation/Login';
import Register from './Pages/Auth/AuthOperation/Register';
import Users from './Pages/Dashboard/Users';
import GoogleCallback from './Pages/Auth/AuthOperation/GoogleCallback';
import Dashboard from './Pages/Dashboard/Dashboard';
import RequireAuth from './Pages/Auth/Protecting/RequireAuth';
import User from './Pages/Dashboard/User';
import AddUser from './Pages/Dashboard/AddUser';

import Writer from './Pages/Dashboard/Writer';
import Err404 from './Pages/Auth/Errors/404';
import RequireBack from './Pages/Auth/Protecting/RequireBack';

import Categories from './Pages/Dashboard/Categories';
import AddCategories from './Pages/Dashboard/AddCategories';
import Category from './Pages/Dashboard/Category';
import Products from './Pages/Dashboard/Products';
import AddProduct from './Pages/Dashboard/AddProduct';
import UpdateProduct from './Pages/Dashboard/Product';
import WebSiteCategories from './Pages/WebSite/Categories/Categories';
import WebSite from './Pages/WebSite/WebSite';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<WebSite/>}>
      <Route path='/'element={<HomePage/>}/>
      
      <Route path="/categories" element={<WebSiteCategories/>}/>
      </Route>
      <Route element={<RequireBack/>}>
        <Route path='/login'element={<Login/>}/>
        <Route path='/register'element={<Register/>}/>
       
        </Route>
         <Route path='/auth/google/callback' element={<GoogleCallback/>}/>
         <Route path='/*' element={<Err404/>}/>
        <Route element={<RequireAuth allowedRole={['1996','1995','1999']}/>}>
         <Route path='/dashboard'element={<Dashboard/>}>
         <Route element={<RequireAuth allowedRole={['1995']}/>}>
         <Route path='users'element={<Users/>}/>
         <Route path='users/:id' element={<User/>}/>
         <Route path='user/add' element={<AddUser/>}/>
         </Route>
         <Route element={<RequireAuth allowedRole={['1999','1995']}/>}>
         <Route path='categories' element={<Categories/>}/>
         <Route path='categories/:id' element={<Category/>}/>
         <Route path='category/add' element={< AddCategories/>}/>
         </Route>
         <Route path='products' element={<Products/>}/>
         <Route path='products/:id' element={<UpdateProduct/>}/>
         <Route path='product/add' element={< AddProduct/>}/>
        
         <Route element={<RequireAuth allowedRole={['1996','1995']}/>}>
         <Route path='writer' element={<Writer/>}/>
         </Route>
        
         </Route>
         </Route>
      </Routes>
   
   
    </div>
  );
}

export default App;
