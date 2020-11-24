<script lang="ts">
  import { raveStore } from "../../events/rave";
  import Rave from "./Rave.svelte";
</script>

{#if $raveStore}
  <Rave/>
{/if}