import { Request, Response } from "express";
import Expense, { IExpense } from "../models/Expense";
import { v4 as uuidv4 } from "uuid";

export const getExpensesByMonth = async (req: Request, res: Response) => {
  const { userId, month, year } = req.params;

  try {
    const expenses: IExpense[] = await Expense.find({
      month: month,
      year: year,
      userId: userId,
    }).exec();

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar as despesas." });
  }
};

export const getAllExpensers = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const expensesAll: IExpense[] = await Expense.find({ userId: userId });

    res.json(expensesAll);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar as despesas." });
  }
};


export const getMonthlyExpenseStatistics = async (req: Request, res: Response) => {
  const { month, year,userId } = req.params;

  try {
    // Converter o mês e ano para números
    const targetMonth = parseInt(month as string, 10);
    const targetYear = parseInt(year as string, 10);
    

    // Verificar se os valores são válidos
    if (isNaN(targetMonth) || isNaN(targetYear) || targetMonth < 1 || targetMonth > 12) {
      return res.status(400).json({ message: 'Mês ou ano inválidos.' });
    }

    // Realizar a consulta no banco de dados para obter as despesas do mês
    const expenses = await Expense.find({
      userId,
      month: targetMonth.toString().padStart(2, "0"),
      year: targetYear.toString()
    }).exec();

    // Calcular o valor total das despesas
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense += expense.amount;
    });

    res.json({ month: targetMonth, year: targetYear, totalExpense });
  } catch (error) {
  
    res.status(500).json({ message: 'Erro ao obter estatísticas de despesas mensais.' });
  }
};


export const createExpense = async (req: Request, res: Response) => {
  const { title, amount, month, year, installments, userId } = req.body;

  try {
    const numericAmount = parseFloat(amount.replace(",", "."));
    const installmentIdentified = uuidv4();

    if (installments && installments > 1) {
      const initialYear = parseInt(year, 10);
      const initialMonth = parseInt(month, 10);
      let currentYear = initialYear;
      let currentMonth = initialMonth + 1;

      const installmentAmount = numericAmount / installments;

      for (let i = 0; i < installments; i++) {
        const formattedMonth = currentMonth.toString().padStart(2, "0");

        const installmentExpense: IExpense = new Expense({
          title: `${title} (Parcela ${i + 1}/${installments})`,
          amount: installmentAmount.toString(),
          month: formattedMonth,
          year: currentYear.toString(),
          installments,
          installmentIdentified,
          userId,
        });

        await installmentExpense.save();

        currentMonth++;
        if (currentMonth > 12) {
          currentMonth = 1;
          currentYear++;
        }
      }
    } else {
      const initialMonth = parseInt(month, 10);
      let currentMonth = initialMonth + 1;
      const formattedMonth = currentMonth.toString().padStart(2, "0");

      const expense: IExpense = new Expense({
        title,
        amount: numericAmount.toString(),
        month: formattedMonth,
        year,
        installments: 1,
        userId,
      });

      await expense.save();
    }

    res.status(201).json({ message: "Despesa(s) criada(s) com sucesso." });
  } catch (error) {
  
    res.status(500).json({ message: "Erro ao criar a(s) despesa(s)." });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, amount, month, year } = req.body;

  try {
    const expense: IExpense | null = await Expense.findById(id).exec();

    if (!expense) {
      return res.status(404).json({ message: "Despesa não encontrada." });
    }

    expense.title = title;
    expense.amount = amount;
    expense.month = month;
    expense.year = year;

    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar a despesa." });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const expense: IExpense | null = await Expense.findById(id).exec();

    if (!expense) {
      return res.status(404).json({ message: "Despesa não encontrada." });
    }

    const { installmentIdentified, installments } = expense;
    const installmentsToDelete = [id];

    if (installments && installments > 1) {
      const installment: IExpense[] = await Expense.find({
        installmentIdentified,
      }).exec();

      if (installment.length > 0) {
        const installmentIds = installment.map((inst) => inst._id);
        installmentsToDelete.push(...installmentIds);
      }

      await Expense.deleteMany({ _id: installmentsToDelete }).exec();

      return res.json({
        message: "Despesa(s) parcelada(s) excluída(s) com sucesso.",
      });
    }
    await Expense.deleteOne({ _id: id }).exec();
    return res.json({ message: "Despesa(s) excluída(s) com sucesso." });
  } catch (error) {
  
    res.status(500).json({ message: "Erro ao excluir a(s) despesa(s)." });
  }
};
