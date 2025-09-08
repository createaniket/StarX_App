import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { useWalletStore } from '../store/useWalletStore';

export default function WalletScreen() {
const userId = useAuthStore((s) => s.userId);
const { balance, loading, fetchWallet } = useWalletStore();

useEffect(() => { fetchWallet(userId); }, [userId]);

return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
{loading ? <ActivityIndicator /> : (
<Text style={{ fontSize: 28, fontWeight: '700' }}>Balance: {balance}</Text>
)}
</View>
);
}
