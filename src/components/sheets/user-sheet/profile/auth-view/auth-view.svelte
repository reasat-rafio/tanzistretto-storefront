<script lang="ts">
  import Button from '$components/ui/button/button.svelte';
</script>

<h2 class="text-2xl font-bold">
  Manage address, contact info and personal preferences
</h2>

<h3 class="text-lg">
  To create an account, please sign in using Google or Facebook authentication.
</h3>

<!-- href="/auth/login/google" -->
<div class="space-y-3 pt-3">
  <Button
    class="flex w-full items-center justify-center space-x-1.5 bg-[#1877F2] shadow hover:bg-[#1877F2]/90">
    <img src="/icons/facebook.svg" alt="Facebook Icon" width={20} height={20} />
    <span>Continue With Facebook</span>
  </Button>
  <Button
    href="/auth/login/google"
    class="flex w-full items-center justify-center space-x-1.5 bg-muted text-primary shadow hover:bg-muted/90">
    <img src="/icons/google.svg" alt="Google Icon" width={20} height={20} />
    <span>Continue With Google</span>
  </Button>
</div>
