import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ques.css'

const Question = () => {
    const {route ,setLoader ,filesRoute}=useContext(AppContext)
    const [refresh ,setRefresh]=useState(false)
    const [text,setText]=useState("")
    const [keys,setKeys]=useState([])
    const [keyId,setKeyId]=useState("")
    const [ques,setQues]=useState([])
    const [showConfirm ,setShowConfirm]=useState(false)
    const [quesId,setQuesId]=useState("")


    const handleAdd = async (event) => {
        event.preventDefault();
        setLoader(true)
        try {
          const response = await fetch(`${route}/questions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' ,
              "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({
             text : text ,
             section : keyId
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
        setQuesId(id)
      }

      const deleteQues =()=>{
        setLoader(true)
        setShowConfirm(false)
        fetch(`${route}/questions/${quesId}`,{
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

    useEffect(()=>{
        fetch(`${route}/keys`,{
            headers:{
                "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.data){
            setKeys(data.data)
            
          }
        })
      },[])
    useEffect(()=>{
        fetch(`${route}/questions`,{
            headers:{
                "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.data){
            setQues(data.data)
       
          }
        })
      },[refresh])
  return (
<div className="ques">
{showConfirm ?   <div className="confirm">
    <div>هل انت متاكد انك تريد حذف هذا ؟</div>
    <div className="btns">
      <button onClick={deleteQues} className='yes' >Yes</button>
      <button onClick={() => setShowConfirm(false)} className='no'>No</button>
    </div>
  </div> :null}
    <div className="container">
        <div className="add-ques">

        <h1>اضف سؤال</h1>
        <form action="" onSubmit={handleAdd} >
        <label htmlFor="">
            السؤال
            <input value={text} onChange={(e)=>setText(e.target.value)} type="text" />
        </label>
     <label htmlFor="">
        اختر المفتاح 
        <select onChange={(e)=>setKeyId(e.target.value)} > 
            <option value="">اختر مفتاح</option>
            {keys.map((key)=>{
                return(
                    <option value={key._id}>{key.name}</option>
                )
            })}
        </select>
     </label>
            <button type='submit'>أضافة</button>
          </form>
        </div>
        <div className="all-ques">
            <h1>الاسئلة</h1>
            <div className="in-all-ques">
            {ques.map((ques)=>{
                return(
                    <div className="ques-card" key={ques._id}>
                        <div className="text">{ques.text}</div>
                        <button onClick={()=>deleteButton(ques._id)}>حذف</button>
                    </div>
                )
            })}
            </div>
        </div>
    </div>
</div>
  )
}

export default Question
