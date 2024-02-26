import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { InfinitySpin, RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'


// schema from yup to handle vaidation if need it
const mySchema =  Yup.object(
  {
name :Yup.string().required('name must be req!').min(3).max(20) , 
email :Yup.string().required('email must be req!').email(), 
phone :Yup.string().required('Phone must be formated egyptian number!').matches(" /^01[0125][0-9]{8}$/"), 
password :Yup.string().required('password must be more than 8 ch!').min(8 , "at Least 8 ch").max(20 , "not more than 20") , 



  }
)

export default function SignUp() {


  // to change in design and display success message using useState
const [isSuccess , setIsSuccess] =useState(false);
const [isClicked , setIsClicked] =useState(false);
const [isWrong , setIswrong] = useState(undefined)
const navigate = useNavigate()


const userData = {
  name: '',
  email:'',
  Phone:'',
  password: '',
  rePassword: '',
}


async function sendUserData(userData){
  

try {
  
  const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , userData)
  console.log(res.data);

setIsSuccess(true)

setTimeout( ()=>{
  setIsSuccess(false);
  navigate('/Login')
  
},2000 )
setIsClicked(false)


} catch (error) {
  // console.log("error" , error.response.data.message );
  // error.response.data

setIswrong(error.response.data.message)
setTimeout(function(){
  setIswrong(false)
} , 2000)

setIsClicked(false)
}

}


function onSubmit(values){
  console.log("submited...", values);

setIsClicked(true)
  sendUserData(values)
}



function Validation(values){
  // console.log("valid" , values);

  const errors ={};

  // put you validatitio regex here 
  const nameRgx = /^[A-Z][a-z]{3,8}$/
  const phoneRgx = /^01[0125][0-9]{8}$/
  if(nameRgx.test(values.name) == false){
    errors.name = "name must be start with capital letter and more than 3 characters"
    // console.log("error in test ");
  }
  if(values.email.includes( '@' ) == false || values.email.includes( '.' == false )){
    errors.email = "email must be follow format"
  }
  if(phoneRgx.test(values.Phone) == false ){
    errors.Phone = "phone must be egyptian number"
  }
  if(values.password.length < 6 || values.password.length > 12){
    errors.password = "password should be more than 6 characters"
  }

  if(values.password !== values.rePassword){
    errors.rePassword = "must be match password"
  }




  return errors;
}

 const myFormik =  useFormik({
    initialValues:userData ,
    onSubmit: onSubmit,
    validate:Validation,
    // validationSchema: mySchema,
    
  })

  return (
    <>
      <div className="container">
        <h2 className="mt-4 mb-3">Register Now:</h2>

        {isSuccess? <div className="alert alert-success text-center py-2">Congratulation your account has been created </div>: ""}
        {isWrong? <div className="alert alert-danger text-center py-2">{isWrong} </div>: ""}
      

        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} value={myFormik.values.name} type="text" className="form-control mb-3" id="name" />
         {myFormik.errors.name && myFormik.touched.name ?  <div className="alert alert-danger">{myFormik.errors.name}</div> : ''}

          <label htmlFor="email">email:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="email" className="form-control mb-3" id="email" />
          {myFormik.errors.email && myFormik.touched.email ?  <div className="alert alert-danger">{myFormik.errors.email}</div> : ''}

          <label htmlFor="Phone">Phone:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.Phone} type="text" className="form-control mb-3" id="Phone" />
          {myFormik.errors.Phone && myFormik.touched.Phone ?  <div className="alert alert-danger">{myFormik.errors.Phone}</div> : ''}

          <label htmlFor="password">password:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password" className="form-control mb-3" id="password" />
          {myFormik.errors.password && myFormik.touched.password ?  <div className="alert alert-danger">{myFormik.errors.password}</div> : ''}

          <label htmlFor="rePassword">rePassword:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword}

            type="password"
            className="form-control mb-3"
            id="rePassword"
          />
          {myFormik.errors.rePassword && myFormik.touched.rePassword ?  <div className="alert alert-danger">{myFormik.errors.rePassword}</div> : ''}

          <button type="submit" className="btn btn-success text-center  mb-3">
            

            {isClicked? <RotatingLines
                visible={true}
                height="30"
                width="30"
                color="#fff"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />: "Submit"}
            
            
          
            
            
            </button>
        </form>
      </div>
    </>
  );
}
