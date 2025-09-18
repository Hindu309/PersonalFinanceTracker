import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { saveExpense, updateExpense } from "../storage/expenseStorage";
import { getCategories } from "../storage/categoryStorage";

export default function AddExpenseScreen({ route, navigation }) {
  const expense = route.params?.expense; // undefined if adding new

  // Form state
  const [amount, setAmount] = useState(expense ? String(expense.amount) : "");
  const [category, setCategory] = useState(expense ? expense.category : "");
  const [note, setNote] = useState(expense ? expense.note : "");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
    if (!expense && data.length > 0) {
      setCategory(data[0]); // pick first category for new expenses
    }
  }

  async function handleSave() {
    if (!amount || !category) return;

    const newExpense = {
      id: expense ? expense.id : Date.now().toString(),
      amount: parseFloat(amount),
      category,
      note,
      date: expense ? expense.date : new Date().toISOString(),
    };

    if (expense) {
      await updateExpense(newExpense);
    } else {
      await saveExpense(newExpense);
    }

    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Amount</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />

      <Text>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
        style={{ borderWidth: 1, marginBottom: 12 }}
      >
        {categories.map((cat, idx) => (
          <Picker.Item key={idx} label={cat} value={cat} />
        ))}
      </Picker>

      <Text>Note</Text>
      <TextInput
        value={note}
        onChangeText={setNote}
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />

      <Button
        title={expense ? "Update Expense" : "Add Expense"}
        onPress={handleSave}
      />
    </View>
  );
}
