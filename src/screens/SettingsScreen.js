import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button, Alert } from "react-native";
import {
  getCategories,
  addCategory,
  resetCategories,
} from "../storage/categoryStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  async function handleAddCategory() {
    if (!newCategory.trim()) return;
    const updated = await addCategory(newCategory.trim());
    setCategories(updated);
    setNewCategory("");
  }

  async function handleResetCategories() {
    Alert.alert("Confirm", "Reset to default categories?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          const updated = await resetCategories();
          setCategories(updated);
        },
      },
    ]);
  }

  async function handleClearAllData() {
    Alert.alert("Confirm", "Clear all data (expenses + categories)?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.clear();
          setCategories([]);
        },
      },
    ]);
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
        Manage Categories
      </Text>

      {/* Add new category */}
      <TextInput
        placeholder="Enter new category"
        value={newCategory}
        onChangeText={setNewCategory}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <Button title="Add Category" onPress={handleAddCategory} />

      {/* Category list */}
      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ padding: 8, borderBottomWidth: 1 }}>{item}</Text>
        )}
      />

      {/* Reset + Clear */}
      <View style={{ marginTop: 16 }}>
        <Button title="Reset Categories" onPress={handleResetCategories} />
        <View style={{ marginVertical: 8 }} />
        <Button
          title="Clear All Data"
          color="red"
          onPress={handleClearAllData}
        />
      </View>
    </View>
  );
}
