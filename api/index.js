import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

const app = express();

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
  })
  .catch((error) => {
    console.log(error);
  });


app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)