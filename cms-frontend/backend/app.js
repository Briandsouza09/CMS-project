const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const guideRoutes = require('./routes/guideRoutes');
const reportRoutes = require('./routes/reportRoutes');
const licenseRoutes = require('./routes/licenseRoutes'); // <-- Added this line

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/guide', guideRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/license', licenseRoutes); // <-- Added this line

// Error handler
app.use(errorHandler);

module.exports = app;
