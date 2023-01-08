<script lang="ts">
</script>

<main class="container mx-auto my-40">
  <section>
    <header>
      <h1 class="flex flex-col | text-7xl | uppercase">
        <span class="ml-10 | font-light text-black">My</span>
        <span class="font-title font-thin ">Account</span>
      </h1>
    </header>
  </section>
  <section class="mt-20">
    <h2 class="font-title | text-5xl font-thin">Login</h2>
    <form
      action="?/login"
      method="POST"
      class="flex flex-col | text-secondary | space-y-5 mt-10 | uppercase "
    >
      <label for=""> Email </label>
      <input class="input_fild" type="text" name="email" />
      <label for=""> Password </label>
      <input class="input_fild" type="password" name="password" />
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </section>
</main>

<style lang="postcss">
  .input_fild {
    @apply p-4 border-b border-primary focus:outline-none bg-transparent appearance-none text-primary;
  }
</style>
