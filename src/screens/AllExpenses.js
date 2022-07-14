import React, {useContext} from 'react';
import {ExpenseContext} from '../store/expense-context';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

const AllExpenses = () => {
  const expenseCtx = useContext(ExpenseContext);

  return (
    <ExpensesOutput
      expenses={expenseCtx.expense}
      expensePeriod={'Today'}
      fallBackText={'No expense registered!!'}
    />
  );
};

export default AllExpenses;
