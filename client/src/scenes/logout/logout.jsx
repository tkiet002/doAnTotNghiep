import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function logout() {

    let navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate("/");
  }, []);
  return <div>logout</div>;
}
