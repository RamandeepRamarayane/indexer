import { create } from "zustand";
import { useAuthStore } from "./auth";

const useCombinedStore = create((...a) => ({
  appLoading: false,
  setAppLoading: (loading) => ({ appLoading: loading }),
  ...useAuthStore(...a),
}));

export default useCombinedStore;
