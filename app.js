const express = require('express');
const setupRoutes = require('./controllers');
const app = express();
const cors = require("cors");
const connection = require('./db-config');
const port = 8000;

const cookieParser = require('cookie-parser');


app.use(express.json());


app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};


app.use(cors(corsOptions));

setupRoutes(app);


app.listen(port, () => {
  console.log(
    `Mon application est lancée et écoute les requêtes sur le port ${port}`
  );
});
