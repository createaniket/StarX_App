import React, { useEffect } from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
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
      <Button title="Scan QR Code" onPress={() => navigation.navigate("Scan")} />
      <Button title="Wallet" onPress={() => navigation.navigate("Wallet")} />
      <Button title="History" onPress={() => navigation.navigate("History")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 10,
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
});
