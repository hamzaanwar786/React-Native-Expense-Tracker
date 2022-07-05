import React from 'react';
import {View, StyleSheet} from 'react-native';
import {GlobalStyles} from '../../constants/styles';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

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
    date: new Date('2021-11-19'),
  },
];

function ExpensesOutput({expenses, expensePeriod}) {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensePeriod} expenses={DUMMY_EXPENSES} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});

export default ExpensesOutput;
