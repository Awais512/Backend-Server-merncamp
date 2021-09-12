import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const morgan = require('morgan');
require('dotenv').config();
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
    origin: ['http://localhost:5000'],
  })
);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

//Server Setup
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port: ${process.env.PORT}`)
);
