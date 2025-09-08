
import { create } from 'zustand';

// Stub auth for now; integrate real auth later
interface AuthState {
userId: string; // Mongo _id string
setUserId: (id: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
userId: '64e9cf000000000000000001',
setUserId: (id) => set({ userId: id }),
}));
