const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/users.routes'); 
const dashboardRoutes = require('./routes/dashboard.routes'); 
const subdivisionsRoutes = require('./routes/subdivisions.routes')

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

app.use('/api/auth', userRoutes);  
app.use('/api/dashboard', dashboardRoutes);  
app.use('/api/dashboard', subdivisionsRoutes);  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
