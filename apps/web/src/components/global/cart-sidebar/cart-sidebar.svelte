<script lang="ts">
  import XIcon from "$components/icons/x-icon.svelte";
  import { TAKA_SYMBOL } from "$lib/helpers/constants";
  import { showCart } from "$lib/stores/global.store";
  import { Motion } from "svelte-motion";
  import { clickoutside } from "@svelte-put/clickoutside";
  import { cart, removeFormCart } from "$lib/stores/cart.store";
  import XCircleIcon from "$components/icons/x-circle-icon.svelte";
  import SanityImage from "$components/sanity-image.svelte";
  import BackdropBlur from "$components/backdrop-blur.svelte";
  import { browser } from "$app/environment";
  import anime from "animejs";

  let cartSidebarEl: HTMLElement;
  const closeCartAction = () => ($showCart = false);
  const removeItemFromCartAction = (_id: string) => removeFormCart(_id);
  $: subTotal = $cart.reduce(
    (sum, item) => sum + item.price * (item?.quantity ?? 1),
    0
  );

  $: if (browser)
    $showCart
      ? anime({
          targets: "#cart_sidebar",
          display: "block",
          translateX: ["100%", 0],
          duration: 650,
          easing: "easeInOutQuad",
          begin: () => {
            cartSidebarEl.style.display = "block";
          },
        })
      : anime({
          targets: "#cart_sidebar",
          display: "none",
          translateX: [0, "100%"],
          duration: 400,
          easing: "easeInOutQuad",
          complete: () => {
            cartSidebarEl.style.display = "none";
          },
        });
</script>

<BackdropBlur show={$showCart} />
<aside
  bind:this={cartSidebarEl}
  id="cart_sidebar"
  use:clickoutside
  on:clickoutside={closeCartAction}
  class="z-40 fixed  | right-0 top-0  | h-screen w-[600px] | px-5 pt-5  bg-white hidden"
>
  <Motion
    initial={{ rotate: 0 }}
    whileHover={{ rotate: 45 }}
    whileTap={{ scale: 1.2 }}
    let:motion
  >
    <button use:motion on:click={closeCartAction} class="w-fit block ml-auto">
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
        <button
          class="btn px-10 py-2 border-secondary bg-secondary font-body text-sm duration-700"
          >View Cart</button
        >
        <a
          href="/checkout"
          class="btn px-10 py-2 border-secondary bg-secondary font-body text-sm duration-700"
          >Chcekout</a
        >
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
      <a
        class="btn px-10 py-2 border-secondary bg-secondary font-body text-sm duration-700 mt-5"
        href="/shop">Let's Shop!</a
      >
    </section>
  {/if}
</aside>
