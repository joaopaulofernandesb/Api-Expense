import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User, { IUser } from '../models/User';

dotenv.config();

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET as string;
const jwtExpiration = process.env.JWT_EXPIRATION as string;

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const user: IUser = new User({
        username,
        password: hashedPassword,
      });
  
      await user.save();
  
      const token = jwt.sign({ userId: user._id, username: user.username }, jwtSecret, { expiresIn: jwtExpiration });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
  };
  
  export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }
  
      const token = jwt.sign({ userId: user._id, username: user.username }, jwtSecret, { expiresIn: jwtExpiration });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao fazer login.' });
    }
  };
  