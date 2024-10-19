import Company from '../modals/companyModal.js';  

const updateEmail = async (req, res) => {
  try {
    const companyId = req.params.id; 
    console.log('Here is the companyID',companyId) 
    const { newEmail } = req.body;    

    const company = await Company.findByIdAndUpdate(
      companyId,
      { email: newEmail }, 
      { new: true }        
    );

    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    res.status(200).json({
      message: 'Email updated successfully.',
      company
    });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ message: 'Server error. Could not update email.' });
  }
};
export default updateEmail;