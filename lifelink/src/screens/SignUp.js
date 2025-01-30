import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import Text from "../components/Text";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import { styles } from "./SignIn";
import postRequest from "../api/postRequest";

const SignInScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (
      !username ||
      !password ||
      !fullName ||
      !phoneNumber ||
      !dateOfBirth ||
      !address ||
      !gender
    ) {
      let errorMessage = "The following fields are required:\n";

      if (!username) errorMessage += "- Username\n";
      if (!password) errorMessage += "- Password\n";
      if (!fullName) errorMessage += "- Full Name\n";
      if (!phoneNumber) errorMessage += "- Phone Number\n";
      if (!dateOfBirth) errorMessage += "- Date of Birth\n";
      if (!address) errorMessage += "- Address\n";
      if (!gender) errorMessage += "- Gender\n";

      alert(errorMessage);
      return;
    }

    if (password !== cPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsLoading(true);

    try {
      const response = await postRequest("/patients/create", {
        username,
        password,
        fullName,
        phoneNumber,
        dateOfBirth,
        address,
        gender,
      });

      if (response.status === 201) {
        // Login successful, navigate to the next screen
        alert(response?.data?.message);
        navigation.navigate("SignIn");
      } else {
        // Login failed, display an error message
        alert(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      alert(error?.data?.message || "An error occured");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Join Lifelink</Text>
          <Input
            label={"Fullname"}
            placeholder="John Doe"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          <Input
            label={"Username"}
            placeholder="johndoe"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />

          <Input
            label={"Phone Number"}
            placeholder="+234 123 4567 890"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            type={"number-pad"}
          />
          <Input
            label={"Address"}
            placeholder="16, Coker Compound"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <Input
            label={"Gender"}
            placeholder="Male, Female or Others"
            value={gender}
            onChangeText={(text) => setGender(text)}
          />
          <Input
            label={"Date Of Birth"}
            placeholder="16, Coker Compound"
            value={dateOfBirth}
            onChangeText={(date) => setDateOfBirth(date)}
            type={"date"}
          />
          <Input
            label={"Password"}
            placeholder="*******"
            value={password}
            onChangeText={(text) => setPassword(text)}
            // secureTextEntry
          />
          <Input
            label={"Confirm Password"}
            placeholder="*******"
            value={cPassword}
            onChangeText={(text) => setCPassword(text)}
            // secureTextEntry12
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="#7F38FF" />
          ) : (
            <Button text="Sign Up" onPress={handleSignUp} />
          )}
          <View style={styles.bottom}>
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.authText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default SignInScreen;
