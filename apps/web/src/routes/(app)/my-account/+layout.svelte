<script lang="ts">
  import type { PageData } from "./$types";
  import Navigation from "../../../components/my-account/navigation.svelte";

  export let data: PageData;
</script>

<div class="grid grid-cols-12 | container | mx-auto ">
  <Navigation user={data.session?.user} class="col-span-3" />
  <section class="col-span-9">
    <slot />
  </section>
</div>
