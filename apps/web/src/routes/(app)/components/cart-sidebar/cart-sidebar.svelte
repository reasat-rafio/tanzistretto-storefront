<script lang="ts">
  import XIcon from "$lib/components/icons/x-icon.svelte";
  import { EASE } from "$lib/helpers/constants";
  import { showCart } from "$lib/stores/global.store";
  import { Motion } from "svelte-motion";
  import AnimatePresence from "svelte-motion/src/components/AnimatePresence/AnimatePresence.svelte";
  import { clickoutside } from "@svelte-put/clickoutside";

  const closeCartAction = () => ($showCart = false);
</script>

<AnimatePresence show={$showCart}>
  <Motion
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ ease: EASE, duration: 0.65 }}
    let:motion
  >
    <aside
      use:motion
      use:clickoutside
      on:clickoutside={closeCartAction}
      class="fixed right-0 w-[600px] bg-white z-40 px-5 pt-5 top-0 h-screen"
    >
      <Motion
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 45 }}
        whileTap={{ scale: 1.2 }}
        let:motion
      >
        <button
          use:motion
          on:click={closeCartAction}
          class="w-fit block ml-auto"
        >
          <XIcon class="h-9 w-9 text-primary" />
        </button>
      </Motion>
    </aside>
  </Motion>
</AnimatePresence>
