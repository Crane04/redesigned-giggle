import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import Container from "../components/Container";
import getRequest from "../api/getRequest";
import { useAuth } from "../contexts/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import { putRequest } from "../api/postRequest";
import * as ImagePicker from "expo-image-picker";
import ExpoFastImage from "expo-fast-image";
import { BACKEND_URL } from "../utilities/constants";

const ProfileScreen = () => {
  const { jwt } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const openEditModal = (field, value) => {
    setEditingField(field);
    setEditingValue(value);
    setModalVisible(true);
  };
  const getUser = async () => {
    if (!jwt) return;

    try {
      const response = await getRequest("/patients/get-user", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (response.user) {
        setUser(response.user);
      }
      console.log(response);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // const field = editingField;
    const response = await putRequest(
      "/patients/update-user-by-user",
      {
        [editingField]: editingValue,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    console.log(response);
    await getUser();
    // setUser({ ...user, [editingField]: editingValue });
    setModalVisible(false);
  };

  const handleEditImage = async () => {
    // Request permission to access the image library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to the photo library."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const formData = new FormData();
      formData.append("image", {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      });

      try {
        const response = await fetch(`${BACKEND_URL}/patients/upload-image`, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
          body: formData,
        });

        const data = await response.json();
        if (data?.success) {
          Alert.alert("Image uploaded successfully!");
          // setProfileImage(result.data.image);
          await getUser();
        } else {
          Alert.alert("Error uploading image:", data.message);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        Alert.alert("Error uploading image:", error.message);
      }
    }
  };
  useEffect(() => {
    if (jwt) {
      // alert(jwt)
      getUser();
    }
  }, [jwt]);

  return (
    <Container bg={"#F3E5F5"}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <View style={styles.profileSection}>
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={handleEditImage}>
                  <ExpoFastImage
                    source={{ uri: user?.image }}
                    style={styles.image}
                  />
                  <View style={styles.editIconContainer}>
                    <MaterialCommunityIcons
                      name="pencil"
                      size={20}
                      color="#fff"
                    />
                  </View>
                </TouchableOpacity>
                <Text style={styles.username}>
                  @{user?.username?.toLowerCase().replace(" ", "_")}
                </Text>

                <Text style={styles.username}>
                  <Entypo name="location-pin" size={24} color="#6A1B9A" />
                  {user?.address}
                </Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoBox}>
                <TouchableOpacity
                  style={styles.editIcon}
                  onPress={() =>
                    openEditModal("fullName", user?.["fullName"] || "")
                  }
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={20}
                    color="#6A1B9A"
                  />
                </TouchableOpacity>
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color="#6A1B9A"
                />
                <Text style={styles.infoLabel}>Name:</Text>
                <Text style={styles.infoValue}>{user?.fullName}</Text>
              </View>
              <View style={styles.infoBox}>
                <Ionicons name="calendar" size={24} color="#6A1B9A" />
                <Text style={styles.infoLabel}>Date of Birth:</Text>
                <Text style={styles.infoValue}>
                  {user?.dateOfBirth
                    ? new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </Text>
              </View>
              <View style={styles.infoBox}>
                <TouchableOpacity
                  style={styles.editIcon}
                  onPress={() =>
                    openEditModal("genotype", user?.["genotype"] || "")
                  }
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={20}
                    color="#6A1B9A"
                  />
                </TouchableOpacity>
                <MaterialCommunityIcons name="dna" size={24} color="#6A1B9A" />
                <Text style={styles.infoLabel}>Genotype:</Text>
                <Text style={styles.infoValue}>
                  {user?.genotype ? user.genotype : "N/A"}
                </Text>
              </View>
              <View style={styles.infoBox}>
                <TouchableOpacity
                  style={styles.editIcon}
                  onPress={() =>
                    openEditModal("bloodGroup", user?.["bloodGroup"] || "")
                  }
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={20}
                    color="#6A1B9A"
                  />
                </TouchableOpacity>
                <Fontisto name="blood-test" size={24} color="#6A1B9A" />
                <Text style={styles.infoLabel}>Blood Group:</Text>
                <Text style={styles.infoValue}>
                  {user?.bloodGroup ? user?.bloodGroup : "N/A"}
                </Text>
              </View>
              <View style={styles.infoBox}>
                <TouchableOpacity
                  style={styles.editIcon}
                  onPress={() =>
                    openEditModal("disability", user?.["disability"] || "")
                  }
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={20}
                    color="#6A1B9A"
                  />
                </TouchableOpacity>
                <Fontisto
                  name="paralysis-disability"
                  size={24}
                  color="#6A1B9A"
                />
                <Text style={styles.infoLabel}>Disability:</Text>
                <Text style={styles.infoValue}>
                  {user?.disability == null ? "None" : user.disability}
                </Text>
              </View>
              <View style={styles.infoBox}>
                <TouchableOpacity
                  style={styles.editIcon}
                  onPress={() =>
                    openEditModal("phoneNumber", user?.["phoneNumber"] || "")
                  }
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={20}
                    color="#6A1B9A"
                  />
                </TouchableOpacity>
                <Entypo name="phone" size={24} color="#6A1B9A" />
                <Text style={styles.infoLabel}>Phone Number:</Text>
                <Text style={styles.infoValue}>
                  {user?.phoneNumber ? user?.phoneNumber : "N/A"}
                </Text>
              </View>
              <View style={styles.infoBox}>
                <Fontisto name="male" size={24} color="#6A1B9A" />
                <Text style={styles.infoLabel}>Gender:</Text>
                <Text style={styles.infoValue}>{user?.gender}</Text>
              </View>
            </View>
            <Modal visible={modalVisible} animationType="slide" transparent>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text>
                    Edit{" "}
                    {editingField
                      ?.replace(/([A-Z])/g, " $1")
                      .trim()
                      .toLowerCase()}
                    :
                  </Text>
                  <Input value={editingValue} onChangeText={setEditingValue} />
                  <Button
                    text="Save"
                    onPress={handleSave}
                    style={{ marginBottom: 5 }}
                  />
                  <Button
                    text="Cancel"
                    color="red"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              </View>
            </Modal>
          </>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E5F5",
    padding: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#6A1B9A",
    marginBottom: 10,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#6A1B9A",
    borderRadius: 15,
    padding: 5,
  },
  username: {
    fontSize: 18,
    color: "#6A1B9A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    fontFamily: "ShadowsIntoLight_400Regular",
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  infoBox: {
    width: Dimensions.get("window").width / 2 - 30,
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: "#6A1B9A",
    marginTop: 5,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    marginTop: 5,
  },
  editIcon: { position: "absolute", top: 10, right: 10, padding: 5 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    // alignItems: "center",
  },
});

export default ProfileScreen;
