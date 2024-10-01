import React from 'react';

const UpdateForm = ({
  currentEmail,
  newEmail,
  setNewEmail,
  handleUpdateEmail,
  isFormVisible,
  setIsFormVisible,
}) => {
  return (
    <>
      <button className="update" onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Cancel' : 'Update Email'}
      </button>

      {isFormVisible && (
        <form onSubmit={handleUpdateEmail} className="email-update-form">
          <div className="form-group">
            <label className="form-label">Current Email:</label>
            <input
              type="email"
              value={currentEmail}
              placeholder="Enter existing email"
              className="form-input"
              disabled // Disable input as it is fetched from the database
            />
          </div>
          <div className="form-group">
            <label className="form-label">New Email:</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email"
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </>
  );
};

export default UpdateForm;
