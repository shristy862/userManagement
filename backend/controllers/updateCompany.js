import Company from '../modals/companyModal.js';

const updateCompanyDetails = async (req, res) => {
  const companyId = req.params.id; 
  console.log('here is the company ID',companyId); 

  const { companyName, registrationNo, gstNo, contactNo, location, representative } = req.body; 

  try {
    
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      {
        companyName,      
        registrationNo,    
        gstNo,         
        contactNo,        
        location,         
        representative     
      },
      { new: true } 
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    res.status(200).json({
      message: 'Company details updated successfully.',
      updatedDetails: {
        companyName: updatedCompany.companyName,
        registrationNo: updatedCompany.registrationNo,
        gstNo: updatedCompany.gstNo,
        contactNo: updatedCompany.contactNo,
        location: updatedCompany.location,
        representative: updatedCompany.representative
      }
    });
  } catch (error) {
    console.error('Error updating company details:', error);
    res.status(500).json({ message: 'Server error. Could not update company details.' });
  }
};
export default updateCompanyDetails;