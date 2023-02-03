<script lang="ts">
	import { navbarHeight } from '$lib/stores/global.store'
	import { onMount } from 'svelte'
	import Categories from './categories.svelte'
	import Material from './material.svelte'
	let topPosition = 0

	onMount(() => {
		topPosition = $navbarHeight
	})
</script>

<aside
	style="top:{topPosition + 20}px"
	class="flex flex-col space-y-2 sticky left-0"
>
	<Categories />
	<Material />
</aside>
