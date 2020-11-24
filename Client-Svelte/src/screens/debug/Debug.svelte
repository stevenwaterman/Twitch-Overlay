<script lang="ts">
  import { debugBitsRequest, debugChatRequest, debugFollowRequest, debugGiftSubRequest, debugHostRequest, debugRaidRequest, debugSubRequest, setRave } from "./debugApi";

  let rave: boolean = false;
  $: setRave(rave);
</script>

<button on:click={debugFollowRequest}>Follow</button>
<button on:click={debugChatRequest}>Chat</button>
<button on:click={debugHostRequest}>Host</button>
<button on:click={debugRaidRequest}>Raid</button>
<button on:click={debugSubRequest}>Sub</button>
<button on:click={debugGiftSubRequest}>Gift Sub</button>
<button on:click={debugBitsRequest}>Bits</button>

<label>Rave</label>
<input type="checkbox" bind:checked={rave}/>