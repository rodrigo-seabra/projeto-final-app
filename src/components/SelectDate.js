import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Button, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native";

export default function SelectDate({ date, onChange }) {
  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDateTimePicker = () => {
    showMode("date");
    setTimeout(() => showMode("time"), 200); // Show time picker after date picker
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={showDateTimePicker}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Selecione Data e Hora</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Selecionado: {date.toLocaleString()}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  button: {
    backgroundColor: "#696969",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: "white",
    marginTop: 20,
    fontSize: 16,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  text: {
    color: "white",
    marginTop: 20,
    fontSize: 16,
  },
});
