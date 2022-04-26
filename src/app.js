const express = require('express');
const config = require('./config');
const employeeRoutes = require('./routers/employees.routes');
const app = express();

app.set('port',config.port);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/api',employeeRoutes);

module.exports = { app };
