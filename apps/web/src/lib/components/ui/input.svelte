<script lang="ts">
  export let error: string[] | null = null;
  export let type: string = "text";
  export let name: string;
  export let placeholder: string | undefined = undefined;
</script>

<div class="input_wrapper">
  <label for={name}>
    <slot />
  </label>
  <input {placeholder} class="input_fild" {type} {name} />
  {#if error}
    {#each error as err}
      <span class="error_msg">{err}</span>
    {/each}
  {/if}
</div>

<style lang="postcss">
  .input_wrapper {
    @apply w-full flex flex-col;
  }

  .input_fild {
    @apply py-3 text-sm border-b border-primary focus:outline-none bg-transparent appearance-none text-primary;
  }

  .error_msg {
    @apply text-xs text-error mt-1 lowercase;
  }
</style>
