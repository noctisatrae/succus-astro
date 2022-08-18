{#if $isConnected}

  <Chat client:visible />

  {:else}

  <Landing client:visible/>

{/if}

<script>
  import { isConnected } from "%"

  import Landing from "./Landing.svelte";
  import Chat from "./Chat.svelte";

  console.log($isConnected)
</script>

<style>
</style>