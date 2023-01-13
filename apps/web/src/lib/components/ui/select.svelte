<script lang="ts">
  export let type: string = "text";
  export let name: string;
  export let placeholder: string | undefined = undefined;
  export let data: { name: string }[];
</script>

<div class="input_wrapper relative">
  <label for={name}>
    <slot />
  </label>
  <select {name} class="select input_fild">
    {#each data as { name }}
      <option>{name}</option>
    {/each}
  </select>
  <span class="absolute bottom-0 bg-primary h-[1px] w-full" />
</div>

<style lang="postcss">
  .input_wrapper {
    @apply w-full flex flex-col;
  }

  .input_fild {
    @apply !py-3 !px-0 !text-sm focus:outline-none bg-transparent appearance-none !text-primary;
  }

  .error_msg {
    @apply text-xs text-error mt-1 lowercase;
  }
</style>
