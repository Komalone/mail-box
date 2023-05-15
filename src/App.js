import { Fragment } from "react";
import './App.css';
import Login from "./components/auth/Login";
import MainMail from "./components/Mail/ComposeMail";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Mail/Header";
import Inbox from "./components/Mail/Inbox";
import SentBox from "./components/Mail/SentInbox";

function App() {
  const isLogin=useSelector(state=> state.auth.isUserLogin)
  console.log(isLogin);

  return (
    <Fragment>
      <div className="main">
      {isLogin && <Header/>}
      <Routes>
      <Route path="/" element={isLogin ? <Inbox/> : <Login/>} />
      <Route path="/compose" element={isLogin ? <MainMail/> : <Login/> }/> 
      <Route path="/sentbox" element={isLogin && <SentBox/>} />
      </Routes>
      </div>
    </Fragment>
  );
}

export default App;
