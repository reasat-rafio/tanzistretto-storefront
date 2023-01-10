<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  // TODO change the slug types to global.types
  import type { Category, Slug } from "$lib/@types/shop.types";
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
    newUrl?.searchParams?.set(
      "materials",
      selection.map(({ current }) => current).join(",")
    );

    goto(newUrl.toString().replace(/%2C/g, ","));
  }
</script>

<div>
  <div
    class="flex cursor-pointer w-full py-2 border-b border-cinereous"
    on:click={() => (expend = !expend)}
  >
    <h3 class="flex-1 uppercase text-xl">Materials</h3>
    <ExpendIcon {expend} />
  </div>

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
          <label
            on:click={() => selectMaterialAction(slug)}
            class="flex items-center | space-x-2"
            for="material_check_box"
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
          </label>
        {/each}
      </ul>
    </Motion>
  </AnimatePresence>
</div>
