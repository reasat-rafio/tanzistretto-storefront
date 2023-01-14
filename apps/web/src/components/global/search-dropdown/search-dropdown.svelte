<!-- <Backdrop show={$showCart} /> -->
<script lang="ts">
  import BackdropBlur from "$components/backdrop-blur.svelte";
  //   import BackdropGrayscale from "$lib/components/backdrop-grayscale.svelte";
  import { EASE } from "$lib/helpers/constants";
  import { showQuickSearchDropdown } from "$lib/stores/global.store";
  import { clickoutside } from "@svelte-put/clickoutside";
  import { Motion } from "svelte-motion";
  import AnimatePresence from "svelte-motion/src/components/AnimatePresence/AnimatePresence.svelte";

  const closeQuickSearchAction = () => ($showQuickSearchDropdown = false);
</script>

<!-- <BackdropGrayscale show={$showQuickSearchDropdown} /> -->
<BackdropBlur show={$showQuickSearchDropdown} />
<AnimatePresence show={$showQuickSearchDropdown}>
  <Motion
    initial={{ y: "-100%" }}
    animate={{ y: 0 }}
    exit={{ y: "-100%" }}
    transition={{ ease: EASE, duration: 0.65 }}
    let:motion
  >
    <div
      use:motion
      use:clickoutside
      on:clickoutside={closeQuickSearchAction}
      class="z-40 fixed right-0 top-0 | w-screen h-[50vh] | px-5 pt-5 | bg-white shadow"
    />
  </Motion>
</AnimatePresence>
