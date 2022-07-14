import React, {useContext, useLayoutEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import {GlobalStyles} from '../constants/styles';
import {ExpenseContext} from '../store/expense-context';

const ManageExpenses = ({route, navigation}) => {
  const expenseCtx = useContext(ExpenseContext);
  const expenseParamsId = route.params?.expenseId;
  const isEdited = !!expenseParamsId;

  const selectedExpense = expenseCtx.expense.find(
    expense => expense.id === expenseParamsId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdited ? 'Edit expense' : 'Add expense',
    });
  }, [isEdited, navigation]);

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(expenseParamsId);
    navigation.goBack();
  }

  function cancelExpenseHandler() {
    navigation.goBack();
  }

  function confirmExpenseHandler(expenseData) {
    if (isEdited) {
      expenseCtx.updateExpense(expenseParamsId, expenseData);
    } else {
      console.log(expenseData);
      expenseCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelExpenseHandler}
        submitButtonLabel={isEdited ? 'Update' : 'Add'}
        onSubmit={confirmExpenseHandler}
        defaultValues={selectedExpense}
      />

      {isEdited && (
        <View style={styles.deleteContainer}>
          <IconButton
            name={'trash-outline'}
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,

    padding: 24,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});

export default ManageExpenses;
