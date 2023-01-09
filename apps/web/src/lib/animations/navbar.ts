import type { Variants } from "svelte-motion";

export const NavbarVariants: Variants = {
  initial: {
    backgroundColor: "#edece9",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    transition: { type: "spring", duration: 0.3 },
  },
  animate: {
    backgroundColor: "#eeeeee",
    paddingTop: ".5rem",
    paddingBottom: ".5rem",
    transition: { type: "spring", duration: 0.2 },
  },
};
