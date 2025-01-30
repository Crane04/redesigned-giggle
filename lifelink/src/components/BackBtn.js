import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Text from "./Text";
const BackBtn = ({ title }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.backBtn}
      onPress={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }}
    >
      <MaterialIcons name="keyboard-backspace" color={"#000"} size={24} />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    fontFamily: "OpenSans_600SemiBold",
  },
});

export default BackBtn;
