import { v4 as uuid } from "uuid";

export const secondaryNavData = [
  {
    _id: uuid(),
    title: "Location",
    url: "",
  },
  {
    _id: uuid(),
    title: "Account",
    url: "/account/login",
  },
];
