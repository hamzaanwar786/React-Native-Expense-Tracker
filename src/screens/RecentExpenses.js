import React, {useContext} from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {ExpenseContext} from '../store/expense-context';
import {daysMinusfromDate} from '../utils/date';

const RecentExpenses = () => {
  const expenseCtx = useContext(ExpenseContext);
  const recentExpenses = expenseCtx.expense.filter(expense => {
    const todayDate = new Date();
    const last7days = daysMinusfromDate(todayDate, 7);
    console.log(expense.date > last7days);
    console.log(last7days);
    return expense.date > last7days;
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensePeriod={'Last 7 days'} />
  );
};

export default RecentExpenses;
