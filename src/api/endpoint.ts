import { api } from './client';

export type RedeemPayload = { userId: string; code: string };

export const getWallet = async () => {
    const { data } = await api.get(`/api/wallet/`);
    return data; // {balance, transactions}
};

export const redeem = async (payload: RedeemPayload) => {

    const result = await api.post('/api/qrcode/redeem', payload);

    return result.data; // { success, amount, newBalance }
};

export const getHistory = async () => {

    try {

        const { data } = await api.get(`/api/transaction/user`);
        console.log("the main data", data)
        return data; // [{...transaction}]
    } catch (e) {

        console.log("the error", e.message)
    }


};


// FOR USER LOGIN
export const loginUser = async (email: string, password: string) => {
    console.warn("Login API Called");
  try {
    const { data } = await api.post(`/api/user/login`, { email, password });
    console.log("Login API Response:", data);
    return data;
  } catch (error: any) {
    console.log("Login API Error:", error?.response?.data || error?.message);

    throw new Error(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Login failed. Please try again."
    );
  }
};
