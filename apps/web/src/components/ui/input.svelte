<script lang="ts">
  export let error: string[] | null = null;
  export let type: string = "text";
  export let name: string;
  export let placeholder: string | undefined = undefined;
</script>

<div class="w-full flex flex-col">
  <label for={name}>
    <slot />
  </label>
  <input
    {placeholder}
    class="py-3 text-sm border-b border-primary focus:outline-none bg-transparent appearance-none text-primary"
    {type}
    {name}
  />
  {#if error}
    {#each error as err}
      <span class="text-xs text-error mt-1 lowercase">{err}</span>
    {/each}
  {/if}
</div>
