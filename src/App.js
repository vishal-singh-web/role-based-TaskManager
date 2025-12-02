import './App.css';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login /> } />
          <Route path="/signup" element={<Signup /> } />
        </Routes>
      </Router>
    </>
  )
}

export default App;