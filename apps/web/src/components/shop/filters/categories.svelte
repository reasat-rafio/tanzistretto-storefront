<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import type { Slug } from "$lib/@types/global.types";
  import type { Category } from "$lib/@types/shop.types";
  import { getContext } from "svelte";
  import { Motion } from "svelte-motion";
  import AnimatePresence from "svelte-motion/src/components/AnimatePresence/AnimatePresence.svelte";
  import ExpendIcon from "../icons/expend-icon.svelte";

  const categories = getContext("categories") as Category[];
  let expend = true;
  let selection: Slug[] = [];

  const selectCategoryAction = (slug: Slug) => {
    const slugAlreadySelected = selection.find(
      ({ current }) => current === slug.current
    );
    if (!slugAlreadySelected) selection = [...selection, slug];
    else
      selection = selection.filter(({ current }) => current !== slug.current);

    const url = new URL($page.url);
    if (!!selection.length)
      url?.searchParams?.set(
        "categories",
        selection.map(({ current }) => current).join(",")
      );
    else url?.searchParams?.delete("categories");

    goto(url.toString().replace(/%2C/g, ","), {
      replaceState: true,
      noScroll: true,
    });
  };
</script>

<div>
  <button
    class="flex cursor-pointer w-full py-2 border-b border-cinereous text-left"
    on:click={() => (expend = !expend)}
  >
    <h3 class="flex-1 uppercase text-xl">Categories</h3>
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
        {#each categories as { _id, slug, title } (_id)}
          <button
            on:click={() => selectCategoryAction(slug)}
            class="flex items-center | space-x-2"
          >
            <input
              bind:group={selection}
              value={slug}
              name="categories_check_box"
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
