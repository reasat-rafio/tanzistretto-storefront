import { EASE } from "$lib/helpers/constants";
import type { Variants } from "svelte-motion";

export const NavbarVariants: Variants = {
  initial: {
    backgroundColor: "#edece9",
    paddingTop: "1rem",
    paddingBottom: "1rem",

    transition: {
      paddingTop: {
        duration: 0.35,
        ease: EASE,
      },
      paddingBottom: {
        duration: 0.35,
        ease: EASE,
      },
      backgroundColor: {
        duration: 0.7,
        ease: "linear",
      },
      boxShadow: {
        duration: 0.35,
        ease: "linear",
      },
    },
  },
  animate: {
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    backgroundColor: "#eeeeee",
    paddingTop: ".5rem",
    paddingBottom: ".5rem",
    transition: {
      paddingTop: {
        duration: 0.35,
        ease: EASE,
      },
      paddingBottom: {
        duration: 0.35,
        ease: EASE,
      },
      backgroundColor: {
        duration: 0.7,
        ease: "easeIn",
      },
      boxShadow: {
        duration: 0.35,
        ease: "easeIn",
      },
    },
  },
};
