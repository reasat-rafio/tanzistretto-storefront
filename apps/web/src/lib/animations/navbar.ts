import type { Variants } from "svelte-motion";

export const NavbarVariants: Variants = {
  initial: {
    backgroundColor: "#edece9",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    boxShadow: "",
    transition: {
      paddingTop: {
        duration: 0.35,
        ease: [0.445, 0.05, 0.55, 0.95],
      },
      paddingBottom: {
        duration: 0.35,
        ease: [0.445, 0.05, 0.55, 0.95],
      },
      backgroundColor: {
        duration: 0.7,
        ease: "linear",
      },
    },
  },
  animate: {
    boxShadow: "rgb(0 0 0 / 20%) 0px 0px 20px",
    backgroundColor: "#eeeeee",
    paddingTop: ".5rem",
    paddingBottom: ".5rem",
    transition: {
      paddingTop: {
        duration: 0.35,
        ease: [0.445, 0.05, 0.55, 0.95],
      },
      paddingBottom: {
        duration: 0.35,
        ease: [0.445, 0.05, 0.55, 0.95],
      },
      backgroundColor: {
        duration: 0.7,
        ease: "easeIn",
      },
    },
  },
};
