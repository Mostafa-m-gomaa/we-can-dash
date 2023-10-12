import  './users.css'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [passwordConfirm,setPasswordConfirm]=useState("")
    const {route ,setLoader ,filesRoute}=useContext(AppContext)
    const [refresh ,setRefresh]=useState(false)
    const [users,setUsers]=useState([])
    const [showConfirm ,setShowConfirm]=useState(false)
    const [userId,setUserId]=useState("")

    const handleAdd = async (event) => {
        event.preventDefault();
        setLoader(true)
        try {
          const response = await fetch(`${route}/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' ,
              "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({
                name:name,
              email : email ,
              password : password ,
              passwordConfirm : passwordConfirm
            })
          })
          .then(res=>res.json())
          console.log(response)
          setLoader(false)
          if (response.data) {
          toast.success("تمت الأضافة")
          setRefresh(!refresh)
          }
           else {
        // toast.error("sayed")
        toast.error(response.errors[0].msg)
        
          }
        } catch (error) {
          console.error(error);
        
        }
      };
      const deleteButton =(id)=>{
        setShowConfirm(true)
        setUserId(id)
      }

      const deleteUser =()=>{
        setLoader(true)
        setShowConfirm(false)
        fetch(`${route}/users/${userId}`,{
          method :"DELETE" ,
          headers :{
            "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
          }
        })
        .then(res => {
            setLoader(false)
            console.log(res)
            if(res.ok){
      toast.success("تم الحذف بنجاح")
      setRefresh(!refresh)
            }
            else{
              toast.error("لم يتم الحذف")
            }
        })
     
      }
      const takeAgain =(id)=>{
        setLoader(true)
        fetch(`${route}/users/availUserToTakeQuiz/${id}`,{
          method :"PUT" ,
          headers :{
            "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
          }
        }).then(res=>res.json())
        .then(data => {
            console.log(data)
            setLoader(false)
            if(data.status ==="success"){
                toast.success(data.msg)
            }
            if(data.status === "faild"){
                toast.error(data.msg)
                
            }

        })
      }


      useEffect(()=>{
        fetch(`${route}/users`,{
            headers:{
                "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.data){
            setUsers(data.data)
            console.log(data.data)
          }
        })
      },[refresh])
  return (
<div className="users">
{showConfirm ?   <div className="confirm">
    <div>هل انت متاكد انك تريد حذف هذا ؟</div>
    <div className="btns">
      <button onClick={deleteUser}  className='yes' >Yes</button>
      <button onClick={() => setShowConfirm(false)} className='no'>No</button>
    </div>
  </div> :null}
    <div className="container">
<div className="add">
    <h1>اضف عضو جديد</h1>
    <form action="" onSubmit={handleAdd}>
            <label htmlFor="">
              الاسم
              <input value={name} onChange={(e)=>setName(e.target.value)} type='text' />
            </label>
            <label htmlFor="">
              الايميل
              <input value={email}  type='text' onChange={(e)=>setEmail(e.target.value)} />
            </label>
            <label htmlFor="">
              كلمة السر
              <input  value={password} onChange={(e)=>setPassword(e.target.value)} type='text' />
            </label>
            <label htmlFor="">
              تأكيد كلمة السر
              <input value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)}  type='text' />
            </label>
            <button type='submit'>أضافة</button>
          </form>
</div>
<div className="all-users">
    <h1>كل الاعضاء</h1>
    <div className="in-all-users">
        {users.map((user,index)=>{
            return(
                <div className="user-card" key={index}>
                    {user.role=== "user" ?<div className="in-user-card">

                    <div className="name">{user.name}</div>
                    <div className="email">{user.email}</div>
                    <div className="code">{user.code}</div>
                    <div className="quiz">{user.quizTaken ? "نعم" :"لا"}</div>
                    <button className='delete' onClick={() => deleteButton(user._id)}>حذف</button>
                    <button className='again' onClick={()=>takeAgain(user._id)} >السماح بالامتحان مرة اخري</button>
                    </div> :<div className="in-user-card">
<h3>Admin</h3>
<div className="name">{user.name}</div>
<div className="email">{user.email}</div>
<button onClick={() => deleteButton(user._id)} className='delete'>حذف</button>

</div> }
                   
                </div>
            )
        })}
    </div>
</div>
    </div>
</div>
  )
}

export default Users
