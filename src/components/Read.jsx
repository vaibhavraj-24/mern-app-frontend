import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [filterText, setFilterText] = useState('');

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:5000');
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        setError('Deleted successfully');
        setTimeout(() => {
          setError('');
          fetchData();
        }, 1000);
      } else {
        setError(result.error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterTextChange = (newFilterText) => {
    setFilterText(newFilterText);
  };

  const filteredItems = data.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className='container my-2' >
      <h2 className='text-center'>All Data</h2>
       <input
        className='col-auto d-flex align-items-center'
        type='text'
        value={filterText}
        onChange={(e) => handleFilterTextChange(e.target.value)}
        placeholder='Search'
        aria-label='Search'
      /> 
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((ele) => (
            <tr key={ele?._id}>
              <td>{ele.name}</td>
              <td>{ele.email}</td>
              <td>{ele.age}</td>
              <td>
                <a
                  href='#'
                  onClick={() => handleDelete(ele._id)}
                  className='btn btn-danger'
                >
                  Delete
                </a>
                <Link
                  to={`/${ele._id}`}
                  className='btn btn-primary mx-2'
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Read;
