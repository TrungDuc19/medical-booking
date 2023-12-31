const express = require('express');
const {
  authMiddleware,
  roleMiddleware,
  uploadMiddleware,
} = require('../../middlewares');
const { userController } = require('../../controllers');

const userRouter = express.Router();

userRouter.patch(
  '/profile',
  authMiddleware,
  uploadMiddleware.uploadAvatar,
  userController.updateProfile,
);

userRouter.use(authMiddleware);
userRouter.use(roleMiddleware(['admin']));

userRouter
  .route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

userRouter
  .route('/:userId')
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = userRouter;
