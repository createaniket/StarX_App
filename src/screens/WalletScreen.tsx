import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from "react-native";

import { useAuthStore } from "../store/useAuthStore";
import { getWallet } from "../api/endpoint";

import { useNavigation } from "@react-navigation/native";

export default function WalletScreen() {
  const navigation = useNavigation<any>();

  const user = useAuthStore((s) => s.user);

  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch wallet
  const fetchWallet = useCallback(async () => {
    try {
      setError(null);

      const data = await getWallet();

      console.log("Wallet API Response:", data);

      setBalance(data?.balance ?? 0);
    } catch (err: any) {
      console.log("Wallet Error:", err);

      if (err?.response) {
        setError(`Server Error (${err.response.status})`);
      } else {
        setError("Network Error");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Pull to refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchWallet();
  };

  // Back
  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading Wallet...</Text>
      </View>
    );
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>

        <TouchableOpacity
          style={styles.retryBtn}
          onPress={fetchWallet}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ================= MAIN UI ================= */

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {/* ============ HEADER ============ */}

      <View style={styles.header}>
        {/* Back */}
        <TouchableOpacity
          style={styles.headerSide}
          onPress={handleBack}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>



        {/* Profile */}
        <TouchableOpacity
          style={styles.headerSide}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={{ fontSize: 20 }}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* ============ BALANCE CARD ============ */}

        {/* Title */}
        <Text style={styles.pageTitle}>My Wallet</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Available Balance</Text>

        <Text style={styles.amount}>₹ {balance}</Text>

        <Text style={styles.userText}>
          {user?.name ?? "User"}
        </Text>
      </View>

      {/* ============ ACTIONS ============ */}

      <View style={styles.actions}>
        {/* Redeem */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Scan")}
        >
          <Text style={styles.btnText}>Redeem</Text>
        </TouchableOpacity>

        {/* History */}
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => navigation.navigate("History")}
        >
          <Text style={styles.btnOutlineText}>
            History
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* ================== STYLES ================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#64748B",
  },

  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 20,
  },

  retryBtn: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
  },

  retryText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 2,
  },

  headerSide: {
    width: 40,
    alignItems: "center",
  },

  backText: {
    fontSize: 14,
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    paddingTop: 10,
    paddingHorizontal: 20,
  },

  /* CARD */

  card: {
    backgroundColor: "#4F46E5",
    margin: 20,
    borderRadius: 16,
    padding: 25,
    elevation: 5,
  },

  cardTitle: {
    color: "#E0E7FF",
    fontSize: 14,
  },

  amount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
    marginVertical: 10,
  },

  userText: {
    color: "#C7D2FE",
    fontSize: 14,
  },

  /* ACTIONS */

  actions: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
  },

  btn: {
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },

  btnOutline: {
    borderWidth: 1,
    borderColor: "#4F46E5",
    paddingVertical: 12,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },

  btnOutlineText: {
    color: "#4F46E5",
    fontWeight: "600",
  },
});
