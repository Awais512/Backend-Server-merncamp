import User from '../models/User';
import asyncHandler from 'express-async-handler';
import { hashPassword, comparePassword } from '../helpers/auth';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, secret } = req.body;

  //Validations
  if (!name) return res.status(400).send('Name is Required');
  if (!password || password.length < 6)
    return res
      .status(400)
      .send('Password is Required and Should be at least 6 characters');
  if (!secret) return res.status(400).send('Answer is Required');

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).send('Email is already taken');

  //Hash the password
  const hashedPassword = await hashPassword(password);

  const user = await new User({
    name,
    email,
    password: hashedPassword,
    secret,
  });
  await user.save();
  res.json({ ok: true });
});
