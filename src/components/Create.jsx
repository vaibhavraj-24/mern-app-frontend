import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('18'); // Default value set to 18

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [ageError, setAgeError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !age || nameError || emailError || ageError) {
      setNameError(name ? '' : 'Name is required');
      setEmailError(email ? '' : 'Email is required');
      setAgeError(age ? (age >= 18 && age <= 100) ? '' : 'Age must be between 18 and 100' : 'Age is required');
      return;
    }

    const addUser = { name, age, email };

    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      body: JSON.stringify(addUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      
    }

    if (response.ok) {
      console.log(result);
     
      setName('');
      setEmail('');
      setAge('18'); // Reset age to default value
      navigate('/all');
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setNameError(newName ? '' : 'Name is required');
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(newEmail ? '' : 'Email is required');
  };

  const handleAgeChange = (e) => {
    const newAge = parseInt(e.target.value, 10);
    setAge(newAge.toString());
    setAgeError(newAge >= 18 && newAge <= 100 ? '' : 'Age must be between 18 and 100');
  };

  return (
    <div className="container my-2">
      {(nameError || emailError || ageError) && (
        <div className="alert alert-danger">
          <ul>
            {nameError && <li>{nameError}</li>}
            {emailError && <li>{emailError}</li>}
            {ageError && <li>{ageError}</li>}
          </ul>
        </div>
      )}
      <h2 className="text-center">Enter the Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={handleAgeChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Create;
