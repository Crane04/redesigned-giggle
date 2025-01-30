import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Text from "./Text";
import DateTimePicker from "@react-native-community/datetimepicker";

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  type,
}) => {
  const [open, setOpen] = useState(false);
  if (type === "date") {
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text onPress={() => setOpen(true)} style={styles.dateText}>
          {value.toISOString().split("T")[0]}
        </Text>
        <DateTimePicker
          mode="date"
          display="default"
          value={value}
          onChange={(event, newDate) => {
            onChangeText(newDate);
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={type ? type : "default"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderColor: "rgb(79 70 229)",
    borderWidth: 1,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
    padding: 10,
    borderColor: "rgb(79 70 229)",
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Input;
