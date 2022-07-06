import React, {createContext, useReducer} from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 68.78,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of shirts',
    amount: 97.6,
    date: new Date('2022-01-19'),
  },
  {
    id: 'e3',
    description: 'Dozen of eggs',
    amount: 23.58,
    date: new Date('2021-12-02'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 12.55,
    date: new Date('2022-02-12'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 12.45,
    date: new Date('2022-07-05'),
  },
];

export const ExpenseContext = createContext({
  expense: [],
  addExpense: ({description, date, amount}) => {},
  deleteExpense: id => {},
  updateExpense: (id, {description, date, amount}) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload, id: id}, ...state];
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
  const [expenseState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({
      type: 'ADD',
      payload: expenseData,
    });
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
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpenseContextProvider;
