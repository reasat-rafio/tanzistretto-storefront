<script>
  import { EASE } from "$lib/helpers/constants";
  import { Motion } from "svelte-motion";

  import AnimatePresence from "svelte-motion/src/components/AnimatePresence/AnimatePresence.svelte";

  export let show = false;
</script>

<AnimatePresence {show}>
  <Motion
    let:motion
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 0.7,
    }}
    exit={{ opacity: 0 }}
    transition={{ ease: EASE, duration: 0.35 }}
  >
    <div
      use:motion
      class="h-screen w-screen fixed top-0 left-0 z-30 bg-black"
    />
  </Motion>
</AnimatePresence>
