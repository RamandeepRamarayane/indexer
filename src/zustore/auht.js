import { endPoints } from "../endPoints";
import { postData } from "../networkCalls";
import { screens } from "../screens";

export const useAuthStore = (set) => ({
  isAuthenticated: false,
  userInfo: {},
  loginRequest: async ({ email, password, navigate }) => {
    set({ error: "" });
    set({ userEmail: email });
    const res = await postData({
      url: endPoints.login,
      payload: { email, password },
    });

    if (res.status === 200) {
      localStorage.setItem("token", res.data.tokens.access.token);
      set({ userInfo: { ...res.data.user }, isAuthenticated: true });
    } else if (res.status === 202) {
      navigate && navigate(screens.verify);
      set({
        userInfo: {
          userEmail: email,
          userName: "",
          signupPassword: password,
        },
      });
    } else {
      set({ error: res.data.message });
    }
  },
  loginViaToken: async (token) => {
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ userInfo: {}, isAuthenticated: false });
  },
});
