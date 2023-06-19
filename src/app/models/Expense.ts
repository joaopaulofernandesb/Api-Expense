import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  title: string;
  amount: number;
  month: string;
  year: string;
  installments: number;
  installmentIdentified:string,
  userId: mongoose.Types.ObjectId; // Referência ao usuário
}

const ExpenseSchema: Schema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true },
  year: { type: String, required: true },
  installments: { type: Number, required: true },
  installmentIdentified:{type:String},
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Referência ao usuário
});

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
