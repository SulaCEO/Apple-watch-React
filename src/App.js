import React, { useState } from "react";
import Check from "./components/Check/Check";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import './style.scss';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () =>{
  const [isDark, setIsDark] = useState(false);
  const [basket, setBasket] = useState([]);
  

  return(
    <div className="App" style={{backgroundColor: isDark ? 'black' : '#F4F4F4', color: isDark ? 'white' : '#0C1014'}}>
      <ToastContainer/>
      <Header isDark={isDark} basket={basket} setBasket={setBasket}/>
      <Check isDark={isDark} setIsDark={setIsDark} basket={basket} setBasket={setBasket}/>
      <Footer isDark={isDark}/>
    </div>
  )
}

export default App;
