import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import { getWallet } from '../api/endpoint';

export default function WalletScreen() {
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJlOTk2MDMzYWE5OTdlZjUxMzI0ZTQiLCJpYXQiOjE3NTczMjE1Njh9.4q8-kqGDXI4cyD6Y9izDILlToodpjJZtWctiw55X-S8';
  const BackendUrl = 'https://starx-backend.onrender.com';

  // Create axios instance with token + baseURL
  const api = axios.create({
    baseURL: BackendUrl,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  // Example: fetch history
  const getHistory = async () => {
    try {
      const { data } = await api.get(`/api/transaction/user`);
      console.log('History data:', data);
      return data; // [{...transaction}]
    } catch (err: any) {
      console.error('Error fetching history:', err);
      try {
        console.log('Full history error (stringified):', JSON.stringify(err, null, 2));
      } catch (stringifyErr) {
        console.log('Could not stringify error:', stringifyErr);
      }
    }
  };

  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchWallet = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getWallet(); // should return { balance, transactions }
      setBalance(data.balance ?? 0);

      // Optional: fetch history too
      await getHistory();
    } catch (err: any) {
      console.error('Error fetching wallet:', err);

      // Expanded error logging
      try {
        console.log('Full error (stringified):', JSON.stringify(err, null, 2));
      } catch (stringifyErr) {
        console.log('Could not stringify error:', stringifyErr);
      }

      if (err.response) {
        console.log('Response data:', err.response.data);
        console.log('Response status:', err.response.status);
        console.log('Response headers:', err.response.headers);
        setError(`Server error (${err.response.status})`);
      } else if (err.request) {
        console.log('Request object:', err.request);
        setError('No response from server. Please check your connection.');
      } else {
        console.log('Error message:', err.message);
        setError('Something went wrong. Please try again.');
      }

      console.log('Axios config:', err.config);
    } finally {
      setLoading(false);
    }
  }, []);

  console.log('Base URL in use:', BackendUrl);


  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: 'red', marginBottom: 10 }}>
            {error}
          </Text>
          <Button title="Retry" onPress={fetchWallet} />
        </View>
      ) : (
        <Text style={{ fontSize: 28, fontWeight: '700' }}>
          Balance: {balance}
        </Text>
      )}
    </View>
  );
}
