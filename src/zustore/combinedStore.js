import { create } from "zustand";
import { useAuthStore } from "./auht";
import zukeeper from "zukeeper";

const useCombinedStore = create(
  zukeeper((...a) => ({
    appLoading: false,
    setAppLoading: (loading) => ({ appLoading: loading }),
    ...useAuthStore(...a),
  }))
);

window.store = useCombinedStore;

export default useCombinedStore;
