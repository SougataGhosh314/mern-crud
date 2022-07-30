require("dotenv").config()

const express = require("express")
const mongoose = require('mongoose')
const workoutRoutes = require("./routes/workoutRoutes")

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, resp, next) => {
    console.log(req.path, req.method)

    // next middleware
    next()
})

app.use("/api/workouts", workoutRoutes)

// connect to db and listen for requests
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
.then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
        console.log('listening for requests on port', process.env.PORT)
    })
})
.catch((err) => {
    console.log(err)
})