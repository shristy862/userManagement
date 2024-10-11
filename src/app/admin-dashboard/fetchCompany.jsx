'use client';
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import './style.css'

const FetchCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);


  useEffect(() => {
    const fetchAddedCompanies = async () => {
      setLoading(true);
      setError(null);

      // Retrieve userInfo from session storage
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

      // Log the entire userInfo object for debugging
      console.log('User Info from fetch route:', userInfo);

      // Check if userInfo exists and extract token, userId, and role
      if (!userInfo || !userInfo.token) {
        setError('Token or User ID is missing.');
        setLoading(false);
        return;
      }

      const { token, id, role } = userInfo;

      // Log the token, userId, and role
      console.log('Token:', token);
      console.log('User ID:', id);
      console.log('User Role:', role);

      if (!id) {
        setError('User ID is undefined.');
        setLoading(false);
        return;
      }

      try {
        // Use `id` in the fetch URL
        const response = await fetch(`http://localhost:5000/api/users/admin-dashboard/${id}/fetchaddedcompanies`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Include token
            'Content-Type': 'application/json',
          },
        });

        // Log the raw response before parsing
        console.log('Raw Response:', response);

        // Convert response to JSON
        const data = await response.json();

        // Log the parsed JSON data
        console.log('Parsed Response:', data); // Log the entire response object

        if (response.ok) {
          
          setCompanies(data.companies); // Set companies if successful
        } else {
          setError(data.message || 'Error fetching companies');
        }
      } catch (err) {
        setError('Error fetching companies: ' + err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAddedCompanies();
  }, []);

  const handleEdit = (company) => {
    setCurrentCompany(company);
    setEditMode(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    
    // Retrieve userInfo from session storage
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    
    // Log userInfo to verify it's being retrieved
    console.log(userInfo);
  
    if (!userInfo) {
      setError('User is not logged in.');
      return;
    }
  
    // Extract the token from userInfo
    const token = userInfo.token;
  
    if (!currentCompany) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/users/admin-dashboard/${currentCompany._id}/update_company_details`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`, // Use the extracted token here
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentCompany),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        message.success('Update successful!');
        // Update the companies state
        setCompanies((prevCompanies) =>
          prevCompanies.map((company) =>
            company._id === currentCompany._id ? { ...currentCompany } : company
          )
        );
        setEditMode(false);
        setCurrentCompany(null);
      } else {
        setError(data.message || 'Error updating company');
      }
    } catch (err) {
      setError('Error updating company: ' + err.message);
    }
  };
  return (
    <div className='company-data text-black'>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Conditionally render the company table or edit form */}
      {editMode ? (
       <div className="edit-form">
         <div>
          <h1 className='text-black'>Edit Company</h1>
          <form  className='data' onSubmit={handleUpdate}>
            <label>
              Company Name:
              <input
                type="text"
                value={currentCompany?.companyName || ''}
                onChange={(e) => setCurrentCompany({ ...currentCompany, companyName: e.target.value })}
                required
              />
            </label>
            <label>
              GST No:
              <input
                type="text"
                value={currentCompany?.gstNo || ''}
                onChange={(e) => setCurrentCompany({ ...currentCompany, gstNo: e.target.value })}
                required
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                value={currentCompany?.location || ''}
                onChange={(e) => setCurrentCompany({ ...currentCompany, location: e.target.value })}
                required
              />
            </label>
            <label>
              Representative:
              <input
                type="text"
                value={currentCompany?.representative || ''}
                onChange={(e) => setCurrentCompany({ ...currentCompany, representative: e.target.value })}
                required
              />
            </label>
            <label>
            Company ID (_id):
            <input
              type="text"
              value={currentCompany?._id || ''}
              onChange={(e) => setCurrentCompany({ ...currentCompany, _id: e.target.value })}
              required
              disabled // Optionally, keep this field disabled to prevent edits
            />
          </label>
            <label>
              Email:
              <input
                type="email"
                value={currentCompany?.email || ''}
                onChange={(e) => setCurrentCompany({ ...currentCompany, email: e.target.value })}
                disabled 
              />
            </label>
            <div className="buttons">
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditMode(false)}>Cancel</button>

            </div>
          </form>
        </div>
       </div>
      ) : (
        <div>
          {/* Display companies in a table format */}
          {companies.length > 0 ? (

            <table className="company-table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Company ID</th>
                  <th>GST No</th>
                  <th>Location</th>
                  <th>Representative</th>
                  <th>Email</th>
                  <th>Company ID (_id)</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {companies.map(company => (
                  <tr key={company._id}>
                    <td>{company.companyName}</td>
                    <td>{company.companyId}</td>
                    <td>{company.gstNo}</td>
                    <td>{company.location}</td>
                    <td>{company.representative}</td>
                    <td>{company.email}</td>
                    <td>{company._id}</td>
                    <td>
                      <button className="edit-button" onClick={() => handleEdit(company)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No companies found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FetchCompanies;
