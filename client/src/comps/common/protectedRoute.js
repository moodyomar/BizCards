import React from 'react';
import { Route, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { checkIfUser } from '../../services/authSer';
import { getUserData } from '../../services/userSer';

function ProtectedRoute(props) {
  let history = useHistory();

  const checkTokenUser = async () => {
    let data = await checkIfUser()
    console.log(data);

// check if we recived the props biz
    // which mean its not enough to be registed/user
    // it need to be a busniess as well.
    if(props.bizRoute){
      //check the user if its business user
      // firstly must pull the data from user service
      let user = getUserData();
      if(!user.biz){
        toast.warning("You must be business");
        history.push("/");
      }
    }

    // if all good , status w'll be recived
    if (!data.status) {
      // toast.error("zzzz"); // this msg is shows when login out aswell
      // delete token if invalid
      localStorage.removeItem("tok");
      history.push("/login");
    }
  }

  return (
    <Route exact path={props.path}
      render={() => {
        // check if user loggen in , other wise send to login pg
        checkTokenUser();
        return (<props.comp {...props} />);
      }} />
  )
}

export default ProtectedRoute;