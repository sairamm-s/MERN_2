const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 5000;
const authRouter = require('../MERN/routes/api/auth');
const usersRouter = require('../MERN/routes/api/users');
const profileRouter = require('../MERN/routes/api/profile');
const postsRouter = require('../MERN/routes/api/posts');

const db = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://sairamm:sairamm04@mern-stack.uloqh.mongodb.net/devConnector?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
  } catch (err) {
    console.log(err);
  }
};
db();
app.use(express.json({ extended: false }));
app.use(cors());
app.get('/', (req, res) => {
  res.send('API running');
});
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postsRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
