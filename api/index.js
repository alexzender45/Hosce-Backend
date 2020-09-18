import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//
// error handler
app.use((error, req, res, next) => res.status(error.status || 500).send(error));

routes(app);

const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Server ready at http://localhost:${port}`));

module.exports = app;
