import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, doApiMethod } from '../services/apiSer';
import Hero, { heroImg } from './common/hero';
import PageHeader from './common/pageHeader';

function UserInfo(props){
  let [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    let url = API_URL + "/users/userInfo"
    // GET -> in a get request there is no need to pass the body to the ƒunc
    let data = await doApiMethod(url,"GET");
    console.log(data);
    data.dateCreated = data.createdAt.substr(0,data.createdAt.indexOf("T"));
    // data.dateCreated = new Date(userInfo.createdAt).toDateString();
    setUserInfo(data);
  }

  return(
    <div>
      <Hero imgPath={heroImg} heroTitle={'Welcome Back'} />
      <PageHeader title="User Profile!"/>
      <div className="container my-5">
        <h4 className="h5">Name: {userInfo.name}</h4>
        <h4 className="h5">Email: {userInfo.email}</h4>
        <h4 className="h5">Sign up data: {userInfo.dateCreated}</h4>
      <Link to="/myBizCards" className="btn btn-purple me-2 my-2">My Cards</Link>
      <Link to="/favorites" className="btn btn-purple my-2">My Favorites</Link>
      </div>
    </div> 
  )
}

export default UserInfo