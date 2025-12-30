import React, { useEffect, useState } from 'react'
import Addtask from './Addtask'
import Tasklist from './Tasklist'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    const handleStorageChange = (event) => {
      if (event.key === "token") {
        window.location.reload();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const [msg, setMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [type, setType] = useState("success");
  return (
    <>
      <Navbar />
      <Alert
        show={showAlert}
        type={type}
        message={msg}
        onClose={() => setShowAlert(false)}
      />

      <Addtask setMsg={setMsg} setShowAlert={setShowAlert} setType={setType} />
      <Tasklist setMsg={setMsg} setShowAlert={setShowAlert} setType={setType} />
    </>
  )
}

export default Home