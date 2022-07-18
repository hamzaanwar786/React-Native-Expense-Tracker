import axios from 'axios';

export function storeExpense(expenseData) {
  axios.post(
    'https://react-native-expense-tra-61323-default-rtdb.firebaseio.com/expenses.json',
    expenseData,
  );
}
