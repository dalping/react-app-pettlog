import React from 'react'
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import LoginPage from './components/views/LoginPage/LoginPage';
import MainPage from './components/views/MainPage/MainPage';
import NavBar from './components/views/NavBar/NavBar';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
// import MyPage from './components/views/MyPage/MyPage';
import Auth from './hoc/auth';
import WritePost from './components/views/WritePost/WritePost';

function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <div />
        <Switch>
          <Route exact path="/" component={Auth(MainPage, null)} />
          {/* <Route exact path="/mypage" component={Auth(MyPage, true)} /> */}
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/write" component={Auth(WritePost, true)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  )
}

export default App