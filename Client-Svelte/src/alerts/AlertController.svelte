<script lang="ts">
  import type { Alert } from "../events/alerts";
  import { currentAlertStore } from "../events/alerts";
  // import Bits from "./Bits.svelte";
  // import Follow from "./Follow.svelte";
  // import Host from "./Host.svelte";
  // import Raid from "./Raid.svelte";
  // import Subscribe from "./Subscribe.svelte";
  import Party from "./Party.svelte";

  let alert: Alert | null;
  $: alert = $currentAlertStore;

  let type: Alert["type"] | null;
  $: type = alert === null ? null : alert.type;

  let payload: any;
  $: payload = alert === null ? null : alert.payload;
</script>

<!-- {#if type === 'BITS'}
  <Bits alert={payload} />
{:else if type === 'FOLLOW'}
  <Follow alert={payload} />
{:else if type === 'HOST'}
  <Host alert={payload} />
{:else if type === 'RAID'}
  <Raid alert={payload} />
{:else if type === 'SUBSCRIBE'}
  <Subscribe alert={payload} />
{:else if type === 'PARTY'}
  <Party />
{/if}

{JSON.stringify(payload)} -->

{#if type === 'PARTY'}
  <Party />
{/if}