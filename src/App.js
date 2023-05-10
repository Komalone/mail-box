import { Fragment } from "react";
import Login from "./components/auth/Login";
import MainMail from "./components/Mail/MainMail";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Mail/Header";

function App() {
  const isLogin=useSelector(state=> state.auth.isUserLogin)
  console.log(isLogin);

  return (
    <Fragment>
      <Header/>
      <main >
      <Routes>
      <Route path="/" element={!isLogin && <Login/> }/>
      <Route path="/inbox" element={isLogin && <MainMail/>} />
      </Routes>
      </main>
    </Fragment>
  );
}

export default App;
