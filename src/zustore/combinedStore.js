import { create } from "zustand";
import { useAuthStore } from "./auht";
import zukeeper from "zukeeper";

const combinedStore = create(
  zukeeper((...a) => ({
    ...useAuthStore(...a),
  }))
);

window.store = combinedStore;

export default combinedStore;
