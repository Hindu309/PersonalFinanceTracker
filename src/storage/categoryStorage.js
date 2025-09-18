import AsyncStorage from "@react-native-async-storage/async-storage";

const CATEGORY_KEY = "CATEGORIES";
const DEFAULT_CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Other"];

export async function getCategories() {
  try {
    const json = await AsyncStorage.getItem(CATEGORY_KEY);
    return json ? JSON.parse(json) : DEFAULT_CATEGORIES;
  } catch (e) {
    return DEFAULT_CATEGORIES;
  }
}

export async function saveCategories(categories) {
  try {
    await AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
  } catch (e) {
    console.error(e);
  }
}

// Add single category (if not duplicate)
export async function addCategory(newCategory) {
  const categories = await getCategories();
  if (!categories.includes(newCategory)) {
    categories.push(newCategory);
    await saveCategories(categories);
  }
  return categories;
}

// Reset categories to default
export async function resetCategories() {
  await saveCategories(DEFAULT_CATEGORIES);
  return DEFAULT_CATEGORIES;
}
