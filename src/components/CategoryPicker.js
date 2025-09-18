import React from "react";
import { Picker } from "@react-native-picker/picker";

export default function CategoryPicker({ categories, selected, onChange }) {
  return (
    <Picker selectedValue={selected} style={{ width:"80%", marginBottom:16, backgroundColor:"#fff" }} onValueChange={onChange}>
      {categories.map(cat => <Picker.Item key={cat} label={cat} value={cat} />)}
    </Picker>
  );
}
