<script lang="ts">
  import XIcon from "$lib/components/icons/x-icon.svelte";
  import { EASE, TAKA_SYMBOL } from "$lib/helpers/constants";
  import { showCart } from "$lib/stores/global.store";
  import { Motion } from "svelte-motion";
  import AnimatePresence from "svelte-motion/src/components/AnimatePresence/AnimatePresence.svelte";
  import { clickoutside } from "@svelte-put/clickoutside";
  import { cart, removeFormCart } from "$lib/stores/cart.store";
  import XCircleIcon from "$lib/components/icons/x-circle-icon.svelte";
  import SanityImage from "$lib/components/sanity-image.svelte";
  import Backdrop from "$lib/components/backdrop.svelte";

  const closeCartAction = () => ($showCart = false);
  const removeItemFromCartAction = (_id: string) => removeFormCart(_id);
  $: subTotal = $cart.reduce(
    (sum, item) => sum + item.price * (item?.quantity ?? 1),
    0
  );
</script>

<Backdrop show={$showCart} />
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

      {#if !!$cart.length}
        <section class="mt-10 space-y-5">
          <ul class="flex flex-col space-y-3">
            {#each $cart as { image, price, title, quantity, _id }}
              <li class="flex space-x-2 | h-[150px] ">
                <button
                  on:click={() => removeItemFromCartAction(_id)}
                  class="self-start"
                >
                  <XCircleIcon class="h-6 w-6 mt-2" />
                </button>
                <div class="grid grid-cols-12 flex-1">
                  <div class="col-span-8">
                    <h6 class="text-2xl font-medium font-title">{title}</h6>
                    <span>
                      {quantity}
                      <span class="text-xs">X</span>
                      {price}
                      {TAKA_SYMBOL}
                    </span>
                  </div>
                  <figure
                    class="col-span-4 flex justify-center items-center overflow-hidden"
                  >
                    <SanityImage
                      class="object-cover h-full w-full"
                      {image}
                      maxWidth={200}
                    />
                  </figure>
                </div>
              </li>
            {/each}
          </ul>
          <div
            class="flex space-x-2 items-center py-5 my-2 border-t border-secondary w-fit"
          >
            <span class="font-light text-xl">Subtotal:</span>
            <span class="text-2xl">{subTotal} {TAKA_SYMBOL}</span>
          </div>
          <div>
            <button class="__btn">View Cart</button>
            <button class="__btn">Chcekout</button>
          </div>
        </section>
      {:else}
        <section class="h-full flex justify-center items-center flex-col">
          <Motion
            let:motion
            initial={{ y: 0 }}
            animate={{
              y: [0, 15, 0],
            }}
            transition={{ ease: "linear", repeat: Infinity, duration: 2.5 }}
          >
            <img use:motion src="/images/meditating.png" alt="" />
          </Motion>
          <h6 class="text-3xl mt-10">Cart is Empty</h6>
          <a class="__btn mt-5" href="/shop">Let's Shop!</a>
        </section>
      {/if}
    </aside>
  </Motion>
</AnimatePresence>

<style lang="postcss">
  .__btn {
    @apply btn px-10 py-2 border-secondary bg-secondary font-body text-sm duration-700;
  }
</style>
