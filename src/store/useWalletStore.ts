import { create } from 'zustand';
import { getWallet, getHistory, redeem } from '../api/endpoints';

interface WalletState {
balance: number;
history: any[];
loading: boolean;
fetchWallet: (userId: string) => Promise<void>;
fetchHistory: (userId: string) => Promise<void>;
redeemCode: (userId: string, code: string) => Promise<{amount:number,newBalance:number}>;
}

export const useWalletStore = create<WalletState>((set, get) => ({
balance: 0,
history: [],
loading: false,
fetchWallet: async (userId) => {
set({ loading: true });
try {
const data = await getWallet(userId);
set({ balance: data.balance || 0, loading: false });
} catch (e) { set({ loading: false }); throw e; }
},
fetchHistory: async (userId) => {
const data = await getHistory(userId);
set({ history: data || [] });
},
redeemCode: async (userId, code) => {
const data = await redeem({ userId, code });
set({ balance: data.newBalance });
// Optimistically add to history; alternatively refetch
set({ history: [
{ _id: data.transactionId, amount: data.amount, status: 'success', createdAt: new Date().toISOString() },
...get().history,
]});
return { amount: data.amount, newBalance: data.newBalance };
}
}));
