<script lang="ts">
  export let data: any;
</script>

{#if data.code}
  {data.code}
{:else}
  <p>Order not found</p>
{/if}
