import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';

export function signToken(user) {
  return jwt.sign(
    {
      email: user.email
    },
    env.jwtSecret,
    {
      subject: user._id.toString(),
      expiresIn: env.jwtExpiresIn
    }
  );
}
