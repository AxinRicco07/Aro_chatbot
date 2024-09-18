import React from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Landing from './Pages/Landing.jsx';
import Chatpage from './Pages/Chatpage.jsx';
import LoginSignup from './Pages/LoginSignup.jsx';
import Info from './Pages/info.jsx'
import HealthAdvice from './Components/Sidebar/HealthAdvice.jsx';



function App() {
  return (
    <BrowserRouter>
    <div >
    
     <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/Chat' element={<Chatpage/>}/>
      <Route path='/welcome' element={<LoginSignup/>}/>
      <Route path='/Info' element={<Info/>}/>
      <Route path='/HealthAdvice' element={<HealthAdvice/>}/>
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
