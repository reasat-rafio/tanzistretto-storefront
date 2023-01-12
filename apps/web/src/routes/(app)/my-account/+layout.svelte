<script lang="ts">
  import Navigation from "./components/navigation.svelte";
</script>

<div class="grid grid-cols-12 | container | mx-auto ">
  <Navigation class="col-span-3" />
  <section class="col-span-9">
    <slot />
  </section>
</div>
