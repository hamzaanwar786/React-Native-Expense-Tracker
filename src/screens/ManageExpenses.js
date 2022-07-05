import React, {useLayoutEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import {GlobalStyles} from '../constants/styles';

const ManageExpenses = ({route, navigation}) => {
  const expenseParams = route.params?.expenseId;
  const isEdited = !!expenseParams;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdited ? 'Edit expense' : 'Add expense',
    });
  }, [isEdited, navigation]);

  function deleteExpenseHandler() {}

  function cancelExpenseHandler() {}

  function confirmExpenseHandler() {}

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.buttonStyle}
          mode={'flat'}
          onPress={cancelExpenseHandler}>
          Cancel
        </Button>
        <Button style={styles.buttonStyle} onPress={confirmExpenseHandler}>
          {isEdited ? 'Update' : 'Add'}
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    minWidth: 120,
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
