import Company from '../modals/companyModal.js';  

const fetchAddedCompanies = async (req, res) => {
  try {
    const userId = req.params.id;  
    console.log(userId);
    const companies = await Company.find({ userId });

    if (companies.length === 0) {
      return res.status(404).json({ message: 'No companies found for this user.' });
    }

    res.status(200).json({
      message: 'Companies fetched successfully',
      companies
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Server error. Could not fetch companies.' });
  }
};
export default fetchAddedCompanies;