<script>
  import { HeartIcon } from 'lucide-svelte';
</script>

<button
  on:click|stopPropagation={() => {}}
  class=" absolute right-5 top-5 z-10 rounded-full bg-white p-1.5 shadow-xl transition-transform duration-300 hover:scale-105">
  <HeartIcon size={18} />
  <span class="sr-only">Add To Favorites</span>
</button>
