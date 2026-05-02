import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import User from '../models/user.model.js';

export async function authenticate(req, _res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      const error = new Error('Token nao informado');
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(payload.sub).select('-password');

    if (!user) {
      const error = new Error('Usuario nao encontrado');
      error.statusCode = 401;
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    error.statusCode = error.statusCode || 401;
    next(error);
  }
}
