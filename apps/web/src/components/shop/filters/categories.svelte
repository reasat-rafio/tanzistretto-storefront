<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import type { Slug } from "$lib/@types/global.types";
  import type { Category } from "$lib/@types/shop.types";
  import { getContext } from "svelte";
  import ExpendIcon from "$components/icons/expend-icon.svelte";
  import { browser } from "$app/environment";
  import anime from "animejs";

  const categories = getContext("categories") as Category[];
  let expend = true;
  let selection: Slug[] = [];

  let categoryListEl: HTMLUListElement;
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

  $: if (browser) {
    expend
      ? anime({
          targets: "#category_list",
          opacity: 1,
          height: [0, "auto"],
          easing: "easeInOutQuad",
          duration: 400,
          begin: () => (categoryListEl.style.display = "flex"),
        })
      : anime({
          targets: "#category_list",
          opacity: 0,
          height: [0, "auto"],
          easing: "easeInOutQuad",
          duration: 200,
          complete: () => (categoryListEl.style.display = "none"),
        });
  }
</script>

<div>
  <button
    class="flex cursor-pointer w-full py-2 border-b border-cinereous text-left outline-none"
    on:click={() => (expend = !expend)}
  >
    <h3 class="flex-1 uppercase sm:text-xl text-lg">Category</h3>
    <ExpendIcon {expend} />
  </button>

  <ul
    id="category_list"
    bind:this={categoryListEl}
    class="hidden flex-col | space-y-2 h-auto mt-2"
  >
    {#each categories as { slug, title }}
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
</div>
