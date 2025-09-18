import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ExpenseItem({ expense, onDelete }) {
  const navigation = useNavigation();

  const handleLongPress = () => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(expense.id),
        },
      ]
    );
  };

  const handlePress = () => {
    navigation.navigate("AddExpense", { expense }); // 👈 send expense data
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress} // 👈 tap to edit
      onLongPress={handleLongPress} // 👈 long press to delete
    >
      <View style={styles.row}>
        <Text style={styles.category}>{expense.category}</Text>
        <Text style={styles.amount}>₹{expense.amount}</Text>
      </View>
      {expense.note ? <Text style={styles.note}>{expense.note}</Text> : null}
      <Text style={styles.date}>
        {new Date(expense.date).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  category: {
    fontWeight: "bold",
    fontSize: 16,
  },
  amount: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2e86de",
  },
  note: {
    fontStyle: "italic",
    color: "gray",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
});
