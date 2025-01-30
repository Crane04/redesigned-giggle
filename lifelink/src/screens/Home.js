import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Container from "../components/Container";
import HomeHeader from "../components/HomeHeader";
import GroupsSection from "../components/GroupsSection";
import GroupCard from "../components/GroupCard";
import NextDue from "../components/NextDue";
import ActionButtons from "../components/ActionsButtons";
import GroupMembers from "../components/GroupMembers";
import Services from "../components/Services";

const Home = () => {
  return (
    <Container bg="#F7F6FF">
      <ScrollView style={styles.container}>
        <HomeHeader />
        <GroupsSection />
        <GroupCard />
        <NextDue />
        <ActionButtons />
        <GroupMembers />
        <Services />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

export default Home;
