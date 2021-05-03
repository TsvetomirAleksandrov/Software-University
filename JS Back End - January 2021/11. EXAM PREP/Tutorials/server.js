const express = require('express');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { PORT } = require('./config/config');

const app = express();

require('./config/mongoose');
require('./config/express')(app);

app.use(routes);
app.use(errorHandler);

// TODO: Express config - OK
// TODO: Add routes and controllers - OK
// TODO: Add services - OK
// TODO: Add error handler - OK
// TODO: Sample view and layout - OK
// TODO: Add user model
// TODO: Hash Password
// TODO: User register
// TODO: User login
// TODO: User logout
// TODO: Authentication middleware
// TODO: Authorization middleware
// TODO: Notifications

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));