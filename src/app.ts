require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import configPassport from './passport';
const app = express();

app.use(cors());
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
configPassport(app);
// Routes
app.use('/api', routes);

export default app;
