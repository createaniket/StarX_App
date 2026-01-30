import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,

} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import QRScanner from '../components/QRScanner';
import { useAuthStore } from '../store/useAuthStore';
import { redeem } from '../api/endpoint';



export default function ScanScreen() {
  const navigation = useNavigation();
  const userId = useAuthStore((s) => s.userId);

  const [scanning, setScanning] = useState(true);

  const handleScan = async (code) => {
    if (!scanning) return;
    setScanning(false);

    try {
      const payload = {
        userId,
        code,
      };

      const result = await redeem(payload);

      Alert.alert(
        'Success 🎉',
        `₹${result.amount} credited\nNew Balance: ₹${result.newBalance}`
      );
    } catch (e) {
      Alert.alert('Failed ❌', e.message || 'Try again');
    } finally {
      setScanning(true);
    }
  };


  // 🔙 Back
  const handleBack = () => {
    navigation.goBack();
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



        {/* Right - Empty */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.profileIcon}
        >
          <Text style={{ fontSize: 18 }}>👤</Text>
        </TouchableOpacity>

      </View>


      {/* Scanner */}
      <QRScanner onScan={handleScan} />

      {/* Overlay UI */}
      <View style={styles.overlay}>

        {/* Top Text */}
        <SafeAreaView>
          <Text style={styles.title}>Scan QR Code</Text>
          <Text style={styles.subtitle}>
            Align QR inside the frame
          </Text>
        </SafeAreaView>

        {/* Scan Box */}
        <View style={styles.scanBox} />

        {/* Bottom Button */}
        <SafeAreaView edges={['bottom']}>

          <TouchableOpacity
            style={styles.walletBtn}
            onPress={() => navigation.navigate('Wallet')}
          >
            <Text style={styles.walletText}>
              Go To Wallet 💳
            </Text>
          </TouchableOpacity>

        </SafeAreaView>

      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },

  subtitle: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },

  scanBox: {
    width: 260,
    height: 260,
    borderRadius: 16,

    borderWidth: 2,
    borderColor: '#00FF99',

    backgroundColor: 'rgba(0,255,153,0.05)',
  },

  walletBtn: {
    backgroundColor: '#2979FF',

    width: '90%',
    paddingVertical: 15,

    borderRadius: 12,

    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,

    marginBottom: 10,
  },

  walletText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
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

  /* HEADER */

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },

  headerSide: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },


});
