const express = require('express');
const { medicalFormController } = require('../../controllers');
const { authMiddleware, roleMiddleware } = require('../../middlewares');

const medicalFormRouter = express.Router();

medicalFormRouter.post('/', medicalFormController.createMedicalForm);

medicalFormRouter.get(
  '/user',
  authMiddleware,
  medicalFormController.getMedicalFormsByUser,
);

medicalFormRouter.get(
  '/getAll',
  authMiddleware,
  roleMiddleware(['nhan-vien-phe-duyet']),
  medicalFormController.getAllMedicalForms,
);

medicalFormRouter.get(
  '/:medicalFormId',
  authMiddleware,
  medicalFormController.updateMedicalFormByUser,
);

medicalFormRouter.get(
  '/',
  authMiddleware,
  roleMiddleware(['nhan-vien-phe-duyet']),
  medicalFormController.getMedicalForms,
);

module.exports = medicalFormRouter;
