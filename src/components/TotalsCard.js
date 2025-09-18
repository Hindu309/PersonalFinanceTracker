import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TotalsCard({ totals }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Today: ₹{totals.today.toFixed(2)}</Text>
      <Text style={styles.text}>This Week: ₹{totals.week.toFixed(2)}</Text>
      <Text style={styles.text}>This Month: ₹{totals.month.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card:{ padding:12, backgroundColor:"#fff", borderRadius:8, marginBottom:12, alignItems:"center" },
  text:{ fontSize:16, fontWeight:"600" },
});
