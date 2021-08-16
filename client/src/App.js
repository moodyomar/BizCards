import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import NavBar from './comps/navbar';
import Home from './comps/home';
import About from './comps/about';
import Page404 from './comps/page404';
import SignUpClient from './comps/signup';
import Login from './comps/login';
import Footer from './comps/footer';
import UserInfo from './comps/userInfo';
import ProtectedRoute from './comps/common/protectedRoute';
import { updateUserData } from './services/userSer';
import FavoriteCards from './comps/favoriteCards';
import MyCards from './comps/biz/myCards';
import AddCard from './comps/biz/addCard';
import EditCard from './comps/biz/editCard';


function App() {


  let [user, setUser] = useState()

  useEffect(() => {
    ifUserLogin()
    // shows the main tag down there only after we recive the user data + token
  }, [])

  const ifUserLogin = async () => {
    // userdata will have the returned user from the func down here
    let userData = await updateUserData();
    setUser(userData);
  }

  return (
    <Router>
      <header>
        {/*  */}
        {user && <Route path="/" component={NavBar} />}
      </header>
      {/* will not show main tag until it get data for user */}
      {user &&
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/signup" component={SignUpClient} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/userInfo" component={UserInfo}/> */}
            <ProtectedRoute path="/userInfo" comp={UserInfo} />
            <ProtectedRoute path="/favorites" comp={FavoriteCards} />
            <ProtectedRoute path="/myBizCards" comp={MyCards} bizRoute={true} />
            <ProtectedRoute path="/addCard" comp={AddCard} bizRoute={true} />
            <ProtectedRoute path="/editCard/:id" comp={EditCard} bizRoute={true} />
            <Route path="/" component={Page404} />
          </Switch>
        </main>
      }
      <footer>
        <Footer />
      </footer>
      <ToastContainer position="bottom-left" />
    </Router>
  );
}

export default App;
