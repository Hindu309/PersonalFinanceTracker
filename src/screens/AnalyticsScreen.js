import React, { useEffect, useState, useMemo } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { getExpenses } from "../storage/expenseStorage";
import { parseISO, isSameMonth, isThisWeek, format } from "date-fns";
import { PieChart, BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function AnalyticsScreen() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    const data = await getExpenses();
    setExpenses(data || []);
    setLoading(false);
  }

  // Monthly category data for Pie Chart
  const monthlyCategoryData = useMemo(() => {
    const today = new Date();
    const monthlyExpenses = expenses.filter((e) => {
      const date = parseISO(e.date);
      return isSameMonth(date, today);
    });

    if (monthlyExpenses.length === 0) return [];

    const totals = {};

    monthlyExpenses.forEach((e) => {
      if (!totals[e.category]) {
        totals[e.category] = 0;
      }
      totals[e.category] += Number(e.amount);
    });

    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#FF6384",
      "#36A2EB",
    ];

    return Object.keys(totals).map((category, index) => ({
      name: category,
      amount: totals[category],
      color: colors[index % colors.length],
      legendFontColor: "#333",
      legendFontSize: 14,
    }));
  }, [expenses]);

  // Weekly daily spending data for Bar Chart
  const weeklyBarData = useMemo(() => {
    const weekExpenses = expenses.filter((e) =>
      isThisWeek(parseISO(e.date), { weekStartsOn: 1 }) // Monday start
    );

    if (weekExpenses.length === 0) {
      return {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }],
      };
    }

    const dailyTotals = {};

    weekExpenses.forEach((e) => {
      const day = format(parseISO(e.date), "EEE"); // Mon, Tue, ...
      if (!dailyTotals[day]) {
        dailyTotals[day] = 0;
      }
      dailyTotals[day] += Number(e.amount);
    });

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const data = days.map((day) => dailyTotals[day] || 0);

    return {
      labels: days,
      datasets: [{ data }],
    };
  }, [expenses]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading expenses...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📊 Monthly Category Breakdown</Text>
      {monthlyCategoryData.length > 0 ? (
        <PieChart
          data={monthlyCategoryData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="10"
          absolute
        />
      ) : (
        <Text style={styles.emptyText}>No expenses recorded for this month.</Text>
      )}

      <Text style={[styles.title, { marginTop: 32 }]}>📅 Daily Spending This Week</Text>
      {weeklyBarData.datasets[0].data.some((val) => val > 0) ? (
        <BarChart
          data={weeklyBarData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          fromZero
          showValuesOnTopOfBars
          style={{ borderRadius: 8 }}
        />
      ) : (
        <Text style={styles.emptyText}>No expenses recorded for this week.</Text>
      )}
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#f5f5f5",
  backgroundGradientTo: "#f5f5f5",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 8,
  },
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#007AFF",
  },
};

const styles = {
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  emptyText: {
    fontStyle: "italic",
    color: "#666",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};
