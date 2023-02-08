<script lang="ts">
  export let name: string;
  export let data: { name: string }[];
</script>

<div class="w-full flex flex-col relative">
  <label for={name}>
    <slot />
  </label>
  <select
    {name}
    class="select !py-3 !px-0 !text-sm focus:outline-none bg-transparent appearance-none !text-primary"
  >
    {#each data as { name }}
      <option>{name}</option>
    {/each}
  </select>
  <span class="absolute bottom-0 bg-primary h-[1px] w-full" />
</div>

<!-- /* .error_msg {
    @apply text-xs text-error mt-1 lowercase;
  } */ -->
