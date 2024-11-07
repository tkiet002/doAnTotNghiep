import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
export default function Dropdown() {

  const { setAuthState } = useContext(AuthContext);
  let accessToken = localStorage.getItem("accessToken");

    const show = () => {
      document.getElementById("myDropdown").classList.add("show");
    };

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function (event) {
      if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
      

  
  return (
    <div className="dropdown">
      <div onClick={show} className="dropbtn">
        U
      </div>

      <div id="myDropdown" className="dropdown-content">
        {accessToken && <Link to={"/logout"}>Logout</Link>}
        {!accessToken && <>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </>}
      </div>
    </div>
  );
}
