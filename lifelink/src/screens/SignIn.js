import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import Text from "../components/Text";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import postRequest from "../api/postRequest";
import { useAuth } from "../contexts/AuthContext";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSignIn = async () => {
    if (!username || !password) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await postRequest("/patients/signin", {
        username,
        password,
      });

      if (response.status === 200) {
        // Login successful, navigate to the next screen
        await login(response.data.token);
        navigation.navigate("Profile");
      } else {
        // Login failed, display an error message
        alert("invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Error logging in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>Log In to Your Account</Text>
          <Input
            label={"Username"}
            placeholder="Doe"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <Input
            label={"Password"}
            placeholder="*******"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="#7F38FF" />
          ) : (
            <Button text="Log In" onPress={handleSignIn} />
          )}
          <View style={styles.bottom}>
            <Text>Don’t have an account, yet?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.authText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    textAlign: "center",
    fontFamily: "OpenSans_700Bold",
    fontSize: 24,
    marginTop: 25,
    marginBottom: 20,
  },
  bottom: {
    left: 0,
    right: 0,
    flexDirection: "row",
    marginTop: 20,

    alignItems: "center",
    justifyContent: "center",
  },
  authText: {
    color: "#7F38FF",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignInScreen;
