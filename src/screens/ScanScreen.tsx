import React, { useState } from 'react';
import { View, Text, Alert, Button } from 'react-native';
import QRScanner from '../components/QRScanner';
import { useAuthStore } from '../store/useAuthStore';
import { useWalletStore } from '../store/useWalletStore';

export default function ScanScreen() {
const userId = useAuthStore((s) => s.userId);
const redeemCode = useWalletStore((s) => s.redeemCode);
const [scanning, setScanning] = useState(true);

const handleScan = async (code: string) => {
if (!scanning) return; // debounce
setScanning(false);
try {
const { amount, newBalance } = await redeemCode(userId, code);
Alert.alert('Redeemed', `+${amount} credited. New balance: ${newBalance}`);
} catch (e: any) {
Alert.alert('Redeem failed', e.message || 'Please try again.');
} finally {
setScanning(true);
}
};

return (
<View style={{ flex: 1 }}>
<QRScanner onScan={handleScan} />
<View style={{ padding: 16 }}>
<Button title="Go to Wallet" onPress={() => { /* use navigation if desired */ }} />
</View>
</View>
);
}

