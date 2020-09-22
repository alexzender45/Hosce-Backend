import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//
//
// error 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });
app.use((error, req, res, next) => res.status(error.status || 500).json(error));
routes(app);
app.use(express.json())
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Server ready at http://localhost:${port}`));

module.exports = app;
