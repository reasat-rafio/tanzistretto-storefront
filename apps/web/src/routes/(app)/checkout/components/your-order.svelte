<script lang="ts">
  import { cart } from "$lib/stores/cart.store";

  $: total = $cart.reduce(
    (sum, item) => sum + item.price * (item?.quantity ?? 1),
    0
  );
</script>

<div class={$$props.class}>
  <h2 class="font-title | text-5xl font-thin">Your Order</h2>

  <div class="overflow-x-auto mt-20">
    <table class=" table-normal	w-full text-black">
      <!-- head -->
      <thead class="border-b border-secondary/20">
        <tr>
          <th class="text-left"> Product</th>
          <th class="text-right">Subtota</th>
        </tr>
      </thead>
      <tbody>
        {#each $cart as { price, title, quantity }}
          <tr class="border-b border-secondary/20">
            <td>{title} x {quantity}</td>
            <td class="text-right">{price}</td>
          </tr>
        {/each}

        <tr class="border-b border-secondary/20">
          <td class="text-left">Subtotal</td>
          <td class="text-right">{total}</td>
        </tr>
        <tr>
          <td class="text-left">Total</td>
          <td class="text-right">{total}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
