import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: any | null;
  setAuth: (token: string, user: any) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  token: null,
  user: null,

  setAuth: async (token, user) => {
    await localStorage.setItem("token", token);
    await localStorage.setItem("user", JSON.stringify(user));

    set({ token, user });
  },

  logout: async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("user");

    set({ token: null, user: null });
  },

  hydrate: async () => {
    const token = await localStorage.getItem("token");
    const user = await localStorage.getItem("user");

    set({
      token: token,
      user: user ? JSON.parse(user) : null,
    });
  },
}));
