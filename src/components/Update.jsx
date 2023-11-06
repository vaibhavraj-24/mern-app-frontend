import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';



const Update = () => { 
  const [name, setName ] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge ] = useState(0);

  const [error, setError] = useState("");
  const {id} = useParams();

  const navigate = useNavigate();
 

  const getSingleUser = async ()=>{

  const response = await fetch(`http://localhost:5000/${id}`, {
    method: "GET",

  });
   
  const result = await response.json();

    if (!response.ok) {

      console.log(result.error);
      setError("result.error");


    }

    if (response.ok) {
      setError("");
      console.log("updated user ", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);



    }

  }
  
  const handleUpdate = async (e) => { 
    
    e.preventDefault();

    const updatedUser = { name, age, email };

    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",


      },

    });

    const result = await response.json();

    if (!response.ok) {

      console.log(result.error);
      setError("result.error");  
    }

    if (response.ok) {
      console.log(result);
      setError("");
      navigate("/all");
    }





  }

  useEffect(() => {
  getSingleUser();

  }, []);


  return (
    <div class="container my-2" >

    {error && <div class="alert alert-danger" >
{error}
</div>
}
    <h2 class="text-center">Edit the Data</h2>

    <form onSubmit={handleUpdate}>
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div class="mb-3">
        
        <label class="form-label">Email address</label>
        <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div class="mb-3">
        <label class="form-label">Age</label>
        <input type="number" class="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    

  </div>
  )
}

export default Update;