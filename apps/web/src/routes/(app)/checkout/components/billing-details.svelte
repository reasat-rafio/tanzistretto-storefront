<script lang="ts">
  import type { IFormError } from "$lib/@types/global.types";
  import Input from "$lib/components/ui/input.svelte";
  import Select from "$lib/components/ui/select.svelte";
  import Textarea from "$lib/components/ui/textarea.svelte";
  import districtData from "$lib/bd-districs.json";

  const { districts } = districtData;
  export let form: any;
  let formError: IFormError;
</script>

<div class={$$props.class}>
  <h2 class="font-title | text-5xl font-thin">Billing Details</h2>

  <form
    action="?/place_order"
    method="POST"
    class="flex flex-col | text-secondary | space-y-3 mt-10 | uppercase "
  >
    <Input name="first_name" type="text" erros={[""]}>First Name</Input>
    <Input name="last_name" type="text" erros={[""]}>Last Name</Input>
    <Input
      name="address"
      type="text"
      erros={[""]}
      placeholder="House number, streer number, apartment, unit, etc"
      >Address</Input
    >
    <Input name="town_city" type="select" erros={[""]}>Town / City</Input>
    <Select data={districts} name="Distric" placeholder="Distric"
      >Distric</Select
    >

    <Input name="phone_number" type="text" erros={[""]}>Phone Number</Input>
    <Input name="email_address" type="text" erros={[""]}
      >Email Address (Optional)</Input
    >
    <Textarea
      name="order_notes"
      placeholder="Notes about your order, e.g. special notes for delivery"
      >Order Notes (Optional)</Textarea
    >
  </form>
</div>
