import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from "react-native";







import { useAuthStore } from "../store/useAuthStore";
import { useNavigation } from "@react-navigation/native";

import {
  deleteUserAccount,
  logoutUser,
} from "../api/endpoint";

export default function UserProfileScreen() {
  const navigation = useNavigation();

  const user = useAuthStore((s) => s.user);
  const logoutLocal = useAuthStore((s) => s.logout);
  const token = useAuthStore((s) => s.token);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔙 Back
  const handleBack = () => {
    navigation.goBack();
  };

  // 🚪 Logout
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logoutUser(token);
          } catch (e) {
            console.log("Logout API Error:", e?.message);
          }

          await logoutLocal();

          navigation.replace("Login");
        },
      },
    ]);
  };

  // ❌ Delete Account
  const confirmDeleteAccount = async () => {
    try {
      setLoading(true);

      await deleteUserAccount(token);
      await logoutUser(token);
      await logoutLocal();

      Alert.alert("Success", "Account deleted successfully");

      navigation.replace("Login");
    } catch (err) {
      Alert.alert("Error", err?.message || "Failed to delete account");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* 🔝 HEADER */}
      <View style={styles.header}>

        {/* Left - Back (SVG) */}
        <TouchableOpacity
          style={styles.headerSide}
          onPress={handleBack}
        >
          <Text> Back</Text>


        </TouchableOpacity>


        {/* Center - Title */}
        <Text style={styles.headerTitle}>
          User Profile
        </Text>

        {/* Right - Empty */}
        <View style={styles.headerSide} />

      </View>

      {/* USER INFO */}
      <View style={styles.card}>

        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>
          {user?.name || "-"}
        </Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>
          {user?.email || "-"}
        </Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>
          {user?.phone || "-"}
        </Text>

      </View>

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>

      {/* DELETE */}
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => setShowDeleteModal(true)}
      >
        <Text style={styles.deleteText}>
          Delete Account
        </Text>
      </TouchableOpacity>

      {/* ⚠️ DELETE MODAL */}
      <Modal
        transparent
        visible={showDeleteModal}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>

          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>
              Delete Account?
            </Text>

            <Text style={styles.modalMsg}>
              This action is permanent. Your data will be deleted.
            </Text>

            <View style={styles.modalBtns}>

              {/* Cancel */}
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setShowDeleteModal(false)}
                disabled={loading}
              >
                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </Pressable>

              {/* Delete */}
              <Pressable
                style={styles.confirmBtn}
                onPress={confirmDeleteAccount}
                disabled={loading}
              >
                <Text style={styles.confirmText}>
                  {loading ? "Deleting..." : "Delete"}
                </Text>
              </Pressable>

            </View>

          </View>

        </View>
      </Modal>

    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginBottom: 20,
  },

  headerSide: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },

  /* CARD */

  card: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fafafa",
  },

  label: {
    fontSize: 13,
    color: "#666",
    marginTop: 10,
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 3,
  },

  /* BUTTONS */

  logoutBtn: {
    marginTop: 25,
    backgroundColor: "#e53935",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "700",
  },

  deleteBtn: {
    marginTop: 15,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e53935",
  },

  deleteText: {
    color: "#e53935",
    fontWeight: "700",
  },

  /* MODAL */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  modalMsg: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
  },

  modalBtns: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },

  cancelBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginRight: 10,
  },

  cancelText: {
    color: "#fff",
    fontWeight: "600",
  },

  confirmBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e53935",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  confirmText: {
    color: "#e53935",
    fontWeight: "600",
  },

});
