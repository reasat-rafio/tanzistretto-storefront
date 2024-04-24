<script lang="ts">
  import { HeartIcon } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  export let _id: string;

  let loading = false;

  async function makeFavorite() {
    try {
      loading = true;

      await fetch('/api/favorite/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          setId: _id,
        }),
      });
      toast.success('Added to favorites');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add to favorites');
    } finally {
      loading = false;
    }
  }
</script>

<button
  on:click|stopPropagation={makeFavorite}
  disabled={loading}
  class="absolute right-5 top-5 z-10 rounded-full bg-white p-1.5 shadow-xl transition-transform duration-300 hover:scale-105">
  <HeartIcon size={18} />
  <span class="sr-only">Add To Favorites</span>
</button>
