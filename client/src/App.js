
import './App.css';
import  Navbar  from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Landing from './Pages/Landing';
import Chatpage from './Pages/Chatpage';
import LoginSignup from './Pages/LoginSignup';
import About from './Pages/about';
import Info from './Pages/info'
import HealthAdvice from './Components/Sidebar/HealthAdvice';



function App() {
  return (
    <BrowserRouter>
    <div >
    <Navbar/>
     <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/Chat' element={<Chatpage/>}/>
      <Route path='/welcome' element={<LoginSignup/>}/>
      <Route path='/aboutus' element={<About/>}/>
      <Route path='/Info' element={<Info/>}/>
      <Route path='/HealthAdvice' element={<HealthAdvice/>}/>
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
