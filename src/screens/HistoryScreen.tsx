import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useAuthStore } from "../store/useAuthStore";
import { getHistory } from "../api/endpoint";

export default function HistoryScreen() {
  const navigation = useNavigation<any>();

  const user = useAuthStore((s) => s.user);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  /* ================= FETCH ================= */

  const load = useCallback(async () => {
    try {
      const res = await getHistory();

      console.log("History API:", res);

      setHistory(res?.transactions || res || []);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading History...</Text>
      </View>
    );
  }

  /* ================= RENDER ITEM ================= */

  const renderItem = ({ item }: any) => {
    const isCredit = item.amount > 0;

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.typeText}>
            {isCredit ? "Credit" : "Debit"}
          </Text>

          <Text
            style={[
              styles.amount,
              { color: isCredit ? "#16A34A" : "#DC2626" },
            ]}
          >
            {isCredit ? "+" : "-"}₹{Math.abs(item.amount)}
          </Text>
        </View>

        <Text style={styles.status}>
          Status: {item.status ?? "Success"}
        </Text>

        <Text style={styles.date}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>
    );
  };

  /* ================= MAIN UI ================= */

  return (
    <View style={styles.container}>
      {/* ============ HEADER ============ */}

      <View style={styles.header}>
        {/* Back */}
        <TouchableOpacity
          style={styles.headerSide}
          onPress={() => navigation.goBack()}
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

      {/* ============ LIST ============ */}

        {/* Title */}
        <Text style={styles.pageTitle}>
          Transaction History
        </Text>

      <FlatList
        data={history}
        keyExtractor={(item, idx) =>
          item._id?.toString() || String(idx)
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              No transactions yet
            </Text>
            <Text style={styles.emptySub}>
              Start by scanning a QR code
            </Text>
          </View>
        }
        renderItem={renderItem}
      />
    </View>
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
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  typeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },

  amount: {
    fontSize: 16,
    fontWeight: "700",
  },

  status: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748B",
  },

  date: {
    marginTop: 2,
    fontSize: 12,
    color: "#94A3B8",
  },

  /* EMPTY */

  emptyBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: "600",
  },

  emptySub: {
    marginTop: 4,
    color: "#64748B",
  },
});
