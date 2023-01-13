<script lang="ts">
  import type { IFormError } from "$lib/@types/global.types";
  import Input from "$lib/components/ui/input.svelte";
  import Select from "$lib/components/ui/select.svelte";
  import Textarea from "$lib/components/ui/textarea.svelte";
  import districtData from "$lib/bd-districs.json";

  const { districts } = districtData;
  export let errors: IFormError;
</script>

<div class={$$props.class}>
  <h2 class="font-title | text-5xl font-thin">Billing Details</h2>

  <div class="flex flex-col | text-secondary | space-y-3 mt-10 | uppercase ">
    <Input name="first_name" type="text" error={errors?.first_name}
      >First Name</Input
    >
    <Input name="last_name" type="text" error={errors?.last_name}
      >Last Name</Input
    >
    <Input
      name="address"
      type="text"
      error={errors?.address}
      placeholder="House number, streer number, apartment, unit, etc"
      >Address</Input
    >
    <Input name="post_code" type="select" error={errors?.post_code}
      >POSTCODE / ZIP</Input
    >
    <Select data={districts} name="distric" placeholder="Distric"
      >Distric</Select
    >

    <Input name="phone_number" type="text" error={errors?.phone_number}
      >Phone Number</Input
    >
    <Input name="email_address" type="text" error={errors?.email_address}
      >Email Address (Optional)</Input
    >
    <Textarea
      error={errors?.order_notes}
      name="order_notes"
      placeholder="Notes about your order, e.g. special notes for delivery"
      >Order Notes (Optional)</Textarea
    >
  </div>
</div>
