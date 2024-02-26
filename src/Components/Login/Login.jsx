import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { InfinitySpin, RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { AuthContextProvider } from "../../Context/AuthContext";


// schema from yup to handle vaidation if need it
const mySchema =  Yup.object(
  {
name :Yup.string().required('name must be req!').min(3).max(20) , 
email :Yup.string().required('email must be req!').email(), 
phone :Yup.string().required('Phone must be formated egyptian number!').matches(" /^01[0125][0-9]{8}$/"), 
password :Yup.string().required('password must be more than 8 ch!').min(8 , "at Least 8 ch").max(20 , "not more than 20") , 



  }
)

export default function Login() {


  // to change in design and display success message using useState
const [isSuccess , setIsSuccess] =useState(false);
const [isClicked , setIsClicked] =useState(false);
const [isWrong , setIswrong] = useState(undefined)
const navigate = useNavigate()


const {setToken} =  useContext(AuthContextProvider)

const userData = {
  
  email:'',
   
  password: '',
 
}


async function sendUserData(userData){
  

try {
  
  const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , userData)

  localStorage.setItem( "token" , res.data.token)
  setToken(res.data.token)
  
  console.log(res.data);
console.log(res.data.token);
if(res.data.message == "success"){


  
setIsSuccess(true)

setTimeout( ()=>{
  setIsSuccess(false);
  navigate('/Products')
  
},2000 )
setIsClicked(false)

}




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
  
  
  if(values.email.includes( '@' ) == false || values.email.includes( '.' == false )){
    errors.email = "email must be follow format"
  }
   
  if(values.password.length < 6 || values.password.length > 12){
    errors.password = "password should be more than 6 characters"
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

        {isSuccess? <div className="alert alert-success text-center py-2">Welcome back </div>: ""}
        {isWrong? <div className="alert alert-danger text-center py-2">{isWrong} </div>: ""}
      

        <form onSubmit={myFormik.handleSubmit}>
         
          <label htmlFor="email">email:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="email" className="form-control mb-3" id="email" />
          {myFormik.errors.email && myFormik.touched.email ?  <div className="alert alert-danger">{myFormik.errors.email}</div> : ''}

          <label htmlFor="password">password:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password" className="form-control mb-3" id="password" />
          {myFormik.errors.password && myFormik.touched.password ?  <div className="alert alert-danger">{myFormik.errors.password}</div> : ''}

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
              />: "Login"}
            
            
          
            
            
            </button>
        </form>
      </div>
    </>
  );
}
