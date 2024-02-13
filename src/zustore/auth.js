import { endPoints } from "../endPoints";
import { getData, postData } from "../networkCalls";
import { screens } from "../screens";

export const useAuthStore = (set) => ({
  isAuthenticated: false,
  userInfo: {},
  loginRequest: async ({ email, password, navigate, rememberMe = false }) => {
    set({ error: "" });
    set({ userInfo: { email: email } });
    const res = await postData({
      url: endPoints.login,
      payload: { email, password },
    });

    if (res.status === 200) {
      localStorage.setItem("token", res.data.tokens.access.token);
      set({ userInfo: { ...res.data.user }, isAuthenticated: true });
      window.location = "/dashboard";
    } else if (res.status === 202) {
      navigate && navigate(screens.verify);
      set({
        userInfo: {
          email: email,
        },
      });
    } else {
      set({ error: res.data.message });
    }
  },
  loginViaToken: async ({ navigate, setLoading }) => {
    setLoading && setLoading(true);
    const res = await getData({
      url: endPoints.loginViaToken,
      skipErrorMsg: true,
    });
    if (res.status == 200) {
      set({ userInfo: { ...res.data }, isAuthenticated: true });
    } else {
      set({ userInfo: {}, isAuthenticated: false });
    }
    setLoading && setLoading(false);
  },
  signUpRequest: async ({ name, email, password, company, navigate }) => {
    set({ error: "" });
    set({ userInfo: { userEmail: email, company, userName: name } });
    const res = await postData({
      url: endPoints.register,
      payload: { email, password, companyName: company, name },
    });
    if (res.status === 201) {
      navigate && navigate(screens.verify);
    } else if (res.status == 202) {
      navigate && navigate(screens.verify);
    } else {
      navigate && navigate(screens.login);

      set({ error: res.data.message });
    }
  },
  logoutRequest: () => {
    localStorage.removeItem("token");

    set({ userInfo: {}, isAuthenticated: false });
  },
  authSuccess: ({ userInfo, token }) => {
    localStorage.setItem("token", token);
    set({ isAuthenticated: true, userInfo: { ...userInfo } });
  },
});
