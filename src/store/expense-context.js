import React, {createContext, useReducer} from 'react';

export const ExpenseContext = createContext({
  expense: [],
  addExpense: ({description, date, amount}) => {},
  setExpense: expenses => {},
  deleteExpense: id => {},
  updateExpense: (id, {description, date, amount}) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':
     
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updateExpenseIndex = state.findIndex(
        expense => expense.id === action.payload.id,
      );
      const updateableExpense = state[updateExpenseIndex];
      const updateItem = {...updateableExpense, ...action.payload.data};
      const updatedExpense = [...state];
      updatedExpense[updateExpenseIndex] = updateItem;
      return updatedExpense;
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpenseContextProvider({children}) {
  const [expenseState, dispatch] = useReducer(expenseReducer, []);

  function addExpense(expenseData) {
    dispatch({
      type: 'ADD',
      payload: expenseData,
    });
  }

  function setExpense(expenses){
    dispatch({
      type:'SET',
      payload:expenses
    })
  }

  function deleteExpense(id) {
    dispatch({
      type: 'DELETE',
      payload: id,
    });
  }

  function updateExpense(id, expenseData) {
    dispatch({
      type: 'UPDATE',
      payload: {
        id: id,
        data: expenseData,
      },
    });
  }

  const value = {
    expense: expenseState,
    setExpense:setExpense,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpenseContextProvider;
