import { StyleSheet, View, SafeAreaView, StatusBar } from "react-native";

const Container = ({ children, bg }) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg || "#ffffff" }]}>
      <StatusBar backgroundColor={bg}/>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Container;
