const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes')
const subdivisionsRoutes = require('./routes/subdivisions.routes')
const usersRoutes = require('./routes/users.routes')
const devicesRoutes = require('./routes/devices.routes')
const departmentsRoutes = require('./routes/departments.routes')
const moveDeviceRoutes = require('./routes/moveDevice.routes')
const passwordRoutes = require('./routes/password.routes')
const accountRoutes = require('./routes/account.routes')


dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

app.use('/api/auth', authRoutes);  
app.use('/api/dashboard', dashboardRoutes);  
app.use('/api/dashboard', subdivisionsRoutes);  
app.use('/api/dashboard', usersRoutes);
app.use('/api/dashboard', usersRoutes);
app.use('/api/dashboard', devicesRoutes);
app.use('/api/dashboard', departmentsRoutes);
app.use('/api/dashboard', moveDeviceRoutes);
app.use('/api/dashboard', passwordRoutes);
app.use('/api/dashboard', accountRoutes);



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
