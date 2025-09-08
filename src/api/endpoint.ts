import { api } from './client';

export type RedeemPayload = { userId: string; code: string };

export const getWallet = async (userId: string) => {
const { data } = await api.get(`/api/users/${userId}/wallet`);
return data; // {balance, transactions}
};

export const redeem = async (payload: RedeemPayload) => {
const { data } = await api.post('/api/redeem', payload);
return data; // { success, amount, newBalance }
};

export const getHistory = async (userId: string) => {
const { data } = await api.get(`/api/users/${userId}/history`);
return data; // [{...transaction}]
};
