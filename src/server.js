const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const router = require('./routers/v1');
const { errorMiddleware } = require('./middlewares');
const viewAdminRouter = require('./routers/viewAdmin.route');
const viewClientRouter = require('./routers/viewClient.route');

const app = express();

const port = process.env.PORT || 8080;
const mongoURI =
  process.env.DB_URI || 'mongodb://127.0.0.1:27017/medical-booking';

(async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connect database successfully!');

    // Initialize DB
    let [roleKH, roleAdmin] = await Promise.all([
      mongoose.model('Role').findOneAndUpdate(
        { roleIndex: 'khach-hang' },
        {
          $setOnInsert: {
            roleName: 'Khách hàng',
            roleIndex: 'khach-hang',
          },
        },
        { upsert: true },
      ),
      mongoose.model('Role').findOneAndUpdate(
        { roleIndex: 'admin' },
        {
          $setOnInsert: {
            roleName: 'Admin',
            roleIndex: 'admin',
          },
        },
        { upsert: true },
      ),
    ]);
    let adminAccount = await mongoose
      .model('User')
      .findOne({ email: 'admin@gmail.com' });
    if (!adminAccount) {
      const User = mongoose.model('User');
      adminAccount = new User({
        lastName: 'Quản trị',
        firstName: 'hệ thống',
        email: 'admin@gmail.com',
        cardId: '0000000000',
        isEmailVerified: true,
        roles: [roleKH._id, roleAdmin._id],
      });
      adminAccount.password = 'admin123';
      adminAccount.save();
    }
    console.log('Admin email:', adminAccount.email);
  } catch (error) {
    console.log(error);
  }
})();

app.use(express.json());

// Static files
app.use('/static/', express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parse cookie
app.use(cookieParser('medical-booking'));

// API v1
app.use('/api/v1/', router);
app.use('/admin', viewAdminRouter);
app.use('/', viewClientRouter);

// Handle error
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
