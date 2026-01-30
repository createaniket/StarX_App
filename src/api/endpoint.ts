import { api } from './client';

export type RedeemPayload = { userId: string; code: string };

// export const getWallet = async () => {
//     const { data } = await api.get(`/api/wallet/`);
//     return data; // {balance, transactions}
// };


// export const getWallet = async () => {
//     const { data } = await api.get(`/api/transaction/user`);
//     return data; // {balance, transactions}
// };

// export const redeem = async (payload: RedeemPayload) => {

//     const result = await api.post('/api/qrcode/redeem', payload);

//     return result.data; // { success, amount, newBalance }
// };

// export const getHistory = async () => {

//     try {

//         const { data } = await api.get(`/api/transaction/user`);
//         console.log("the main data", data)
//         return data; // [{...transaction}]
//     } catch (e) {

//         console.log("the error", e.message)
//     }


// };



export const getWallet = async () => {
  const res = await api.get("/api/transaction/user");
  return res.data; // { balance, transactions }
};

export const redeem = async (payload: any) => {
  const res = await api.post("/api/qrcode/redeem", payload);
  return res.data; // { success, amount, newBalance }
};

export const getHistory = async () => {
  const res = await api.get("/api/transaction/user");
  return res.data; // [{...}]
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




// FOR USER SIGNUP / REGISTER
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  phone: string
) => {
  console.warn("Signup API Called");

  try {
    const { data } = await api.post(`/api/user/signup`, {
      name,
      email,
      password,
      phone
    });

    console.log("Signup API Response:", data);

    return data;
  } catch (error: any) {
    console.log("Signup API Error:", error?.response?.data || error?.message);

    throw new Error(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Signup failed. Please try again."
    );
  }
};


// LOGOUT USER
export const logoutUser = async (token: string) => {
  console.warn("Logout API Called");

  try {
    const { data } = await api.post(
      `/api/user/logout`,
      {}, // body empty
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Logout API Response:", data);

    return data;
  } catch (error: any) {
    console.log(
      "Logout API Error:",
      error?.response?.data || error?.message
    );

    throw new Error(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Logout failed. Please try again."
    );
  }
};


// DELETE USER ACCOUNT
export const deleteUserAccount = async () => {
  console.warn("Delete Account API Called");

  try {
    const { data } = await api.delete(
      "/api/user/delete-user-data/"
    );

    console.log("Delete Account API Response:", data);

    return data;
  } catch (error: any) {
    console.log(
      "Delete Account API Error:",
      error?.response?.data || error?.message
    );

    throw new Error(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to delete account. Please try again."
    );
  }
};
