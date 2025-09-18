# PersonalFinanceTracker

A simple and modern **React Native** app to track personal expenses.  
Allows users to add, view, filter, and summarize expenses with data persistence using AsyncStorage.

---

## Features

- **Add Expenses:**  
  Input amount, select category (predefined or user-added), and optional notes.  
- **Expense List:**  
  View expenses grouped by date.  
- **Summary:**  
  Totals for Today, This Week, and This Month.  
- **Categories:**  
  Predefined categories: Food, Transport, Shopping, Bills, Other.  
  Ability to add new custom categories.  
- **Filtering & Sorting:**  
  Filter expenses by category, sort by latest or highest amount.  
- **Search:**  
  Search expenses by notes.  
- **Settings:**  
  Manage categories and clear all data with confirmation.  
- **Persistence:**  
  All data saved locally using AsyncStorage for offline use.

---

## Screens

1. **Home / Overview** — Displays expense list and summary.  
2. **Add Expense** — Form to add new expenses.  
3. **Settings / Manage Categories** — Add/delete categories and clear data.

---

## Tech Stack

- React Native  
- React Navigation (Bottom Tabs)  
- AsyncStorage (for data persistence)  
- JavaScript / JSX

---

## Getting Started

### Prerequisites

- Node.js  
- React Native CLI or Expo CLI  
- Android Studio / Xcode for emulators (or physical devices)

### Installation

1. Clone the repo:

```bash
git clone https://github.com/Hindu309/PersonalFinanceTracker.git
cd PersonalFinanceTracker
2.Install dependencies:

npm install


3.Run the Metro bundler:

npx react-native start


4.Run the app:

On Android:

npx react-native run-android


On iOS (Mac only):

npx react-native run-ios

Folder Structure
PersonalFinanceTracker/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # App screens (Home, AddExpense, Settings)
│   ├── storage/         # AsyncStorage helpers
│   ├── utils/           # Utility functions (date formatting, filtering)
│   ├── assets/          # Icons, images
│   └── App.js           # Entry point
├── .gitignore
├── package.json
└── README.md
 ## Demo Video

You can watch the demo video of the Personal Finance Tracker app here:  
[Watch Demo Video](https://drive.google.com/file/d/17hbgbfM37LoIOfBBbd0HfDs9VjjgJxvh/view?usp=drivesdk)

## Future Improvements

- Export expense data (CSV, JSON)  
- Cloud sync & user authentication  
- More detailed reports and budgeting features
