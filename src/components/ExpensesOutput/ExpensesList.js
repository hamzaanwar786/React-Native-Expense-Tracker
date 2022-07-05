import React from 'react';
import {FlatList, Text, View} from 'react-native';
import ExpenseItem from './ExpenseItem';

function renderExpenseItem({item, index}) {
  return <ExpenseItem {...item} />;
}

function ExpensesList({expenses}) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={item => item.id}
    />
  );
}

export default ExpensesList;
