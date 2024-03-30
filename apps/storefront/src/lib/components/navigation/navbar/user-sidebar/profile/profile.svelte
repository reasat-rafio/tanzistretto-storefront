<script lang="ts">
  import { enhance } from '$app/forms';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';

  //   const { form: formData, enhance } = form;
</script>

<div class="space-y-2">
  <h2 class="text-2xl font-bold">
    Manage address, contact info and personal preferences
  </h2>

  <div>
    <h3 class="text-lg">
      To create an account, please enter your email and choose a password below.
    </h3>
  </div>

  <form method="POST" use:enhance>
    <Form.Field {form} name="username">
      <Form.Control let:attrs>
        <Form.Label>Username</Form.Label>
        <Input {...attrs} bind:value={$formData.username} />
      </Form.Control>
      <Form.Description>This is your public display name.</Form.Description>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Button>Submit</Form.Button>
  </form>
</div>
