import AsyncStorage from "@react-native-async-storage/async-storage";

const EXPENSE_KEY = "EXPENSES";

export async function getExpenses() {
  const json = await AsyncStorage.getItem(EXPENSE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveExpense(expense) {
  const expenses = await getExpenses();
  expenses.push(expense);
  await AsyncStorage.setItem(EXPENSE_KEY, JSON.stringify(expenses));
}

export async function deleteExpense(id) {
  const expenses = await getExpenses();
  const filtered = expenses.filter((e) => e.id !== id);
  await AsyncStorage.setItem(EXPENSE_KEY, JSON.stringify(filtered));
}

export async function updateExpense(updatedExpense) {
  const expenses = await getExpenses();
  const newExpenses = expenses.map((e) =>
    e.id === updatedExpense.id ? updatedExpense : e
  );
  await AsyncStorage.setItem(EXPENSE_KEY, JSON.stringify(newExpenses));
}
