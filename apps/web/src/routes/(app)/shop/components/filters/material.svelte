<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import type { Slug } from "$lib/@types/global.types";
  // TODO change the slug types to global.types
  import type { Category } from "$lib/@types/shop.types";
  import { getContext } from "svelte";
  import { Motion } from "svelte-motion";
  import AnimatePresence from "svelte-motion/src/components/AnimatePresence/AnimatePresence.svelte";
  import ExpendIcon from "../icons/expend-icon.svelte";

  //  materila and category have same types
  const materials = getContext("materials") as Category[];
  let expend = false;
  let selection: Slug[] = [];

  function selectMaterialAction(slug: Slug) {
    const slugAlreadySelected = selection.find(
      ({ current }) => current === slug.current
    );
    if (!slugAlreadySelected) selection = [...selection, slug];
    else
      selection = selection.filter(({ current }) => current !== slug.current);

    const newUrl = new URL($page.url);
    if (!!selection.length)
      newUrl?.searchParams?.set(
        "materials",
        selection.map(({ current }) => current).join(",")
      );
    else newUrl?.searchParams?.delete("materials");

    goto(newUrl.toString().replace(/%2C/g, ","), {
      replaceState: true,
      noScroll: true,
    });
  }
</script>

<div>
  <button
    class="flex cursor-pointer w-full py-2 border-b border-cinereous"
    on:click={() => (expend = !expend)}
  >
    <!-- TODO make sure this is ligal -->
    <h3 class="flex-1 uppercase text-xl text-left">Materials</h3>
    <ExpendIcon {expend} />
  </button>

  <AnimatePresence show={expend}>
    <Motion
      let:motion
      initial={{ height: 0, opacity: 0, marginTop: 0 }}
      animate={{
        height: "auto",
        opacity: 1,
        marginTop: "1.25rem",
      }}
      exit={{ height: 0, opacity: 0, marginTop: 0 }}
      transition={{ ease: [0.445, 0.05, 0.55, 0.95], duration: 0.4 }}
    >
      <ul class="flex flex-col | space-y-2" use:motion>
        {#each materials as { _id, slug, title } (_id)}
          <button
            on:click={() => selectMaterialAction(slug)}
            class="flex items-center | space-x-2"
          >
            <input
              bind:group={selection}
              value={slug}
              name="material_check_box"
              type="checkbox"
              class="checkbox checkbox-sm"
            />
            <span>
              {title}
            </span>
          </button>
        {/each}
      </ul>
    </Motion>
  </AnimatePresence>
</div>
