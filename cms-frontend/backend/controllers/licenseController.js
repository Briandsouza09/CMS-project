const License = require('../models/License');

exports.registerLicense = async (req, res) => {
  try {
    const { industryName, email, contact1, contact2 } = req.body;
    if (!industryName || !email || !contact1) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    await License.create(industryName, email, contact1, contact2);
    res.status(201).json({ message: 'License registered successfully!' });
  } catch (error) {
    console.error('License registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.checkLicense = async (req, res) => {
  try {
    const license = await License.findOne();
    res.status(200).json({ exists: !!license });
  } catch (error) {
    console.error('License check error:', error);
    res.status(500).json({ error: 'Failed to check license' });
  }
};

exports.getLicenseData = async (req, res) => {
  try {
    const license = await License.findOne();
    if (!license) {
      return res.status(404).json({ error: 'No license found' });
    }
    res.status(200).json({
      industryName: license.industry_name,
      email: license.email,
      contact1: license.contact1,
      contact2: license.contact2,
      createdAt: license.created_at
    });
  } catch (error) {
    console.error('Fetch license error:', error);
    res.status(500).json({ error: 'Failed to fetch license data' });
  }
};