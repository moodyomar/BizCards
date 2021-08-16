import React from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/apiSer';
import Hero, { heroImg } from './common/hero';
import PageHeader from './common/pageHeader';

 
function SignUpClient(props){
  let {register , handleSubmit ,  formState: { errors } } = useForm();
  let history = useHistory();

  const onSubForm = async(formData) => {
    let url = API_URL+"/users/";
    try{
      let data = await doApiMethod(url,"POST",formData);
      if(data._id){
        toast.success("You sign up successfuly!")
        history.push("/login");
      }
      else{
        toast.error("an error occurred , please come back later or try again")
      }
    }
    catch(err){
      // in axios the err come with response prop and data prop
      console.log(err.response.data);
      if(err.response.data.code){
        toast.error("User is already in the systme , try login");
      }
      else {
        toast.error("an error occurred , please come back later or try again");
      }
    }
  }

  // register -> ref= useRef()
  let emailRef = register("email",{
    required:true,  
    pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })

  let passwordRef =  register("password",{required:true, minLength:3}) ;
  let nameRef = register("name",{required:true, minLength:2})
  let checkRef = register("biz",{required:false})

  return(
    <div>
    <Hero imgPath={heroImg} heroTitle={'Join Us Today'} />
      <PageHeader title="Sign up new user"/>
    <form onSubmit={handleSubmit(onSubForm)} className="col-lg-6 mx-auto shadow p-3 rounded my-5">
      <div>
        <label>Email:</label>
        <input {...emailRef} type="text" className="form-control" />
        {errors.email && <span className="text-danger">Enter valid email</span>}
      </div>
      <div>
        <label>Password:</label>
        <input {...passwordRef} type="text" className="form-control" />
        {errors.password && <span className="text-danger">Enter min 3 charts password</span>}
      </div>
      <div>
        <label>Full name:</label>
        <input {...nameRef} type="text" className="form-control" />
        {errors.fullName && <span className="text-danger">Enter min 2 charts name</span>}
      </div>
      <div className="mt-2">
        <input {...checkRef}  type="checkbox" className="form-check-input me-2" />
        <label>I am Business</label>
      </div>
      <button className="btn btn-purple mt-3">Sign up</button>
    </form>
  </div>
  )
}

export default SignUpClient