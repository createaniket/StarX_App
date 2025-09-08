import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanScreen from '../screens/ScanScreen';
import WalletScreen from '../screens/WalletScreen';
import HistoryScreen from '../screens/HistoryScreen';

export type RootStackParamList = {
Scan: undefined;
Wallet: undefined;
History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
return (
<Stack.Navigator>
<Stack.Screen name="Scan" component={ScanScreen} />
<Stack.Screen name="Wallet" component={WalletScreen} />
<Stack.Screen name="History" component={HistoryScreen} />
</Stack.Navigator>
);
}
