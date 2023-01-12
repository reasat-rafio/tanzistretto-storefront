import { v4 as uuid } from "uuid";

export const NavigationData = [
  {
    _id: uuid(),
    title: "Your Orders",
    url: "your-orders",
  },
  {
    _id: uuid(),
    title: "Account Settings",
    url: "account-settings",
  },
  {
    _id: uuid(),
    title: "Sign Out",
    url: "sign-out",
  },
];
