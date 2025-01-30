import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Text from "./Text";

const Button = ({
  onPress,
  text,
  width,
  color,
  textColor = "#fff",
  style,
  disabled,
}) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={[
          styles.btn,
          {
            // width: width ? "100%" : "90%",
          },
          style,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.btnText, { color: textColor }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#7F38FF",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    width: "100%"
  },
  btnText: {
    color: "#fff",
  },
});

export default Button;
