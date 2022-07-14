import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {GlobalStyles} from '../../constants/styles';
import {dateFormatted} from '../../utils/date';
import Button from '../UI/Button';
import Input from './Input';

function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues}) {
  const [inputs, setInputs] = useState({
    amount: {
      values: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      values: defaultValues ? dateFormatted(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      values: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });
  function inputChangeHandler(inputIdentifire, enteredValue) {
    setInputs(currentinputs => {
      return {
        ...currentinputs,
        [inputIdentifire]: {values: enteredValue, isValid: true},
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.values,
      date: new Date(inputs.date.values),
      description: inputs.description.values,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //   Alert.alert('Invalid Input', 'Please check your input values');
      setInputs(currentinputs => {
        return {
          amount: {
            values: currentinputs.amount.values,
            isValid: amountIsValid,
          },
          date: {
            values: currentinputs.date.values,
            isValid: dateIsValid,
          },
          description: {
            values: currentinputs.description.values,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formisValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.formRow}>
        <Input
          style={styles.row}
          label={'Amount'}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.values,
          }}
        />
        <Input
          style={styles.row}
          label={'Date'}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.values,
          }}
        />
      </View>
      <Input
        label={'Description'}
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputs.description.values,
        }}
      />
      {formisValid && (
        <Text style={styles.errorText}>Please check your input values</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button style={styles.buttonStyle} mode={'flat'} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.buttonStyle} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    minWidth: 120,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});

export default ExpenseForm;
