<script lang="ts">
  import { Motion } from "svelte-motion";
  import { draw } from "svelte/transition";
  export let expend: boolean | undefined = false;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="w-6 h-6"
>
  <Motion
    let:motion
    isSVG
    initial={{ rotate: 0 }}
    animate={{ rotate: expend ? 45 : 0 }}
  >
    <path
      use:motion
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </Motion>
</svg>
