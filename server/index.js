const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const router = require('./Routers/router.js');
const path = require('path');
const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.json());
app.use(morgan('dev'));
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));