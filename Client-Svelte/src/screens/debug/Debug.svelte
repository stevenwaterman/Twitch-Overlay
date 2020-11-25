<script lang="ts">
  import { debugBitsRequest, debugChatRequest, debugFollowRequest, debugGiftSubRequest, debugHostRequest, debugRaidRequest, debugSubRequest, debugPartyRequest } from "./debugApi";
</script>

<button on:click={debugFollowRequest}>Follow</button>
<button on:click={debugChatRequest}>Chat</button>
<button on:click={debugHostRequest}>Host</button>
<button on:click={debugRaidRequest}>Raid</button>
<button on:click={debugSubRequest}>Sub</button>
<button on:click={debugGiftSubRequest}>Gift Sub</button>
<button on:click={debugBitsRequest}>Bits</button>
<button on:click={debugPartyRequest}>Party</button>