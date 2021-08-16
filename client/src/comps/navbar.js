import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserData, updateUserData } from '../services/userSer';
function NavBar(props) {
  let [showMobileNav, setShowMobileNav] = useState(false);
  let [user, setUser] = useState(null)
  let history = useHistory()

  useEffect(() => {
    setShowMobileNav(false);
    setUser(getUserData)
  }, [props.location])


  const logOut = async () => {
    // alert("log out");
    localStorage.removeItem("tok");
    await updateUserData();
    history.push("/login");
    toast.info("You logged out from system !");
  }

  return (
    <>
  <div className="topNav container-fluid shadow bg-dark">
    <div className="row align-items-center">
      <div className="logo col-lg-3 d-flex justify-content-between align-items-center">
        <h2 className="logo">BizUp</h2>
        <div className="burger text-white" onClick={() => {
          setShowMobileNav(!showMobileNav);
        }}>
          <i className="fa fa-bars fs-2" aria-hidden="true"></i>
        </div>
      </div>
      <nav className="col-lg-9 bg-dark text-end" style={{ transform: showMobileNav && "translateX(0%)" }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {!localStorage["tok"] ?
            <React.Fragment>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </React.Fragment>
            :
            <React.Fragment>
              {/* ? - if yet before the dot (.) the object/prop doesnt exist or null it wont return error */}
              {user?.biz && <Link to="/myBizCards">My Cards</Link>}
              <Link to="/userInfo">Profile</Link>
              <Link onClick={logOut} to="#" className="text-danger">Log out</Link>
            </React.Fragment>
          }

        </nav>
      </div>
    </div>
    </>
  )
}

export default NavBar