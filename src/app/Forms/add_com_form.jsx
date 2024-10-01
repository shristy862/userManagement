import React from 'react';

const AddComForm = ({ companyDetails, handleInputChange, addCompany, loading }) => {
  return (
    <form onSubmit={addCompany}>
      <input
        type="text"
        name="companyName"
        value={companyDetails.companyName}
        onChange={handleInputChange}
        placeholder="Company Name"
        required
      />
      <input
        type="text"
        name="registrationNo"
        value={companyDetails.registrationNo}
        onChange={handleInputChange}
        placeholder="Registration No"
        required
      />
      <input
        type="text"
        name="gstNo"
        value={companyDetails.gstNo}
        onChange={handleInputChange}
        placeholder="GST No"
        required
      />
      <input
        type="text"
        name="companyId"
        value={companyDetails.companyId}
        onChange={handleInputChange}
        placeholder="Company ID"
        required
      />
      <input
        type="text"
        name="contactNo"
        value={companyDetails.contactNo}
        onChange={handleInputChange}
        placeholder="Contact No"
        required
      />
      <input
        type="text"
        name="location"
        value={companyDetails.location}
        onChange={handleInputChange}
        placeholder="Location"
        required
      />
      <input
        type="text"
        name="representative"
        value={companyDetails.representative}
        onChange={handleInputChange}
        placeholder="Representative"
        required
      />
      <input
        type="email"
        name="email"
        value={companyDetails.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={companyDetails.password}
        onChange={handleInputChange}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding Company...' : 'Add Company'}
      </button>
    </form>
  );
};

export default AddComForm;
