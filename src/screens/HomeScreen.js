import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getExpenses, deleteExpense } from "../storage/expenseStorage";

export default function HomeScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState(null);
  const [sortBy, setSortBy] = useState("latest");

  useFocusEffect(
    React.useCallback(() => {
      loadExpenses();
    }, [])
  );

  async function loadExpenses() {
    const data = await getExpenses();
    setExpenses(data || []);
  }

  function getFilteredExpenses() {
    let data = [...expenses];

    if (search) {
      data = data.filter((e) =>
        e.note.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterCategory) {
      data = data.filter((e) => e.category === filterCategory);
    }

    if (sortBy === "latest") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "amount") {
      data.sort((a, b) => b.amount - a.amount);
    }

    return data;
  }

  return (
    <View style={styles.container}>
      {/* Add Expense Button */}
      <View style={styles.addButton}>
        <Button
          title="+ Add Expense"
          onPress={() => navigation.navigate("AddExpense")}
          color="#007AFF"
        />
      </View>

      {/* Search Bar */}
      <TextInput
        placeholder="Search by note..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        <Button title="Food" onPress={() => setFilterCategory("Food")} />
        <Button title="Transport" onPress={() => setFilterCategory("Transport")} />
        <Button title="Shopping" onPress={() => setFilterCategory("Shopping")} />
        <Button title="Clear Filter" onPress={() => setFilterCategory(null)} />
      </View>

      {/* Sort Buttons */}
      <View style={styles.filterRow}>
        <Button title="Sort: Latest" onPress={() => setSortBy("latest")} />
        <Button title="Sort: Amount" onPress={() => setSortBy("amount")} />
      </View>

      {/* Expense List */}
      <FlatList
        data={getFilteredExpenses()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("AddExpense", { expense: item })}
            onLongPress={() =>
              Alert.alert(
                "Delete Expense",
                "Are you sure you want to delete this expense?",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                      await deleteExpense(item.id);
                      loadExpenses();
                    },
                  },
                ]
              )
            }
          >
            <View style={styles.expenseItem}>
              <Text style={styles.expenseText}>
                {item.category} - ₹{item.amount}
              </Text>
              <Text>{item.note}</Text>
              <Text>{new Date(item.date).toDateString()}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    marginBottom: 12,
    alignSelf: "flex-end",
    width: 120,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  expenseItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  expenseText: {
    fontWeight: "bold",
  },
});
