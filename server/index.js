const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth.routes'); 
const dashboardRoutes = require('./routes/dashboard.routes'); 
const subdivisionsRoutes = require('./routes/subdivisions.routes')
const usersRoutes = require('./routes/users.routes')

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

app.use('/api/auth', authRoutes);  
app.use('/api/dashboard', dashboardRoutes);  
app.use('/api/dashboard', subdivisionsRoutes);  
app.use('/api/dashboard', usersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
