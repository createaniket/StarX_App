import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigation } from "@react-navigation/native";

export default function UserProfileScreen() {
  const navigation = useNavigation<any>();

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          navigation.replace("Login"); // ✅ back to login
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name || "-"}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email || "-"}</Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user?.phone || "-"}</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 15 },

  card: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fafafa",
  },

  label: { fontSize: 13, color: "#666", marginTop: 10 },
  value: { fontSize: 16, fontWeight: "600", marginTop: 3 },

  logoutBtn: {
    marginTop: 25,
    backgroundColor: "#e53935",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "700" },
});
