<script>
  import * as Sheet from '$lib/components/ui/sheet/index';
  import { User2Icon } from 'lucide-svelte';
  import * as Tabs from '$lib/components/ui/tabs';
  import ForYou from './for-you/for-you.svelte';
  import Order from './order/order.svelte';
  import Profile from './profile/profile.svelte';
</script>

<Sheet.Root>
  <Sheet.Trigger>
    <User2Icon />
  </Sheet.Trigger>

  <Sheet.Content class="w-full overflow-auto">
    <Sheet.Header>
      <Sheet.Title>Welcome</Sheet.Title>
    </Sheet.Header>

    <Tabs.Root value="profile" class="mt-2 w-full">
      <Tabs.List class="w-full">
        <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
        <Tabs.Trigger value="order">Orders</Tabs.Trigger>
        <Tabs.Trigger value="for-you">For You</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="profile">
        <Profile />
      </Tabs.Content>
      <Tabs.Content value="for-you">
        <ForYou />
      </Tabs.Content>
      <Tabs.Content value="order">
        <Order />
      </Tabs.Content>
    </Tabs.Root>
  </Sheet.Content>
</Sheet.Root>
