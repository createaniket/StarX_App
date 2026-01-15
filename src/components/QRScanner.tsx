import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { Camera } from 'react-native-camera-kit';
import { redeem } from '../api/endpoint'; // your API function

const { width, height } = Dimensions.get('window');
const SCAN_SIZE = width * 0.85;

export default function QRScanner() {
  const [loading, setLoading] = useState(false);

  // Hardcoded userId for testing
  const userId = '68be996033aa997ef51324e4';

  const handleScan = async (qrCode: string) => {
    try {
      setLoading(true);

      const payload = { userId, code: qrCode };
      const result = await redeem(payload);
      console.log("the resulteeee", result)

      setLoading(false);

      if (result.success) {
        Alert.alert(
          'Success!',
          `You received ${result.transaction.amount}.`
        );
      } else {
        Alert.alert('Error', 'Failed to redeem QR code.');
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      Alert.alert('Error', error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        scanBarcode={true}
        onReadCode={(event: any) => {
          const value = event?.nativeEvent?.codeStringValue;
          if (value) handleScan(value);
        }}
        showFrame={true}
        laserColor="red"
        frameColor="white"
        offsetForScannerFrame={30}
        heightForScannerFrame={SCAN_SIZE}
      />

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      {/* Overlay outside scan area */}
      <View style={[styles.overlayTop, { height: (height - SCAN_SIZE) / 2 }]} />
      <View style={[styles.overlayBottom, { height: (height - SCAN_SIZE) / 2 }]} />
      <View style={[styles.overlayLeft, { width: (width - SCAN_SIZE) / 2 }]} />
      <View style={[styles.overlayRight, { width: (width - SCAN_SIZE) / 2 }]} />
    </View>
  );
}

const overlayColor = 'rgba(0,0,0,0.5)';

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1, width: '100%', height: '100%' },
  overlayTop: { position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: overlayColor },
  overlayBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: overlayColor },
  overlayLeft: { position: 'absolute', top: (height - SCAN_SIZE) / 2, bottom: (height - SCAN_SIZE) / 2, left: 0, backgroundColor: overlayColor },
  overlayRight: { position: 'absolute', top: (height - SCAN_SIZE) / 2, bottom: (height - SCAN_SIZE) / 2, right: 0, backgroundColor: overlayColor },
  loadingOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
