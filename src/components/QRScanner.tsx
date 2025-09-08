import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';

interface Props { onScan: (code: string) => void }

export default function QRScanner({ onScan }: Props) {
return (
<View style={styles.container}>
<CameraScreen
scanBarcode
onReadCode={(event: any) => {
const value = event?.nativeEvent?.codeStringValue;
if (value) onScan(value);
}}
showFrame
laserColor="red"
frameColor="white"
hideControls
/>
</View>
);
}

const styles = StyleSheet.create({
container: { flex: 1 }
});
