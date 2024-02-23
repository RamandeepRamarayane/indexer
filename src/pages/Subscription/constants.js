export const PLANS = [
  {
    plan_id: "83a7375f-c8b0-11ee-be08-0e6287f46173",
    plan_name: "Trial Plan",
    description: null,
    type: 1,
    price: null,
    currency: null,
  },
  {
    plan_id: "83eac4d2-c8b0-11ee-be08-0e6287f46173",
    plan_name: "Life Time Deal",
    description: null,
    type: 2,
    price: 200,
    currency: "inr",
  },
  {
    plan_id: "841b6ea9-c8b0-11ee-be08-0e6287f46173",
    plan_name: "Life Time Deal",
    description: null,
    type: 2,
    price: 3,
    currency: "usd",
  },
];

export const getCurrencySign = (type = "inr") => {
  let sign = "$";
  if (!type) {
    return sign;
  }
  let _temp = type.toLowerCase();

  if (_temp == "inr") {
    sign = "₹";
  }
  return sign;
};
