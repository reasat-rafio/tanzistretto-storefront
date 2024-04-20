<script lang="ts">
  import { formStore, type DeliveryAddressForm } from '$lib/stores/form-store';
  import { customerDeliveryAddress } from '$lib/utils/validators';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$components/ui/form';
  import Input from '$components/ui/input/input.svelte';
  import * as Select from '$components/ui/select/index.js';
  import { RotateCw } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import type { View } from '$lib/types/common.types';
  import { invalidateAll } from '$app/navigation';

  export let view: View;

  let loading = false;
  let selectedCountry: { value: string; label: string };
  const { addDeliveryAddressForm } = $formStore;

  const addDeliveryForm = superForm(
    addDeliveryAddressForm as DeliveryAddressForm,
    {
      validators: zodClient(customerDeliveryAddress),
      invalidateAll: true,
      onSubmit: () => {
        loading = true;
      },
      onResult: ({ result }) => {
        loading = false;

        if (result.type === 'success') {
          toast.success((result as any).data?.form?.message);
          view = 'delivery-addresses';
          invalidateAll();
        } else if (result.type === 'error') {
          const errorMessage = (result as any).data?.form?.message;
          if (!!errorMessage) toast.error(errorMessage);
        }
      },
    },
  );

  const { form, enhance } = addDeliveryForm;
</script>

<form method="POST" action="?/addDeliveryAddress" use:enhance>
  <Form.Field form={addDeliveryForm} name="fullName">
    <Form.Control let:attrs>
      <Form.Label>First Name</Form.Label>
      <Input {...attrs} bind:value={$form.fullName} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field form={addDeliveryForm} name="address1">
    <Form.Control let:attrs>
      <Form.Label>Address</Form.Label>
      <Input {...attrs} bind:value={$form.address1} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field form={addDeliveryForm} name="address2">
    <Form.Control let:attrs>
      <Form.Label>Apartment, suite, etc.</Form.Label>
      <Input {...attrs} bind:value={$form.address2} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <div class="grid grid-cols-12 gap-3">
    <Form.Field class="col-span-4" form={addDeliveryForm} name="postalCode">
      <Form.Control let:attrs>
        <Form.Label>Postal Code</Form.Label>
        <Input {...attrs} bind:value={$form.postalCode} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field class="col-span-8" form={addDeliveryForm} name="city">
      <Form.Control let:attrs>
        <Form.Label>City</Form.Label>
        <Input {...attrs} bind:value={$form.city} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
  </div>

  <Form.Field form={addDeliveryForm} name="countryCode">
    <Form.Control let:attrs>
      <Form.Label>Country</Form.Label>
      <Select.Root
        selected={selectedCountry}
        onSelectedChange={(v) => {
          v && ($form.countryCode = v.value);
        }}>
        <Select.Trigger {...attrs}>
          <Select.Value placeholder="Select a country" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="bd" label="Bangladesh" />
        </Select.Content>
      </Select.Root>
      <input hidden bind:value={$form.countryCode} name={attrs.name} />
    </Form.Control>

    <Form.FieldErrors />
  </Form.Field>

  <Form.Field form={addDeliveryForm} name="phoneNumber">
    <Form.Control let:attrs>
      <Form.Label>Phone Number</Form.Label>
      <Input {...attrs} bind:value={$form.phoneNumber} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button disabled={loading} class="mt-2 w-full space-x-1">
    {#if loading}
      <RotateCw size={18} class="animate-spin" />
    {/if}
    <span>Submit</span>
  </Form.Button>
</form>
