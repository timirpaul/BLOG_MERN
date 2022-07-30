import './App.css';
import Header from './components/Header';
import {Routes,Route} from 'react-router-dom'
import Login from './components/Login'

import Blogs from './components/Blogs'
import AddBlog from './components/AddBlog'
import { useSelector } from 'react-redux';
import UserBlog from './components/UserBlog';
import BlogDetails from './components/BlogDetails';

function App() {
  const isLoggedIn = useSelector((state)=>state.isLoggedIn)
  console.log(isLoggedIn);
  return (
    <>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        <Route path="/auth" element={<Login/>}/>
        
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/blogs/add" element={<AddBlog/>}/>
        <Route path="/myblogs" element={<UserBlog/>}/>
        <Route path="blogs/myblogs/:id" element={<BlogDetails/>}/>
        
      </Routes>
    </main>
    </>
  );
}

export default App;
