import React, {useContext, useLayoutEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import Button from '../components/UI/Button';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import {GlobalStyles} from '../constants/styles';
import {ExpenseContext} from '../store/expense-context';
import {deleteExpenses, storeExpense, updateExpenses} from '../utils/http';

const ManageExpenses = ({route, navigation}) => {
  const[isSubmitting,setisSubmitting] =useState(false);
  const[isError,setError] =useState();
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

  async function deleteExpenseHandler() {
    setisSubmitting(true)
    try {
      await deleteExpenses(expenseParamsId);
      expenseCtx.deleteExpense(expenseParamsId);
      navigation.goBack();
      
    } catch (error) {
      setError('Could not delete expense, please try again later!');
      setisSubmitting(false);
    }
  }

  function cancelExpenseHandler() {
    navigation.goBack();
  }

  async function confirmExpenseHandler(expenseData) {
    try {
      if (isEdited) {
        setisSubmitting(true);
        expenseCtx.updateExpense(expenseParamsId, expenseData);
        await updateExpenses(expenseParamsId, expenseData);
      } else {
        setisSubmitting(true);
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({...expenseData, id: id});
      }
      navigation.goBack();
      
    } catch (error) {
      setError('Could not update expense, please try again later!');
      setisSubmitting(false);
    }

  }



  if(isError && !isSubmitting){
    return <ErrorOverlay message={isError} />
  }

  if(isSubmitting){
    return <LoadingOverlay />
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
