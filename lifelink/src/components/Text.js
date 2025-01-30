import { Text, StyleSheet } from "react-native";

const WText = ({ children, style }) => {
  return <Text style={[styles.text, style]}> {children}</Text>;
};
const styles = StyleSheet.create({
  text: {
    fontFamily: "OpenSans_400Regular",
    color: "#0B0515",
    fontSize: 16
  },
});
export default WText;
