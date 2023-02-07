<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import type { Slug } from "$lib/@types/global.types";
  import type { Category } from "$lib/@types/shop.types";
  import { getContext } from "svelte";
  import ExpendIcon from "$components/icons/expend-icon.svelte";
  import anime from "animejs";
  import { browser } from "$app/environment";

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

  let materialListEl: HTMLUListElement;
  $: if (browser) {
    expend
      ? anime({
          targets: "#material_list",
          opacity: 1,
          height: [0, "auto"],
          easing: "easeInOutQuad",
          duration: 400,
          begin: () => (materialListEl.style.display = "flex"),
        })
      : anime({
          targets: "#material_list",
          opacity: 0,
          height: [0, "auto"],
          easing: "easeInOutQuad",
          duration: 200,
          complete: () => (materialListEl.style.display = "none"),
        });
  }
</script>

<div>
  <button
    class="flex cursor-pointer w-full py-2 border-b border-cinereous outline-none"
    on:click={() => (expend = !expend)}
  >
    <h3 class="flex-1 uppercase sm:text-xl text-lg text-left">Material</h3>
    <ExpendIcon {expend} />
  </button>

  <ul
    bind:this={materialListEl}
    id="material_list"
    class="flex flex-col | space-y-2 h-auto mt-2"
  >
    {#each materials as { slug, title }}
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
</div>
