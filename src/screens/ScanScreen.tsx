import React, { useState } from 'react';
import { View, Text, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRScanner from '../components/QRScanner';
import { useAuthStore } from '../store/useAuthStore';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useWalletStore } from '../store/useWalletStore';

import {redeem} from '../api/endpoint'

export default function ScanScreen() {
  const navigation = useNavigation();
  const userId = useAuthStore((s) => s.userId);
//   const redeemCode = useWalletStore((s) => s.redeemCode);

  const [scanning, setScanning] = useState(true);

const handleScan = async (code: string) => {
  if (!scanning) return; // debounce
  setScanning(false);

  try {
    const payload = {
      userId,   // include userId
      code: code
    };

    const result = await redeem(payload);

    // result should have { success, amount, newBalance }
    Alert.alert(
      'Redeemed',
      `+${result.amount} credited.\nNew balance: ${result.newBalance}`
    );
  } catch (e: any) {
    console.log("the error here", e)
    Alert.alert('Redeem failed', e.message|| 'Please try again.');
  } finally {
    setScanning(true);
  }
};


  return (
    // <View style={{ flex: 1 }}>
    //   <QRScanner onScan={handleScan} />
    //   <View style={{ padding: 16 }}>
    //     <Button 
    //       title="Go to Wallet" 
    //       onPress={() => navigation.navigate('Wallet' as never)} 
    //     />

    //   </View>
    // </View>


    <View style={{ flex: 1 }}>
  <QRScanner onScan={handleScan} />
  <SafeAreaView edges={['bottom']} style={{ padding: 16 }}>
    <Button 
      title="Go to Wallet" 
      onPress={() => navigation.navigate('Wallet' as never)} 
    />
  </SafeAreaView>
</View>
  );
}
