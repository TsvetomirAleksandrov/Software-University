const express = require('express');
const routes = require('./routes');
const { PORT } = require('./config/config');
const app = express();
require('./config/mongoose');
require('./config/express')(app);

app.use(routes);

// TODO: Express config
// TODO: Add routes and controllers
// TODO: Add services
// TODO: Add error handler
// TODO: Sample view and layout 
// TODO: Add user model
// TODO: User register
// TODO: User login
// TODO: User logout
// TODO: Authentication middleware
// TODO: Authorization middleware
// TODO: Notifications

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));