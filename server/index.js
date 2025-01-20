const express = require("express")
const app = express()
const cors = require("cors")

const UserRouter = require('./routes/users.routes')
const DashboardRouter = require('./routes/dashboard.routes')

//middleware
app.use(express.json())
app.use(cors())

app.use('/auth', UserRouter)
app.use('/dashboard', DashboardRouter)

app.listen(8000, () => {
    console.log(`server worked on port 8000`)
})