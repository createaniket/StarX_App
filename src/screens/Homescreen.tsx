import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useNavigation } from "@react-navigation/native";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;


export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Dashboard",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.profileIcon}
        >
          <Text style={{ fontSize: 18 }}>👤</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>

      {/* Welcome Text */}
      <Text style={styles.welcome}>Welcome 👋</Text>
      <Text style={styles.subtitle}>
        Manage your account easily
      </Text>

      {/* Cards */}
      <View style={styles.cardContainer}>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Scan")}
        >
          <Text style={styles.icon}>📷</Text>
          <Text style={styles.cardText}>Scan QR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Wallet")}
        >
          <Text style={styles.icon}>💰</Text>
          <Text style={styles.cardText}>Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("History")}
        >
          <Text style={styles.icon}>📜</Text>
          <Text style={styles.cardText}>History</Text>
        </TouchableOpacity>

  

      </View>


      {/* Bottom Logo */}
<View style={styles.logoContainer}>
  <Image
    source={require("../assets/starxlogoColor.png")}
    style={styles.logo}
    resizeMode="contain"
  />
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 20,

  },

  welcome: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 20,
    color: "#222",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },

  cardContainer: {
    gap: 20,
  },

  card: {
    backgroundColor: "#4A90E2",
    height: 80,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,

    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  icon: {
    fontSize: 28,
    marginRight: 15,
  },

  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },

  profileIcon: {
    marginRight: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },

  logoContainer: {
    position: "absolute",
    bottom: 150,          // Distance from bottom
    left: 0,
    right: 0,

    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: "100%",        // 90vw equivalent
    height: 150,          // Adjust if needed
  },

});
