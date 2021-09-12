import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { readdirSync } from 'fs';

const morgan = require('morgan');
require('dotenv').config();

//Routes Files

const app = express();
// import { connectDb } from './db';

//Connecting to Database
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongodb Connected');
  } catch (error) {
    console.log(error);
  }
};
connectDb();

//Express Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

//Routes Middlewares
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

//Server Setup
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port: ${process.env.PORT}`)
);
