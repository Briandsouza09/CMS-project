require('dotenv').config();
const app = require('./app');
console.log('Environment Variables:', process.env);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});