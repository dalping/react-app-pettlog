import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/views/LoginPage/LoginPage";
import MainPage from "./components/views/MainPage/MainPage";
import NavBar from "./components/NavBar/NavBar";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
// import MyPage from './components/views/MyPage/MyPage';
import Auth from "./hoc/auth";
import WritePost from "./components/views/WritePostPage/WritePostPage";
import Message from "./components/views/MessagePage/MessagePage";
import PostWriterPage from "./components/views/PostWriterPage/PostWriterPage";
import ImageViewer from "./components/ImageViewer/ImageViewer";

const MyStore = React.createContext();

function App() {
  const [ShowViewer, setShowViewer] = useState(false);
  //const store = { setShowViewer };

  return (
    <Router>
      <ImageViewer ShowViewer={ShowViewer} />
      <NavBar />
      <Switch>
        {/* <Route exact path="/mypage" component={Auth(MyPage, true)} /> */}
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/write" component={Auth(WritePost, true)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route exact path="/message" component={Auth(Message, true)} />
        <Route
          exact
          path="/Post/:postWriterId"
          component={Auth(PostWriterPage, true)}
        />
        <Route path="/home" component={Auth(MainPage, true)} />
        <Route path="/" component={Auth(MainPage, true)} />
      </Switch>
    </Router>
  );
}

export default App;
