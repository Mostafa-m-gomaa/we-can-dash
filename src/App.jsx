import './App.css';
import { BrowserRouter, Link, Route,Routes } from 'react-router-dom';
import Sidebar from './layout/Sidebar/Sidebar';
import ContentTop from './components/ContentTop/ContentTop';
import { createContext, useEffect, useState } from 'react';
import Login from './components/login/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from './components/users/Users';
import Keys from './components/keys/Keys';
import Questions from './components/ques/Ques';

export const AppContext =createContext()

function App() {
  const [headTitle,setHeadTitle]=useState("تسجيل الدخول")
  const [login,setLogin]=useState(false)
  const [route ,setRoute]=useState("https://n-m-nstty.onrender.com/api/v1")

  const [loader,setLoader]=useState(false)


  useEffect(()=>{
    
      setLogin(sessionStorage.getItem("login"))


  },[login])
  return (
    <AppContext.Provider value={{headTitle
    ,setHeadTitle ,
    route,
    login,
    setLogin ,
    setLoader ,

    }}>
    <>
      <div className='app'>
      <ToastContainer />
{loader ? <div className="loader-cont">
<div class="banter-loader">
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
</div>
</div> : null}
        <Sidebar />
      <div className="the-content">
        <ContentTop />
       
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/المستخدمين" element={<Users />} />
      <Route path="/المفاتيح" element={<Keys />} />
      <Route path="/الاسئلة" element={<Questions />} />
      
 
    </Routes>

      </div>
      </div>
    </>
    </AppContext.Provider>
  )
}

export default App
