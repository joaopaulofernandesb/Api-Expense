import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './app/routes/authRoutes';
import expenseRoutes from './app/routes/expenseRoutes';

dotenv.config();

const app: Application = express();

app.use(express.json());

// Rotas

app.use('/api', authRoutes);
app.use('/api', expenseRoutes);

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(process.env.PORT || 3000, () => {
      console.log('Servidor iniciado na porta', process.env.PORT || 3000);
    });
  })
  .catch((error) => {
    console.log('Erro ao conectar ao MongoDB', error);
  });
