import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { useWalletStore } from '../store/useWalletStore';

export default function HistoryScreen() {
const userId = useAuthStore((s) => s.userId);
const { history, fetchHistory } = useWalletStore();
const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);

const load = useCallback(async () => {
try {
await fetchHistory(userId);
} finally {
setLoading(false);
setRefreshing(false);
}
}, [userId, fetchHistory]);

useEffect(() => { load(); }, [load]);

const onRefresh = () => {
setRefreshing(true);
load();
};

if (loading) {
return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<ActivityIndicator />
<Text style={{ marginTop: 8 }}>Loading history…</Text>
</View>
);
}

return (
<FlatList
data={history}
contentContainerStyle={{ flexGrow: 1 }}
refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
ListEmptyComponent={(
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
<Text style={{ fontSize: 16 }}>No transactions yet.</Text>
<Text style={{ opacity: 0.6, marginTop: 4 }}>Scan a QR to get started.</Text>
</View>
)}
keyExtractor={(item, idx) => item._id ?? String(idx)}
renderItem={({ item }) => (
<View style={{ padding: 12, borderBottomWidth: 0.5, borderColor: '#ddd' }}>
<Text style={{ fontWeight: '600' }}>+{item.amount}</Text>
<Text>Status: {item.status}</Text>
<Text>Date: {new Date(item.createdAt).toLocaleString()}</Text>
</View>
)}
/>
);
}

