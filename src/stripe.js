import { loadStripe } from "@stripe/stripe-js";
import { PROD } from "./config";

const key = false
  ? "pk_live_51HMpbJJeT6r8ty8aJJo6GfCNAuIGOyG0iUeFTKSTixRVOBnnM6jvzUTm3D7na6dErS69h02ZBzlsewejdIeSkh3z00ZRDm7Wta"
  : "pk_test_51HMpbJJeT6r8ty8aWC2tfjthPfNxuIvqdGT1Kiy8GjJGy4fKkCChZnFNXO06pSEOfCfBGYSpO8sYtkwi92J3tv4H00xMZPKtLV";

async function customLoadStripe() {
  try {
    let a = await loadStripe(key);
    return a;
  } catch (error) {
    console.log(error);
    return {};
  }
}

const stripeInstance = await customLoadStripe();

export default stripeInstance;
