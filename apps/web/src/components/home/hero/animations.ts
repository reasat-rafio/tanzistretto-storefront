import anime from "animejs";

export const headerBottomUpAndBlurAnim = {
  targets: "#hero_header",
  translateY: ["100%", 0],
  filter: ["blur(20px)", "blur(0px)"],
};

export const headerTextColorAnime = {
  targets: "#hero_header",
  color: "#edece9",
  duration: 50,
  opacity: [0.8, 1],
  easing: "easeInOutQuad",
};

export const backdropBottomUpAnime = {
  targets: "#hero_backdrop",
  translateY: "-100%",
  update: (anim: anime.AnimeInstance) => {
    if (anim.progress >= 40) {
      anime(headerTextColorAnime);
    }
  },
};
