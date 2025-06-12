import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import {validationMiddleware} from "../../middlewares/validation.middleware.js"
import { loginSchema, signupSchema } from './users.validation.js';
import { getUserProfile, login, signup } from './users.controller.js';
import { auth } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post(
  '/signup',
  validationMiddleware(signupSchema),
  expressAsyncHandler(signup)
);

router.post(
  '/login',
  validationMiddleware(loginSchema),
  expressAsyncHandler(login)
);

router.get(
  '/profile',
  auth,
  expressAsyncHandler(getUserProfile)
);
export default router;