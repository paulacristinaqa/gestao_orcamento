import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';
import { signToken } from '../utils/jwt.js';

async function register({ name, email, password }) {
  if (!name || !email || !password) {
    const error = new Error('Nome, e-mail e senha sao obrigatorios');
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error('E-mail ja cadastrado');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  const token = signToken(user);

  return {
    token,
    user: sanitizeUser(user)
  };
}

async function login({ email, password }) {
  if (!email || !password) {
    const error = new Error('E-mail e senha sao obrigatorios');
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email });
  const passwordMatches = user ? await bcrypt.compare(password, user.password) : false;

  if (!passwordMatches) {
    const error = new Error('Credenciais invalidas');
    error.statusCode = 401;
    throw error;
  }

  const token = signToken(user);

  return {
    token,
    user: sanitizeUser(user)
  };
}

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

export const authService = {
  register,
  login
};
