import React, {useContext, useEffect, useState} from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import {ExpenseContext} from '../store/expense-context';
import {daysMinusfromDate} from '../utils/date';
import {fetchExpenses} from '../utils/http';

const RecentExpenses = () => {
  const[isFetching,setIsFetching] =useState(false);
  const[isError,setError] =useState();
  const expenseCtx = useContext(ExpenseContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expenseCtx.setExpense(expenses);
      } catch (error) {
        setError('Could not fetch expenses!');
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  const recentExpenses = expenseCtx.expense.filter(expense => {
   
    const todayDate = new Date();
    const last7days = daysMinusfromDate(todayDate, 7);
    console.log(expense.date > last7days);
    console.log(last7days);
    return expense.date >= last7days && expense.date <= todayDate;
  });



  if(isError&&!isFetching){
    return <ErrorOverlay message={isError}/>
  }


  if(isFetching){
    return <LoadingOverlay />
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensePeriod={'Last 7 days'}
      fallBackText={'No expense registered for the last 7 days'}
    />
  );
};

export default RecentExpenses;
