import React, { useState } from 'react'
import { Link, json } from 'react-router-dom'


const Navbar = () => {

   const [filterText, setFilterText] = useState('');

  const handleFilterTextChange = (newFilterText) => {
    setFilterText(newFilterText);
  };


  return (

    <nav class="navbar navbar-expand-lg navbar-dark bg-success">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">VR@j</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link to="/" class="nav-link" >Create ID</Link>
            </li>
            <li class="nav-item">
              <Link to="/all" class="nav-link" >ALL ID</Link>
            </li>




          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 