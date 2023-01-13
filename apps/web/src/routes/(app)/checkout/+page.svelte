<script lang="ts">
  import type { PageData } from "./$types";
  import { navbarHeight } from "$lib/stores/global.store";
  import BillingDetails from "./components/billing-details.svelte";
  import YourOrder from "./components/your-order.svelte";
  import { enhance, type SubmitFunction } from "$app/forms";
  import {
    PlaceOrderSchema,
    type IPlaceOrderSchema,
  } from "$lib/validations/place_order";
  import type { IFormError } from "$lib/@types/global.types";
  import { z } from "zod";

  // TODO add types
  export let form: any;
  let formError: IFormError;
  export let data: PageData;
  $: errors = form?.errors || formError;

  const formAction: SubmitFunction = async ({ cancel, data: formData }) => {
    try {
      const _formData = Object.fromEntries(formData) as IPlaceOrderSchema;
      const res = PlaceOrderSchema.parse(_formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const { fieldErrors: errors } = error.flatten();
        formError = errors;
      }
    }
    cancel();
  };
</script>

<main
  style="min-height: calc(100vh - {$navbarHeight}px);"
  class="container mx-auto pt-20"
>
  <section>
    <header>
      <h1 class="flex flex-col | text-7xl | uppercase">
        <span class="ml-10 | font-light text-black">Order</span>
        <span class="font-title font-thin ">Checkout</span>
      </h1>
    </header>
  </section>

  <form
    action="?/place_order"
    method="POST"
    class="grid grid-cols-12 | mt-20 gap-x-10"
    use:enhance={formAction}
  >
    <BillingDetails {errors} class="col-span-6" />
    <YourOrder class="col-span-6" />
  </form>
</main>
