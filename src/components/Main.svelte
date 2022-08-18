{#if $isConnected}

  <Chat/>

  {:else}

  <Landing client:visible/>

{/if}

<script>
  import { isConnected } from "../stores"

  import Landing from "./Landing.svelte";
  import Chat from "./Chat.svelte";

  console.log($isConnected)
</script>

<style>
</style>